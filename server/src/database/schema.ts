import { TPracticePart, TTest } from '@/modules/history/history.type'
import { TLearnVoca } from '@/modules/vocabulary'
import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import {
    boolean,
    index,
    integer,
    json,
    pgEnum,
    pgTable,
    real,
    text,
    timestamp,
    unique,
    varchar,
} from 'drizzle-orm/pg-core'

export const roles = pgEnum('roles', ['ADMIN', 'USER'])

export const users = pgTable('users', {
    id: varchar('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    email: text('email').unique().notNull(),
    password: text('password'),
    name: text('name').notNull(),
    avatar: text('avatar'),
    roles: roles('role')
        .array()
        .$defaultFn(() => ['USER'])
        .notNull(),
    provider: text('provider').notNull().default('local'),
    isVerified: boolean('is_verified').default(false),
})

export const kits = pgTable('kits', {
    id: varchar('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text('name').notNull().unique(),
    year: integer('year').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})

export const tests = pgTable('test_kits', {
    id: varchar('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text('name').notNull().unique(),
    year: integer('year').notNull(),
    slug: text('slug').notNull().unique(),
    kitId: varchar('kit_id').references(() => kits.id, {
        onDelete: 'set null',
    }),
    type: text('type').default('toeic'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})

export const sections = pgTable('sections', {
    id: varchar('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text('name').unique().notNull(),
    title: text('title'),
    titleVi: text('title_vi'),
    intro: text('intro'),
    introVi: text('intro_vi'),
    introAudio: text('intro_audio'),
    introImage: text('intro_image'),
    introAnswer: text('intro_answer'),
    sectionTitle: text('section_title'),
    sectionDescription: text('section_description'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})

export const question_sections = pgTable(
    'question_sections',
    {
        id: varchar('id')
            .primaryKey()
            .$defaultFn(() => createId()),
        testKitId: varchar('test_kit_id').references(() => tests.id, {
            onDelete: 'set null',
        }),
        part: integer('part').$type<1 | 2 | 3 | 4 | 5 | 6 | 7>(),
        imageUrls: json('image_urls').$type<string[]>(),
        audioUrl: text('audio_url'),
        teaser: json('teaser').$type<{
            text: string | null
            trans: {
                [key: string]: string | null
            }
        }>(),
        location: text('location'),
        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at').defaultNow(),
    },
    ({ part, testKitId, location }) => {
        return {
            uniqueQuestionSection: unique('question_sections_unique').on(
                part,
                testKitId,
                location,
            ),
        }
    },
)

export const questions = pgTable(
    'questions',
    {
        id: varchar('id')
            .primaryKey()
            .$defaultFn(() => createId()),
        opts: json('opts').$type<{
            a: string
            b: string
            c: string
            d: string
        }>(),
        ans: text('ans').$type<'a' | 'b' | 'c' | 'd'>(),
        trans: json('tran').$type<{
            [key: string]: string
        }>(),
        p: integer('p').notNull(),
        location: integer('location').notNull(),
        questionSectionId: varchar('question_section_id').references(
            () => question_sections.id,
            {
                onDelete: 'cascade',
            },
        ),
        created_at: timestamp('created_at').defaultNow(),
        updated_at: timestamp('updated_at').defaultNow(),
        q: text('q'),
    },
    ({ location, questionSectionId, p }) => {
        return {
            uniqueQuestion: unique('questions_unique').on(
                location,
                questionSectionId,
                p,
            ),
        }
    },
)

export const topics = pgTable(
    'topics',
    {
        id: varchar('id')
            .primaryKey()
            .$defaultFn(() => createId()),
        name: text('name').notNull().unique(),
        parentId: varchar('parent_id').default(null),
        level: integer('level'),
        slug: text('slug').unique(),
        created_at: timestamp('created_at').defaultNow(),
        updated_at: timestamp('updated_at').defaultNow(),
        order: integer('order').default(0),
    },
    ({ name }) => ({
        nameIdx: index('topic_name_idx').on(name),
    }),
)

export const vocabularies = pgTable(
    'vocabularies',
    {
        id: varchar('id')
            .primaryKey()
            .$defaultFn(() => createId()),
        example: text('example'),
        image: text('image'),
        name: text('name'),
        spelling: text('spelling'),
        type: text('type'),
        meaning: text('meaning'),
        topicId: varchar('topic_id').references(() => topics.id, {
            onDelete: 'cascade',
        }),
        category: text('category'),
        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at').defaultNow(),
    },
    ({ name, topicId, example }) => {
        return {
            unique: unique('vocabularies_unique').on(name, topicId, example),
            nameIdx: index('vocabulary_name_idx').on(name),
        }
    },
)

export const courses = pgTable('courses', {
    id: varchar('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    coverUrl: text('cover_url'),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    slug: text('slug').unique(),
    teaser: text('teaser'),
    price: real('price').default(0),
    oldPrice: real('old_price').default(0),
})

export const course_topics = pgTable('course_topics', {
    id: varchar('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    courseId: varchar('course_id').references(() => courses.id, {
        onDelete: 'cascade',
    }),
    name: text('name'),
    slug: text('slug').unique(),
    parentId: varchar('parent_id'),
    introduction: text('introduction'),
})

export const histories = pgTable('histories', {
    id: varchar('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    userId: varchar('user_id').references(() => users.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    metadata: json('metadata'),
    /**
     * with type is practice-part contents will be an array like this:
     * [
     *   {
     *      section_question_id: string,
     *      question_id:string,
     *      choose: string,
     *      ans: string,
     *      is_correct: boolean
     *   }
     * ]
     *
     * with type is test contents will be an array like this:
     * [
     *   {
     *      section_question_id: string,
     *      question_id:string,
     *      choose: string,
     *      ans: string,
     *      is_correct: boolean
     *      part: number
     * }
     * ]
     */
    contents: json('contents').$type<
        Array<TPracticePart> | Array<TTest> | Array<TLearnVoca>
    >(),
    type: text('type').$type<'test' | 'course' | 'vocab' | 'practice-part'>(),
})

export const listening = pgTable('listening', {
    id: varchar('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text('name'),
    duration: integer('duration'),
    durationText: text('duration_text'),
    audioUrl: text('audio_url'),
    imageUrl: text('image_url'),
    transcript: json('transcript').$type<{
        text: string
        trans: {
            vi: string
        }
    }>(),
    metadata: json('meta_data').$type<
        Array<{
            text: string
            duration: {
                from: string
                to: string
            }
            trans: {
                vi: string
            }
        }>
    >(),
    totalQuestion: integer('total_question'),
})

export const kits_relations = relations(kits, ({ many }) => ({
    tests: many(tests),
}))

export const tests_relations = relations(tests, ({ one, many }) => ({
    kit: one(kits, {
        fields: [tests.kitId],
        references: [kits.id],
    }),
    question_sections: many(question_sections),
}))

export const question_sections_relations = relations(
    question_sections,
    ({ one, many }) => ({
        test_kit: one(tests, {
            fields: [question_sections.testKitId],
            references: [tests.id],
        }),
        questions: many(questions),
    }),
)

export const questions_relations = relations(questions, ({ one }) => ({
    question_section: one(question_sections, {
        fields: [questions.questionSectionId],
        references: [question_sections.id],
    }),
}))

export const topics_relations = relations(topics, ({ one, many }) => ({
    vocabularies: many(vocabularies),
    parent: one(topics, {
        fields: [topics.parentId],
        references: [topics.id],
        relationName: 'children',
    }),
}))

export const topics_children = relations(topics, ({ many }) => ({
    children: many(topics, {
        relationName: 'children',
    }),
}))

export const vocabularies_relations = relations(vocabularies, ({ one }) => ({
    topic: one(topics, {
        fields: [vocabularies.topicId],
        references: [topics.id],
    }),
}))
