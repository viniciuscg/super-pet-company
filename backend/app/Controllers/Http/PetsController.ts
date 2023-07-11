import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pet from 'App/Models/Pet'

export default class PetsController {
    public async index(_ctx: HttpContextContract) {
        const getPets = await Pet.query().preload("user").preload("breed")
        return getPets
    }
    
    public async resgisterPet({request}: HttpContextContract) {
        const { name, size, weight, breedId } = request.body()
        const { userId } = request.params()

        const pet = new Pet()

        pet.name = name
        pet.size = size
        pet.weight = weight
        pet.user_id = userId
        pet.breed_id = breedId

        await pet.save()

        return pet
    }

    public async getPets({request}: HttpContextContract) {
        const { userId } = request.params()
        
        const pets = await Pet.query()
            .preload("breed")
            .where("user_id", userId)

        return pets
    }

    public async editPet({request}: HttpContextContract) {
        const { id } = request.params()
        const { name, size, weight, breedId } = request.body()

        const pet = await Pet.findOrFail(id)

        pet.name = name
        pet.size = size
        pet.weight = weight
        pet.breed_id = breedId

        await pet.save()

        return pet
    }

}

