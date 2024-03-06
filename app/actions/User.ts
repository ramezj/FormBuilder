import { prisma } from './../lib/prisma';

export async function GetUser() {
    const user = await prisma.user.findFirst({
        where: {
            email:"ramezjoseph8@gmail.com"
        }
    });
    if(!user) {
        return "not found"
    }
    return user;
}