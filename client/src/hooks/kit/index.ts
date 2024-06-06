import type { KitInputSchemaType } from '@/validators/kit'
import { CrudQueryClient } from '../crud-query-client'
import type { TBaseQueryParams } from '@/types/common'
import type { TKit } from '@/types/kit'
import { kitApi } from '@/apis/kit.api'

const KitCrudClient = new CrudQueryClient<
    KitInputSchemaType,
    KitInputSchemaType,
    TBaseQueryParams,
    TKit
>(kitApi)

export const useCreateKit = KitCrudClient.useCreate
export const useDeleteKit = KitCrudClient.useDelete
export const useUpdateKit = KitCrudClient.useUpdate
export const useForSelectKit = KitCrudClient.useSelect
