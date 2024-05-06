import { kits, tests } from '@/database/schema';
import { BaseQueryDto, BaseService, TGetPagingQuery } from '@/libs/api';
import { Service } from 'typedi';
import { KitDto, QueryKitDto } from './kits.dto';
import { TKit, TKitPaginate } from './kits.type';
import { eq } from 'drizzle-orm';
import { jsonAggBuildObject } from '@/database/helper';

@Service()
export class KitsService extends BaseService<KitDto, Partial<KitDto>, TKit> {
  constructor() {
    super(kits);
  }

  async getPaging({ query }: TGetPagingQuery<QueryKitDto>) {
    const { items, total } = await super.getPaging({
      query,
      opts: {
        searchFields: [kits.name],
        wheres: [eq(kits.id, 'p5h1l9i5phvbisywz9mzyp8o')],
      },
    });

    return {
      items,
      total,
    };
  }
}
