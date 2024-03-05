import { NextResponse } from 'next/server';
import { prisma } from './../../../lib/prisma';

export async function GET(request: Request) {
    try {
        const u = await prisma.user.findFirst();
        return NextResponse.json({
            user:u
        });
    } catch (error) {
        throw error;
    }
}