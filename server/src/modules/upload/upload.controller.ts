import { Service } from 'typedi'
import { FirebaseService } from '../firebase'
import { catchAsync } from '@/utils/catch-async'

@Service()
export class UploadController {
    constructor(private readonly firebaseService: FirebaseService) {}

    uploadFile = catchAsync(async (req, res) => {
        const url = await this.firebaseService.uploadFile(req.file)

        return res.json({
            data: url,
        })
    })

    uploadFiles = catchAsync(async (req, res) => {
        const urls = await this.firebaseService.uploadFiles(
            req.files as Express.Multer.File[],
        )

        return res.json({
            data: urls,
        })
    })

    deleteFile = catchAsync(async (req, res) => {
        await this.firebaseService.deleteFile(req.body.url)

        return res.json({
            message: 'Delete file successfully',
        })
    })

    deleteFiles = catchAsync(async (req, res) => {
        const urls = req.body.urls as string[]

        await this.firebaseService.deleteFiles(urls)

        return res.json({
            message: 'Delete files successfully',
        })
    })
}
