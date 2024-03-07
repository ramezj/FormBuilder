import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authConfig:NextAuthOptions = {
    providers: [ 
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session({ session, token, user }) {
          return session
        },
      },
    session: {
        strategy: 'jwt',
    },
}
