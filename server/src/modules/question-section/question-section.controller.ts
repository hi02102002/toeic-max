import { CRUDBaseController } from '@/libs/api/crud.controller'
import { catchAsync } from '@/utils/catch-async'
import { StatusCodes } from 'http-status-codes'
import { Service } from 'typedi'
import { RequestWithUser } from '../auth'
import { QuestionSectionService } from './question-section.service'

@Service()
export class QuestionSectionController extends CRUDBaseController<QuestionSectionService> {
    constructor(protected readonly service: QuestionSectionService) {
        super(service, 'Question')
    }

    getForPractice = catchAsync(async (req: RequestWithUser, res) => {
        const { part, numOfQuestions } = req.params as any

        const questions = await this.service.getForPractice({
            part,
            numOfQuestions,
            userId: req.user.id,
            ref: req.query?.ref as string,
        })

        return res.status(StatusCodes.OK).json({
            data: questions,
        })
    })

    getForTest = catchAsync(async (req: RequestWithUser, res) => {
        const kitTestId = req.params.testKitId
        const data = await this.service.getForTest({
            kitTestId,
        })

        return res.status(StatusCodes.OK).json({
            data,
        })
    })
}
