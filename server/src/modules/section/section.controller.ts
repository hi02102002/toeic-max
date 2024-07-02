import { CRUDBaseController } from '@/libs/api/crud-controller'
import { catchAsync } from '@/utils/catch-async'
import { StatusCodes } from 'http-status-codes'
import { Service } from 'typedi'
import { SectionService } from './section.service'

@Service()
export class SectionController extends CRUDBaseController<SectionService> {
    constructor(protected readonly service: SectionService) {
        super(service, 'Section')
    }

    getByPart = catchAsync(async (req, res) => {
        const { part } = req.params

        const section = await this.service.getByPart(Number(part))

        return res.status(StatusCodes.OK).json({
            data: section,
        })
    })
}
