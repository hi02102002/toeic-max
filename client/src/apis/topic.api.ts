import type { TOption } from '@/components/ui/tree-select'
import { API_ENDPOINTS } from '@/constants'
import type { TBaseQueryParams, TSelectResponse } from '@/types/common'
import type { TTopic } from '@/types/topic'
import type { TInputTopicSchemaType } from '@/validators/topic'
import { BaseCrudApi } from './crud.api'

class TopicApi extends BaseCrudApi<
    TInputTopicSchemaType,
    TInputTopicSchemaType,
    TBaseQueryParams,
    TTopic
> {
    select(): Promise<TSelectResponse[]> {
        throw new Error('Method not implemented.')
    }

    constructor() {
        super(API_ENDPOINTS.TOPICS.INDEX)
    }

    public getTreeSelect = async (): Promise<TOption[]> => {
        const allTopics = await this.getAll().then((res) => res.data)

        const getChildren = (parentId: string | null): TOption[] => {
            const children = allTopics.filter(
                (topic) => topic.parent_id === parentId,
            )

            return children.map((topic) => ({
                label: topic.name,
                value: topic.id,
                children: getChildren(topic.id),
                id: topic.id,
            }))
        }

        const tree = getChildren(null)

        return tree
    }
}

export const topicApi = new TopicApi()
