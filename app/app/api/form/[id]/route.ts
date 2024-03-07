import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function  GET(request: Request,{params}:{params:{id:string}}) {
    const id = params.id;
    const form = await prisma.form.findFirst({
        where: {
            id:id
        },
        include: {
            fields:true
        }
    });
    if(!form) return NextResponse.json({ok:false, msg: 'Form Not Found'})
    return NextResponse.json({form});
}