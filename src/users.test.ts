import {vi} from 'vitest'
import {TOKEN_EXPIRY_DAYS, Users} from './users'
import {PrismaClient} from '@prisma/client'
import JWT from 'jsonwebtoken'

const client = new PrismaClient()

describe('users', () => {

    afterAll(() => {
        vi.clearAllMocks()
    })

    test('throws if constructor options invalid', () => {
        // @ts-ignore
        expect(() => new Users()).throws()
    })

    test('returns a Users object', () => {
        const users = new Users(client.user)

        expect(users.UserModel).toBeDefined()
    })

    test('throws if options are invalid', async () => {
        // @ts-ignore
        await expect(Users.hashPassword()).rejects.toThrow('data and salt arguments required')
    })

    test('hashes a password', async () => {
        const hash = await Users.hashPassword('password');

        expect(hash).toMatch('$2b$05')
    })

    test('returns false if password is incorrect', async () => {
        const result = await Users.isValidPassword('password', 'hash')
        expect(result).toBe(false)
    })

    test('returns true if password is correct', async () => {
        const hash = await Users.hashPassword('password');
        const result = await Users.isValidPassword('password', hash)
        expect(result).toBe(true)
    })

    test('throws if no user is passed', () => {
        // @ts-ignore
        expect(() => Users.createToken()).throws()
    })

    test('create a token', () => {
        // @ts-ignore
        const data = Users.createToken({id: '123', email: 'test@test.test'})
        expect(data).toStrictEqual({
            token: expect.any(String),
            expiryInDays: TOKEN_EXPIRY_DAYS
        })
    })

    test('get user info from token', () => {
        // @ts-ignore
        const data = Users.createToken({id: '123', email: 'test@test.test'})
        const userData = Users.getUserInfoFromToken(data.token)

        expect(userData).toStrictEqual({
            id: '123',
            email: 'test@test.test'
        })
    })

    test('getUsersInfoFromToken - return undefined if an error occures', () => {
        const mock = vi.spyOn(JWT, 'verify').mockImplementation(() => {
            throw new Error('')
        })

        const result = Users.getUserInfoFromToken('1234')
        expect(mock).toHaveBeenCalled()
        expect(result).toBeUndefined()
    })

    describe('users - add', () => {
        test('throws if options are invalid', async () => {
            // @ts-ignore
            await expect(new Users(client.user).add()).rejects.toThrow('"value" is required')
        })
    })
});

