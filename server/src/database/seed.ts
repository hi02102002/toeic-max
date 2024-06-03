import 'reflect-metadata'

import { LOGGER_SECTION } from '@/constants/common'
import { UserService, TUser } from '@/modules/user'
import { getAvatar } from '@/utils/common'
import { logger } from '@/utils/logger'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import Container from 'typedi'

export const seedUsers = async () => {
    const userService = Container.get(UserService)

    const ADMIN_USER: Omit<TUser, 'id'> = {
        email: 'admin@gmail.com',
        password: 'admin123456',
        avatar: getAvatar('admin'),
        isVerified: true,
        name: 'Admin',
        provider: 'local',
        roles: ['ADMIN'],
    }

    const USERS = Array.from({ length: 30 })
        .map(() => {
            const name = faker.internet.displayName()
            return {
                avatar: getAvatar(name),
                email: faker.internet.email(),
                isVerified: true,
                name,
                password: '123456',
                provider: 'local',
                roles: ['USER'],
            } as Omit<TUser, 'id'>
        })
        .concat(ADMIN_USER)

    const USER_HASHED = await Promise.all(
        USERS.map(async (user) => {
            const password = await bcrypt.hash(user.password, 10)
            return { ...user, password }
        }),
    )

    await userService.createMany(USER_HASHED)

    logger.info(`${LOGGER_SECTION.SEED} Seed ${USER_HASHED.length} users`)
}

seedUsers()
    .then(() => {
        process.exit(0)
    })
    .catch(() => {
        process.exit(1)
    })
