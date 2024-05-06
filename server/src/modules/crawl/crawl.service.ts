import { Service } from 'typedi';
import { callApi, callApiDecrypt } from './crawl.helper';
import { db } from '@/database/db';
import { kits, question_sections, questions, sections, tests, topics, vocabularies } from '@/database/schema';
import { eq } from 'drizzle-orm';

@Service()
export class CrawlService {
  async crawlKits() {
    const data = await callApi('app/kits', 'GET', {});

    const promises = data.data_group.map(async (item: any) => {
      const rows = await db
        .insert(kits)
        .values({
          name: item.name,
          year: item.year,
        })
        .returning({
          id: kits.id,
        })
        .onConflictDoNothing();

      if (rows.length !== 0) {
        await db
          .insert(tests)
          .values(
            item.list.map((test: any) => ({
              name: test.name,
              year: test.year,
              slug: test.slug,
              kit_id: rows[0].id,
              type: test.type,
            })),
          )
          .onConflictDoNothing();
      }
    });

    await Promise.all(promises);

    const _promises = data.data.map(async (item: any) => {
      return this.crawlKitDetail(item.id);
    });

    await Promise.all(_promises);

    return data;
  }

  async crawlKitDetail(id: string) {
    const data = await callApiDecrypt(`app/kits/${id}`, 'GET', {
      lr: 1,
    });

    const [testKit] = await db.select().from(tests).where(eq(tests.slug, data.test_kit.slug)).limit(1);

    let testKitId = testKit?.id;

    if (!testKit) {
      const [{ id: kitId }] = await db
        .insert(kits)
        .values({
          name: data.test_kit.name,
          year: data.test_kit.year,
        })
        .returning({
          id: kits.id,
        })
        .onConflictDoNothing();

      testKitId = kitId;
    }

    const infors = data.data.map((section: any) => section.info).filter((section: any) => section);

    await db
      .insert(sections)
      .values(
        infors.map((section: any) => ({
          name: section.name,
          title: section.title,
          title_vi: section.title_vi,
          intro: section.intro,
          intro_vi: section.intro_vi,
          intro_audio: section.intro_audio,
          intro_image: section.intro_image,
          intro_answer: section.intro_answer,
          section_title: section.section_title,
          section_description: section.section_desc,
        })),
      )
      .onConflictDoNothing()
      .returning({
        id: sections.id,
      });

    const questionSections = data.data.filter((section: any) => !section.info);

    for (const section of questionSections) {
      const [{ id }] = await db
        .insert(question_sections)
        .values({
          test_kit_id: testKitId,
          part: section.part,
          image_urls: section.image_url,
          audio_url: section.audio_url,
          teaser: section.teaser,
          location: section.vitri,
        })
        .onConflictDoNothing()
        .returning({
          id: question_sections.id,
        });

      await db
        .insert(questions)
        .values(
          section.question.map(question => {
            return {
              opts: question.opt,
              ans: question.ans,
              location: question.vitri,
              p: question.p,
              question_section_id: id,
              trans: question.tran,
            };
          }),
        )
        .onConflictDoNothing();
    }

    return data;
  }

  async crawlTopics() {
    const { data } = await callApi('https://scandict.com/api/voca/group', 'GET', {});

    if (!data) return;

    const sectionIds = data.map((item: any) => item.id);

    const promises = sectionIds.map(async (id: string) => {
      return this.crawlSectionDetail(id);
    });

    await Promise.all(promises);

    return data;
  }

  async crawlTopicDetail(id: string) {
    const { data, group } = await callApi(`https://scandict.com/api/voca/word/${id}`, 'GET', {}).then(res => res || {});

    if (!data) return;

    const { id: topic_id } = await db.query.topics
      .findFirst({
        where: eq(topics.slug, group?.slug),
      })
      .then(
        res =>
          res || {
            id: null,
          },
      )
      .catch(() => ({
        id: null,
      }));

    if (!topic_id) return;

    const promises = data.map(async (item: any) => {
      let newVocabulary = await db.query.vocabularies.findFirst({
        where: eq(vocabularies.name, item.name),
      });

      if (!newVocabulary) {
        newVocabulary = await db
          .insert(vocabularies)
          .values({
            name: item.name,
            example: item.example,
            image: item.image,
            spelling: item.spelling,
            type: item.type,
            meaning: item.meaning,
            topic_id,
            category: item.loai,
          })
          .returning()
          .onConflictDoNothing()
          .then(res => res[0]);
      }

      console.log(`Inserted new vocabulary: ${item.name} with topic: ${group.name}`);
    });

    await Promise.all(promises);
  }

  async crawlSectionDetail(id: string) {
    const { data, group } = await callApi(`https://scandict.com/api/voca/section/${id}`, 'GET', {}).then(res => res || {});

    if (!data) return;

    let newTopic = await db.query.topics.findFirst({
      where: eq(topics.slug, group.slug),
    });

    if (!newTopic) {
      newTopic = await db
        .insert(topics)
        .values({
          name: group.name,
          slug: group.slug,
          level: group.level,
        })
        .returning()
        .then(res => res[0]);
    }

    const promises = data.map(async (item: any) => {
      let subTopic = await db.query.topics.findFirst({
        where: eq(topics.slug, item.slug),
      });

      if (!subTopic) {
        subTopic = await db
          .insert(topics)
          .values({
            name: item.name,
            slug: item.slug,
            level: item.level,
            parent_id: newTopic.id,
          })
          .returning()
          .then(res => res[0]);

        console.log(`Inserted new topic: ${item.name} with parent: ${newTopic.name}`);
      }

      await this.crawlTopicDetail(item.id);
    });

    await Promise.all(promises);
  }

  async crawlCourses() {
    const { data } = await callApi('app/course', 'GET', {});

    return data;
  }

  async crawlCourseDetail(id: string) {
    const { data } = await callApi(`app/course/${id}`, 'GET', {});

    return data;
  }

  async crawlCourseTopic(id: string) {
    const { data } = await callApi(`app/topic/${id}`, 'GET', {});
    const exercises = await callApiDecrypt(`app/exercise/${id}`, 'GET', {});

    return {
      topic: data,
      exercises,
    };
  }
}
