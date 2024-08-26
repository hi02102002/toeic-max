import { db } from '@/database/db'
import { users } from '@/database/schema'
import { HttpException } from '@/exceptions/http-exception'
import { CRUDBaseService } from '@/libs/api/crud.service'
import { redis } from '@/libs/redis'
import { FirebaseService } from '@/modules/firebase'
import { getAvatar } from '@/utils/common'
import * as bcrypt from 'bcrypt'
import { and, eq } from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'
import { Service } from 'typedi'
import { TNewUser, TUser } from './user.type'
import { ChangePasswordDto, UpdateInfoUserDto } from './users.dto'

@Service()
export class UserService extends CRUDBaseService<
    TNewUser,
    Partial<TNewUser>,
    TUser
> {
    constructor(private readonly firebaseService: FirebaseService) {
        super(users)
    }

    public async getOneByEmail(email: string) {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        })

        return user
    }

    async create<T = TUser>(data: TNewUser) {
        const user = await super.create({
            ...data,
            avatar: getAvatar(data.name),
        })

        return user as T
    }

    public async getOneByEmailAndProvider(email: string, provider: string) {
        const user = await db.query.users.findFirst({
            where: and(eq(users.email, email), eq(users.provider, provider)),
        })

        return user
    }

    public async updateInformation(id: string, fields: UpdateInfoUserDto) {
        try {
            const { name, avatar, email } = fields

            const user = await this.getOneById(id, {
                throwIfNotFound: true,
                message: 'User with this id not found.',
            })

            await this.firebaseService.deleteFile(user?.avatar)

            const [userUpdated] = await db
                .update(users)
                .set({
                    name,
                    avatar,
                    email,
                })
                .where(eq(users.id, id))
                .returning()

            await redis.set(`user:${id}`, JSON.stringify(userUpdated))

            return userUpdated
        } catch (error) {
            if (fields.avatar) {
                await this.firebaseService.deleteFile(fields.avatar)
            }

            throw error
        }
    }

    public async changePassword(id: string, fields: ChangePasswordDto) {
        const { oldPassword, password } = fields

        const user = await this.getOneById(id, {
            throwIfNotFound: true,
            message: 'User with this id not found.',
        })

        if (user.provider !== 'local') {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'You are using a social account to login, please change password on the social network you are using.',
            )
        }

        if (!user) {
            throw new HttpException(StatusCodes.NOT_FOUND, 'User not found')
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isPasswordMatch) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Old password is incorrect',
            )
        }

        const [userUpdated] = await db
            .update(users)
            .set({
                password: await bcrypt.hash(password, 10),
            })
            .where(eq(users.id, id))
            .returning()

        return userUpdated
    }
}
