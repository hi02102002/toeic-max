import { IRoutes } from '@/interfaces/routes.interface'
import { Router } from 'express'
import Container from 'typedi'
import { UploadController } from './upload.controller'
import { upload } from './upload.config'

export class UploadRoute implements IRoutes {
    path = '/upload'
    router = Router()
    controller = Container.get(UploadController)

    constructor() {
        this.initRoutes()
    }

    initRoutes(): void {
        this.router.post(
            `${this.path}/image`,
            upload(['.png', '.jpg', '.jpeg', '.gif', '.svg']).single('image'),
            this.controller.uploadFile,
        )

        this.router.post(
            `${this.path}/images`,
            upload(['.png', '.jpg', '.jpeg', '.gif', '.svg']).array(
                'images',
                4,
            ),
            this.controller.uploadFiles,
        )

        this.router.post(
            `${this.path}/audio`,
            upload(['.mp3'], 50).single('audio'),
            this.controller.uploadFile,
        )
    }
}
