import { jsonBuildObject } from '@/database/helper'
import { topics, vocabularies } from '@/database/schema'
import { TGetPagingQuery } from '@/libs/api'
import { CRUDBaseService } from '@/libs/api/crud.service'
import { eq, getTableColumns, inArray } from 'drizzle-orm'
import { Service } from 'typedi'
import { TopicService } from '../topic'
import { QueryVocabularyDto, VocabularyDto } from './vocabulary.dto'
import { TVocabulary } from './vocabulary.type'

@Service()
export class VocabularyService extends CRUDBaseService<
    VocabularyDto,
    Partial<VocabularyDto>,
    TVocabulary
> {
    constructor(private readonly topicService: TopicService) {
        super(vocabularies)
    }

    async getPaging({ query }: TGetPagingQuery<QueryVocabularyDto>) {
        const { topicId, ...rest } = query

        const topicIds = []

        if (topicId) {
            const topics =
                await this.topicService.getAllChildByParentId(topicId)

            topicIds.push(...topics.map((topic) => topic.id))

            topicIds.push(topicId)
        }

        return super.getPaging({
            query: rest,
            opts: {
                wheres: [
                    topicId && topicIds.length
                        ? inArray(vocabularies.topicId, topicIds)
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
                    eq(vocabularies.topicId, topics.id),
                )
            },
        })
    }

    async getVocabByIds(ids: string[]) {
        const vocabularies = await this.getManyByInField('id', ids)

        return vocabularies.sort((a, b) => {
            return ids.indexOf(a.id) - ids.indexOf(b.id)
        })
    }
}
