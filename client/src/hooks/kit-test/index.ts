import { kitTestApi } from '@/apis/kit-test.api'
import { CrudQueryClient } from '../crud-query-client'
import type { KitTestInputSchemaType } from '@/validators/kit-test'
import type { TBaseQueryParams } from '@/types/common'
import type { TTest } from '@/types/test'

export const KitTestCrudClient = new CrudQueryClient<
    KitTestInputSchemaType,
    KitTestInputSchemaType,
    TBaseQueryParams,
    TTest
>(kitTestApi)

export const useCreateKitTest = KitTestCrudClient.useCreate
export const useDeleteKitTest = KitTestCrudClient.useDelete
export const useUpdateKitTest = KitTestCrudClient.useUpdate
export const useForSelectKitTest = KitTestCrudClient.useSelect
