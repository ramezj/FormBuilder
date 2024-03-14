"use server"

import { authConfig } from "./Auth";
import prisma from "./prisma";
import { getServerSession } from "next-auth";

export async function getFormById(id:string) {
    const session = await getServerSession(authConfig);
    if(!session) {
    return {
        ok:false,
        form:null,
        error: 'Please sign in first'
    }
    }
    try {
        const form = await prisma.form.findFirst({
            where: {
                id:id
            },
            include: {
                fields:true
            }
        });
        if(!form) { 
            const response = { ok:false, form: null, error:'form not found'};
            return response;
        }
        const response = { ok:true, form, error:null };
        return response
    } catch (error) {
        const response = { ok:false, form:null, error:error };
        return response;
    }
}

export async function createForm(title: string) {
    const session = await getServerSession(authConfig);
    if(!session) {
        return {
            ok:false,
            form:null,
            error: 'Please sign in first'
        };
    }
    if(!title) {
        return { 
            ok:false, 
            form:null, 
            error: 'title missing'
        };
    }
    const userExist = await prisma.user.findFirst({where: { id: session?.user?.id as string}});
    if(!userExist) {
        return { 
            ok: false, 
            form:null, 
            error:'User doesnt exist'
        }
    }
    try {
        const NewForm = await prisma.form.create({
            data: {
                title:title,
                userId:session.user?.id as string
            }
        });
        return { 
            ok:true, 
            form:NewForm, 
            error:null 
        };
    } catch (error) {
        console.error(error);
        return { 
            ok:false, 
            form:null, 
            error:'An error has occured'
        }
    }
}

export async function EditForm(formId:string, fields:Field[]) {
    const session = await getServerSession(authConfig);
    if(!session) {
        return {
            ok:false,
            form:null,
            error: 'Please sign in first'
        }
    }
    try {
        // check first if form exists.
        const existingForm = await prisma.form.findUnique({
            where: { 
                id:formId 
            }
          });
          if (!existingForm) {
            return { 
                ok:false, 
                form:null, 
                error:'form doesnt exist' 
            };
          }
          const fieldsWithFormId = fields.map((field) => ({
            ...field, formId:formId
          }))
          const createFields = await prisma.field.createMany({
            data: fieldsWithFormId,
          })
    } catch (error) {
        
    }
}