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

    async getSectionsMapPart() {
        const parts = [1, 2, 3, 4, 5, 6, 7]

        const sections = await this.getAll().then((sections) => {
            return sections
                .sort((a, b) => a.name.localeCompare(b.name))
                .reduce(
                    (acc, section) => {
                        const part = parts.find((part) =>
                            section.name.includes(`${part}`),
                        )
                        if (part) {
                            acc[part] = section
                        }
                        return acc
                    },
                    {} as Record<number, TSection>,
                )
        })

        return sections
    }
}
