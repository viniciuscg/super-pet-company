import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Breed from './Breed'
import User from './User'

export default class Pet extends BaseModel {
  public static table  = "pet"

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public size: string

  @column()
  public weight: number

  @column({ columnName: "user_id"})
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: "user_id"
  })
  public user: BelongsTo<typeof User>
  
  @column({ columnName: "breed_id"})
  public breed_id: number

  @belongsTo(() => Breed, {
    foreignKey: "breed_id"
  })
  public breed: BelongsTo<typeof Breed>
}
