import type { BaseCrudApi } from '@/apis/crud.api'
import { queryClient } from '@/libs/react-query'
import type { TBaseResponse } from '@/types/common'
import { toastError } from '@/utils'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

type TMutationOptions<E> = {
    onExtraSuccess?: (res: TBaseResponse<E>) => void
    onExtraError?: (err: any) => void
    isShowToastSuccess?: boolean
    isShowToastError?: boolean
}

/**
 * A generic class for handling CRUD operations using query hooks.
 *
 * @template C - Type for create operation data.
 * @template U - Type for update operation data.
 * @template Q - Type for query operation data.
 * @template E - Type for error response data.
 * @template A - Type for the API class implementing BaseCrudApi.
 */
export class CrudQueryClient<
    C extends Record<string, unknown> = Record<string, unknown>,
    U extends Record<string, unknown> = Record<string, unknown>,
    Q extends Record<string, unknown> = Record<string, unknown>,
    E extends Record<string, unknown> = Record<string, unknown>,
    A extends BaseCrudApi<C, U, Q, E> = BaseCrudApi<C, U, Q, E>,
> {
    /**
     * Creates an instance of CrudQueryClient.
     *
     * @param {A} api - An instance of the API class implementing BaseCrudApi.
     */
    constructor(private api: A) {
        this.api = api

        this.useCreate = this.useCreate.bind(this)
        this.useDelete = this.useDelete.bind(this)
        this.useUpdate = this.useUpdate.bind(this)
        this.usePaginate = this.usePaginate.bind(this)
        this.useGetAll = this.useGetAll.bind(this)
        this.useGetById = this.useGetById.bind(this)
        this.useSelect = this.useSelect.bind(this)
    }

    /**
     * Custom hook for create operation.
     *
     * @param {function} [onExtraSuccess] - Optional callback function to be executed on successful create operation.
     * @param {function} [onExtraError] - Optional callback function to be executed on error during create operation.
     * @returns {MutationResult} - The result of the create mutation.
     */
    useCreate(opts?: TMutationOptions<E>) {
        const {
            onExtraSuccess,
            onExtraError,
            isShowToastError = true,
            isShowToastSuccess = true,
        } = opts || {}
        return useMutation({
            mutationFn: ({ data }: { data: C }) => this.api.create(data),
            onSuccess: (res) => {
                queryClient.invalidateQueries({
                    queryKey: [this.api.endpoint],
                })

                queryClient.invalidateQueries({
                    queryKey: [`${this.api.endpoint}-id`, res.data.id],
                })

                if (isShowToastSuccess) {
                    toast.success(res.message)
                }

                onExtraSuccess?.(res)
            },
            onError: (err: any) => {
                if (isShowToastError) {
                    toastError(err)
                }
                onExtraError?.(err)
            },
        })
    }

    /**
     * Custom hook for delete operation.
     *
     * @returns {MutationResult} - The result of the delete mutation.
     */
    useDelete(opts?: TMutationOptions<E>) {
        const {
            onExtraSuccess,
            onExtraError,
            isShowToastError = true,
            isShowToastSuccess = true,
        } = opts || {}

        return useMutation({
            mutationFn: (id: string) => this.api.delete(id),
            onSuccess: (res, id) => {
                queryClient.invalidateQueries({
                    queryKey: [this.api.endpoint],
                })

                queryClient.invalidateQueries({
                    queryKey: [`${this.api.endpoint}-id`, id],
                })

                if (isShowToastSuccess) {
                    toast.success(res.message)
                }

                onExtraSuccess?.(res)
            },
            onError: (err: any) => {
                if (isShowToastError) {
                    toastError(err)
                }

                onExtraError?.(err)
            },
        })
    }

    /**
     * Custom hook for update operation.
     *
     * @param {function} [onExtraSuccess] - Optional callback function to be executed on successful update operation.
     * @param {function} [onExtraError] - Optional callback function to be executed on error during update operation.
     * @returns {MutationResult} - The result of the update mutation.
     */
    useUpdate(opts?: TMutationOptions<E>) {
        const {
            onExtraSuccess,
            onExtraError,
            isShowToastError = true,
            isShowToastSuccess = true,
        } = opts || {}
        return useMutation({
            mutationFn: ({ data, id }: { data: U; id: string }) =>
                this.api.update(id, data),
            onSuccess: (res) => {
                queryClient.invalidateQueries({
                    queryKey: [this.api.endpoint],
                })

                queryClient.invalidateQueries({
                    queryKey: [`${this.api.endpoint}-id`, res.data.id],
                })

                if (isShowToastSuccess) {
                    toast.success(res.message)
                }

                onExtraSuccess?.(res)
            },
            onError: (err: any) => {
                if (isShowToastError) {
                    toastError(err)
                }
                onExtraError?.(err)
            },
        })
    }

    /**
     * Custom hook for paginated query operation.
     *
     * @param {Q} q - The query parameters.
     * @returns {QueryResult} - The result of the paginated query.
     */
    usePaginate(q: Q) {
        return useQuery({
            queryKey: [this.api.endpoint, JSON.stringify(q)],
            queryFn: () => this.api.getPaginate(q),
        })
    }

    /**
     * Custom hook for getting all records.
     *
     * @returns {QueryResult} - The result of the query to get all records.
     */
    useGetAll() {
        return useQuery({
            queryKey: [`${this.api.endpoint}-all`],
            queryFn: () => this.api.getAll(),
        })
    }

    /**
     * Custom hook for getting a record by ID.
     *
     * @param {string} id - The ID of the record to retrieve.
     * @returns {QueryResult} - The result of the query to get a record by ID.
     */
    useGetById(id: string) {
        return useQuery({
            queryKey: [`${this.api.endpoint}-id`, id],
            queryFn: () => this.api.getById(id).then((res) => res.data),
            enabled: !!id,
        })
    }

    /**
     * Custom hook for getting a select dropdown options.
     *
     * @returns {QueryResult} - The result of the query to get select dropdown options.
     */
    useSelect() {
        return useQuery({
            queryKey: [`${this.api.endpoint}-select`],
            queryFn: async () => {
                const res = await this.api.select()

                return res
            },
            initialData: [],
        })
    }
}
