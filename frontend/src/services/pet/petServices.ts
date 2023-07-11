import { api } from "../api";
import { Pet } from "./petModel";

export interface IGetPets {
    id: number,
    name: string,
    size: string,
    weight: number,
    breed_id: number,
    breed: {
        id: number,
        name: string,
    }
}

export interface IRegisterPets {
    name: string,
    size: string,
    weight: number,
    user_id: number,
    breed_id: number
}

export interface IEditPet {
    name: string,
    size: string,
    weight: number,
    breed_id: number
}

export class PetServices {
      
    static async getPets(userId: number) {
        const response = await api.get<IGetPets[]>(`/pet/user/${userId}`)
        return response.data
    }     
    
    static async RegisterPet(data: IRegisterPets) {
        try {
            const response = await api.post(`/pet/user/${data.user_id}`, {
                name: data.name ,
                weight: data.weight,
                size: data.size,
                breed_id: data.breed_id
            })
            return response.data
        } catch (error) {
            throw new Error("pet ja existente");
        } 
    }     

    static async editPet(id: number, data: IEditPet) {
        try {
            const response = await api.put<Pet>(`/pet/edit/${id}`, {
                name: data.name ,
                weight: data.weight,
                size: data.size,
                breedId: data.breed_id
            })
            return response.data
        } catch (error) {
            throw new Error("não possivel editar esse pet");
        }
    }
}