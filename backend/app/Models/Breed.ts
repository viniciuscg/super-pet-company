import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Breed extends BaseModel {
  public static table  = "breed"
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

}
