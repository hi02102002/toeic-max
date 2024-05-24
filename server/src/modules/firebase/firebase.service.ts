import { FIREBASE_PROJECT_ID } from '@/config'
import { firebase } from '@/libs/firebase'
import { logger } from '@/utils/logger'
import cuid2 from '@paralleldrive/cuid2'
import { getDownloadURL } from 'firebase-admin/storage'
import { lookup } from 'mime-types'
import fs from 'node:fs/promises'
import { Service } from 'typedi'

const storageUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_PROJECT_ID}.appspot.com/o`

@Service()
export class FirebaseService {
    async uploadFile(file: Express.Multer.File) {
        const token = cuid2.createId()

        await firebase
            .storage()
            .bucket()
            .upload(file.path, {
                public: true,
                destination: `/${file.filename}`,
                metadata: {
                    firebaseStorageDownloadTokens: token,
                },
                contentType: lookup(file.path) as string,
            })

        logger.info(`[FIREBASE] Upload file ${file.path}`)

        try {
            await fs.unlink(file.path)
            logger.info(
                `[FIREBASE] Delete file on ${file.path} after upload to firebase`,
            )
        } catch (error) {
            logger.error(
                `[FIREBASE] this file ${file.path} not exist but i will ignore it`,
            )
        }
        const fileRef = firebase.storage().bucket().file(`/${file.filename}`)

        const url = await getDownloadURL(fileRef)

        logger.info(`[FIREBASE] Get download url ${url}`)

        return url
    }

    async uploadFiles(files: Express.Multer.File[]) {
        const urls = await Promise.all(
            files.map(async (file) => this.uploadFile(file)),
        )

        return urls
    }

    async deleteFile(url: string) {
        try {
            if (!url.includes(storageUrl)) return

            const path = this.getPathStorageFromUrl(url)

            await firebase.storage().bucket().file(path).delete()

            logger.info(`[FIREBASE] Delete file ${path}`)
        } catch (error) {
            logger.error(`[FIREBASE] Delete file ${error}`)
        }
    }

    async deleteFiles(urls: string[]) {
        await Promise.all(urls.map((url) => this.deleteFile(url)))
    }

    private getPathStorageFromUrl(url: string) {
        let imagePath: string = url.replace(storageUrl, '')

        const indexOfEndPath = imagePath.indexOf('?')

        imagePath = imagePath.substring(0, indexOfEndPath)

        imagePath = imagePath.replace(/%2F/g, '/')

        imagePath = imagePath.replace(/%20/g, ' ')

        return imagePath
    }

    async verifyIdToken(token: string) {
        logger.info(`[FIREBASE] Verify token ${token}`)
        const decoded = await firebase.auth().verifyIdToken(token)

        if (!decoded.uid) {
            return null
        }

        const user = await firebase.auth().getUser(decoded.uid)

        if (!user) {
            return null
        }

        logger.info(`[FIREBASE] Verify token success`)
        return {
            email: user.providerData[0]?.email || user.email || null,
            uid: user.uid,
            name: user.providerData[0].displayName || user.displayName || null,
            avatar: user.providerData[0].photoURL || user.photoURL || null,
            provider: user.providerData[0].providerId,
            isVerified: user.emailVerified,
        }
    }
}
