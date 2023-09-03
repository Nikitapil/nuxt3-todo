import {tryWrap} from "~/helpers/tryWrap";
import {users} from "~/src/controllers";

export default defineEventHandler(async (event) => {
    try {
        const {email, password} = await readBody(event)

        const credentials = await users.login({email, password})

        setCookie(event, 'nuxt3-todo-token', credentials?.token || '', {
            expires: new Date(
                Date.now() + (credentials?.expiryInDays || 0) * 24 * 60 * 60
            )
        })

        return {result: 'success', error: null}
    } catch (e: any) {
        return {result: null, error: e.message}
    }
})