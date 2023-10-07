import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType()
export class User {

    @Field(type => ID)
    id!: number;

    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field({nullable: true})
    password!: string;

}

@InputType()
export class UserCreateInput {
    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;
}
