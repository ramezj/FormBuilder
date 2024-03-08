import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function  POST(request: Request,{params}:{params:{id:string}}) {
    const id = params.id;
}