import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Prisma, PrismaClient } from "@prisma/client";
import { authConfig } from "@/lib/Auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST}