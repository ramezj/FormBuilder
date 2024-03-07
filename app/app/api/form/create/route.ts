import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req:NextRequest, res:NextResponse) { 
    const reqBody = await req.json();
    const { title, fields } = reqBody;
    try {
        const createForm = await prisma.form.create({
            data: {
                title,
                fields: {
                    create: fields
                }
            },
            include: {
                fields:true
            }
        });
        console.log(createForm);
        return NextResponse.json({
            ok:true,
            response:createForm
        })
    } catch (error) {
        console.error("error creating form", error);
        return NextResponse.error();
    }

}