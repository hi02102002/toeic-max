import { CRUDBaseController } from '@/libs/api/crud.controller'
import { catchAsync } from '@/utils/catch-async'
import { StatusCodes } from 'http-status-codes'
import { Service } from 'typedi'
import { RequestWithUser } from '../auth'
import { HistoryService } from './history.service'

@Service()
export class HistoryController extends CRUDBaseController<HistoryService> {
    constructor(protected readonly service: HistoryService) {
        super(service, 'History')
    }

    createForVocab = catchAsync(async (req: RequestWithUser, res) => {
        const history = await this.service.createVocabHistory(
            req.user.id,
            req.body,
        )
        res.status(StatusCodes.OK).json({
            data: history,
            message: 'Create history successfully',
        })
    })
}
