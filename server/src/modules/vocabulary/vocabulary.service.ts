import { jsonBuildObject } from '@/database/helper'
import { topics, vocabularies } from '@/database/schema'
import { CRUDBaseService, TGetPagingQuery } from '@/libs/api/crud-service'
import { eq, getTableColumns, inArray } from 'drizzle-orm'
import { Service } from 'typedi'
import { TopicService } from '../topic'
import { CreateVocabularyDto, QueryVocabularyDto } from './vocabulary.dto'
import { TVocabulary } from './vocabulary.type'

@Service()
export class VocabularyService extends CRUDBaseService<
    CreateVocabularyDto,
    Partial<CreateVocabularyDto>,
    TVocabulary
> {
    constructor(private readonly topicService: TopicService) {
        super(vocabularies, 'Vocabulary')
    }

    async getPaging({ query }: TGetPagingQuery<QueryVocabularyDto>) {
        const { topic_id, ...rest } = query

        const topicIds = []

        if (topic_id) {
            const topics =
                await this.topicService.getAllChildByParentId(topic_id)

            topicIds.push(...topics.map((topic) => topic.id))

            topicIds.push(topic_id)
        }

        return super.getPaging({
            query: rest,
            opts: {
                wheres: [
                    topic_id && topicIds.length
                        ? inArray(vocabularies.topic_id, topicIds)
                        : undefined,
                ],
                searchFields: [vocabularies.name],
                defaultOrderBy: 'name',
                selectFields: {
                    ...getTableColumns(vocabularies),
                    topic: jsonBuildObject({
                        ...getTableColumns(topics),
                    }),
                },
            },
            callback(query) {
                return query.leftJoin(
                    topics,
                    eq(vocabularies.topic_id, topics.id),
                )
            },
        })
    }
}
