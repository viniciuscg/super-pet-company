import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pet from './Pet'

export default class User extends BaseModel {
  public static table  = "user"

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ columnName: "last_name" })
  public lastName: string

  @column()
  public email: string

  @column()
  public password: string

  @column({ columnName: "is_admin" })
  public isAdmin: number

  @hasMany(() => Pet)
  public pets: HasMany<typeof Pet>
}
