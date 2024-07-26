import { catchAsync } from '@/utils/catch-async'
import { StatusCodes } from 'http-status-codes'
import { Service } from 'typedi'
import { RequestWithUser } from '../auth'
import { ResultService } from './result.service'

@Service()
export class ResultController {
    constructor(private readonly resultService: ResultService) {}

    public getPracticePartResult = catchAsync(
        async (req: RequestWithUser, res) => {
            const data = await this.resultService.getPracticeResult({
                userId: req.user.id,
                historyId: req.params.historyId as string,
                type: req.query.type as string,
            })

            return res.status(StatusCodes.OK).json({
                data,
            })
        },
    )
}
