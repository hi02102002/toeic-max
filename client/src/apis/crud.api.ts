import { http_client } from '@/libs/http-client'
import type {
    TBaseQueryPagingBuilderParams,
    TBaseResponse,
    TPaginateResponse,
    TSelectResponse,
} from '@/types/common'

/**
 * Base abstract class for CRUD APIs.
 * @template C The type of the create request payload.
 * @template U The type of the update request payload.
 * @template Q The type of the query parameters.
 * @template E The type of the entity.
 *
 * @property {string} endpoint The endpoint of the API.
 *
 * @example
 *
 * class KitApi extends BaseCrudApi<KitInputSchemaType, KitInputSchemaType, TBaseQueryParams, TKit> {}
 */
export abstract class BaseCrudApi<
    C extends Record<string, unknown> = Record<string, unknown>,
    U extends Record<string, unknown> = Record<string, unknown>,
    Q extends Record<string, unknown> = Record<string, unknown>,
    E extends Record<string, unknown> = Record<string, unknown>,
> {
    constructor(public endpoint: string) {
        this.endpoint = endpoint

        this.getById = this.getById.bind(this)
        this.getAll = this.getAll.bind(this)
        this.getPaginate = this.getPaginate.bind(this)
        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.getPagingBuilder = this.getPagingBuilder.bind(this)
    }

    getById(id: string): Promise<TBaseResponse<E>> {
        return http_client.get(`${this.endpoint}/get-one/${id}`)
    }

    getAll(): Promise<TBaseResponse<E[]>> {
        return http_client.get(`${this.endpoint}/get-all`)
    }

    getPaginate(query: Q): Promise<TPaginateResponse<E>> {
        return http_client.get(this.endpoint, { params: query })
    }

    getPagingBuilder(
        query?: TBaseQueryPagingBuilderParams,
    ): Promise<TPaginateResponse<E>> {
        return http_client.get(this.endpoint, { params: query })
    }

    create(data: C): Promise<TBaseResponse<E>> {
        return http_client.post(this.endpoint, data)
    }

    update(id: string, data: U): Promise<TBaseResponse<E>> {
        return http_client.put(`${this.endpoint}/${id}`, data)
    }

    delete(id: string): Promise<TBaseResponse<any>> {
        return http_client.delete(`${this.endpoint}/${id}`)
    }

    abstract select(): Promise<TSelectResponse[]>
}
