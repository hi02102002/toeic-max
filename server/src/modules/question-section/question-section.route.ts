import { CrudRoute } from '@/libs/api/crud.route'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import Container from 'typedi'
import { QuestionSectionController } from './question-section.controller'
import {
    CreateQuestionDto,
    QueryQuestionSectionDto,
} from './question-section.dto'

// export class QuestionSectionRoute implements IRoutes {
//     path = '/questions'
//     router = Router()
//     controller = Container.get(QuestionSectionController)

//     constructor() {
//         this.initRoutes()
//     }

//     initRoutes(): void {
//         this.router.get(
//             `${this.path}/for-test/:testKitId`,
//             this.controller.getForTest,
//         )
//         this.router.get(
//             `${this.path}/for-practice/:part/:numOfQuestions`,
//             AuthMiddleware,
//             this.controller.getForPractice,
//         )
//         this.router.get(`${this.path}/get-all`, this.controller.getAll)
//         this.router.get(`${this.path}/:id`, this.controller.getOneById)
//         this.router.post(
//             `${this.path}`,
//             AuthMiddleware,
//             RolesMiddleware(['ADMIN']),
//             ValidationMiddleware(CreateQuestionDto),
//             this.controller.create,
//         )
//         this.router.put(
//             `${this.path}/:id`,
//             AuthMiddleware,
//             RolesMiddleware(['ADMIN']),
//             ValidationMiddleware(CreateQuestionDto),
//             this.controller.update,
//         )
//         this.router.delete(
//             `${this.path}/:id`,
//             AuthMiddleware,
//             RolesMiddleware(['ADMIN']),
//             this.controller.delete,
//         )
//         this.router.get(
//             this.path,
//             ValidationMiddleware(QueryQuestionSectionDto, 'query'),
//             this.controller.getPaging,
//         )
//     }
// }

export class QuestionSectionRoute extends CrudRoute<QuestionSectionController> {
    constructor() {
        super({
            controller: Container.get(QuestionSectionController),
            dtos: {
                createDto: CreateQuestionDto,
                updateDto: CreateQuestionDto,
                queryDto: QueryQuestionSectionDto,
            },
            path: '/questions',
        })

        this.extendRoutes()
    }

    extendRoutes(): void {
        this.router.get(
            `${this.path}/for-test/:testKitId`,
            this.controller.getForTest,
        )
        this.router.get(
            `${this.path}/for-practice/:part/:numOfQuestions`,
            AuthMiddleware,
            this.controller.getForPractice,
        )
    }
}
