import { Query, Resolver, Ctx, Mutation, Arg} from "type-graphql";
import { User, UserCreateInput } from "./user.type";
import { Context } from "./context";

@Resolver(_of => User)
export class UserResolver {
    @Query(_returns => [User])
    async getallUsers(@Ctx() ctx: Context): Promise<User[]> {
        const users = await ctx.prisma.user.findMany({});
        const finalusers: User[] = [];
        users.map(v => {
            v.password = "";
            finalusers.push(v);
        })
        return finalusers;
    }

    @Mutation(_returns => User)
    async createUser(@Arg('data') data: UserCreateInput, @Ctx() ctx: Context): Promise<User> {
        const user = await ctx.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        })

        return user;
    }
}