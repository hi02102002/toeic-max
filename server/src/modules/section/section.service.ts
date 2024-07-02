import { sections } from '@/database/schema'
import { CRUDBaseService } from '@/libs/api/crud-service'
import { eq } from 'drizzle-orm'
import { Service } from 'typedi'
import { SectionDto } from './section.dto'
import { TSection } from './section.type'

@Service()
export class SectionService extends CRUDBaseService<
    SectionDto,
    Partial<SectionDto>,
    TSection
> {
    constructor() {
        super(sections, 'Section')
    }

    async getByPart(part: number) {
        const section = await this.db.query.sections.findFirst({
            where: eq(sections.name, `Part ${part}`),
        })

        return section
    }
}
