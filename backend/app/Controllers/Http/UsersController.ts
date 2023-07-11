import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async index(_ctx: HttpContextContract) {
        const getUsers = await User.query().preload("pets")
        return getUsers
    }

    public async resgisterUser({request}: HttpContextContract) {
        const user = new User()
        const { name, lastName, email, password } = request.body()
        user.name = name
        user.lastName = lastName
        user.email = email
        user.password = password
        await user.save()
        return user
    }

    public async loginUser({request, response}: HttpContextContract) {
        const { email, password } = request.body()
        const user = await User.query()
            .where("email", email)
            .andWhere("password", password)
            .first()
        if (!user) {
            return response.notFound({msg: "error"})
        }
        return response.ok(user.id)
    }

    public async getUser({request}: HttpContextContract) {
        const { id } = request.params()
        const user = await User.query()
            .where("id", id)
            .first()
        return user
    }
}
