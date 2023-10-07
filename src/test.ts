import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    try {
        const user = await prisma.user.create({
          data: {
            name: "a",
            email:"a",
            password: "a",
          },
        });
      
        return user;
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Could not create user'); // You can customize the error message
      }
}

main();