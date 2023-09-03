import {Users} from "~/src/users";
import {getCookie} from 'h3'

export default defineEventHandler(async (event) => {
    const cookie = getCookie(event, 'nuxt3-todo-token')
    if(!cookie) {
        return
    }

    const verifiedUser = Users.getUserInfoFromToken(cookie)

    if (!verifiedUser) {
        return
    }

    event.context.user = verifiedUser
})