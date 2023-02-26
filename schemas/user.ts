import { getModelForClass, prop } from '@typegoose/typegoose';

export class UserClass {
  @prop({ index: true, unique: true })
    name!: string;

  @prop()
    sol_address!: string;

  @prop()
    refresh_token!: string;

  @prop()
    access_token!: string;

  @prop()
    image!: string;

  @prop()
    referrer!: string;

  @prop()
    created_at!: Date;
}

export function UserModel() {
  return getModelForClass(UserClass);
}
