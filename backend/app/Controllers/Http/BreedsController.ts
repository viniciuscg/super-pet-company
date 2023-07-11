import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Breed from 'App/Models/Breed'

export default class BreedsController {
    public async index(_ctx: HttpContextContract) {
        const getBreeds = await Breed.all()
        return getBreeds
    }
}
