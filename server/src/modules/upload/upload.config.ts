import { extname, join } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import multer, { diskStorage } from 'multer'

const storage = diskStorage({
    destination: (_req, _file, cb) => {
        const path = join(__dirname, '../../uploads')

        if (!existsSync(path)) {
            mkdirSync(path)
        }

        cb(null, path)
    },
    filename: (_req, file, cb) => {
        const name = file.originalname.split('.')[0]

        const fileExtName = extname(file.originalname)

        const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')

        cb(null, `${name}-${randomName}${fileExtName}`)
    },
})

const upload = (fileTypes: string[], fileSize = 10) =>
    multer({
        storage,
        fileFilter: (_req, file, cb) => {
            const ext = extname(file.originalname)

            if (fileTypes.includes(ext)) {
                return cb(null, true)
            }

            return cb(new Error('Only images are allowed'))
        },
        limits: {
            fileSize: 1024 * 1024 * fileSize,
        },
    })

export { upload }
