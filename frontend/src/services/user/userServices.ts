import { api } from "../api";

export interface IRegisterUser {
    name: string
    lastName: string
    email: string 
    password: string
}

export interface ILoginUser {
    email: string 
    password: string
}

export interface IGetUser {
    name: string
    lastName: string
    email: string 
}

export class UserServices {

    static async registerUser(name: string, lastName: string, email: string, password: string) {
        try {
            const response = await api.post<IRegisterUser>('/Register', {name, lastName, email, password})
            return response.data
        } catch (error) {
            throw new Error("usuario ja existente");
        }   
    } 
      
    static async loginUser( email: string, password: string) {
        try {
            const response = await api.post<ILoginUser>('/login', {email, password})
            return response.data
        } catch (error) {
            throw new Error("usuario inexistente");
        }   
    }   
      
    static async userStats(id: number) {
        const response = await api.get<IGetUser>(`/user/${id}`)
        return response.data
    }     
    
}