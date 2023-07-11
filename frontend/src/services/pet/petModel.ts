import { Breed } from "../breed/breedModel"
import { User } from "../user/userModel"

export interface Pet {
  id: number
  name: string
  size: string
  weight: number
  user_id: number
  breed_id: number
  breed: Breed
  user: User
}
