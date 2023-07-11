import { api } from "../api"
import { Breed } from "./breedModel"

export class BreedService {

    static async getBreeds() {
        const response = await api.get<Breed[]>(`/breeds`)
        return response.data
    } 

}