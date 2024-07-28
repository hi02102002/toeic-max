import { historyApi } from '@/apis/history.api'
import type { TBaseQueryParams } from '@/types/common'
import type { THistory } from '@/types/history'
import type { THistoryInputSchemaType } from '@/validators/history'
import { CrudQueryClient } from '../crud-query-client'

export const HistoryCrudClient = new CrudQueryClient<
    THistoryInputSchemaType,
    THistoryInputSchemaType,
    TBaseQueryParams,
    THistory
>(historyApi)

export const useCreateHistory = HistoryCrudClient.useCreate
export const useDeleteHistory = HistoryCrudClient.useDelete
export const useUpdateHistory = HistoryCrudClient.useUpdate
export const useForSelectHistory = HistoryCrudClient.useSelect
