"use server"

import { authConfig } from "./Auth";
import prisma from "./prisma";
import { getServerSession } from "next-auth";

export default async function CreateField(label:string, type:string, formId:string, options:any) {
    const session = await getServerSession(authConfig);
    if(!session) return { ok:false, error: 'Unauthenticated', field:null }
    if(!label || !type || !formId) {
        return {
            ok:false,
            error: 'Field missing',
            field:null
        }
    }
    try {
        const form = await prisma.form.findFirst({
            where: {
                id: formId
            }
        })
        if(!form) return { ok:false, error:'form not found', field:null}
        const NewField = await prisma.field.create({
            data: {
                label: label,
                type: type,
                options:options,
                formId: formId as string
            }
        });
        if(!NewField) return { ok:false, error:'something went wrong', field:null}
        return { ok:true, error:null, field:NewField }
    } catch (error) {
        console.error(error);
        return { ok:false, error:'catched an error', field:null }
    }
}