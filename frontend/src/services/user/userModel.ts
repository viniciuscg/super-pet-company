import { Pet } from "../pet/petModel"

export interface User {
    id: number
    name: string
    last_name: string
    email: string
    password: string
    is_admin: number
    pets: Pet[]
}
