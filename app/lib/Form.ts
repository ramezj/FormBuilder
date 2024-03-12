"use server"

import { authConfig } from "./Auth";
import prisma from "./prisma";
import { getServerSession } from "next-auth";

export async function getFormById(id:string) {
    const session = await getServerSession(authConfig);
    if(!session) {
        const response = {
            ok:false,
            form:null,
            error: 'Please sign in first'
        }
    return response;
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
        const response = {
            ok:false,
            form:null,
            error: 'Please sign in first'
        }
        return response;
    }
    if(!title) {
        const response = { ok:false, form:null, error: 'title missing'}
        return response;
    }
    try {
        const NewForm = await prisma.form.create({
            data: {
                title:title,
                userId:session.user?.id as string
            }
        });
        const response = { ok:true, form:NewForm, error:null }
        return response;
    } catch (error) {
        const response = { ok:false, form:null, error:error }
        return response;
    }
}


export async function EditForm(formId:string, fields:Field[]) {
    const session = await getServerSession(authConfig);
    if(!session) {
        const response = {
            ok:false,
            form:null,
            error: 'Please sign in first'
        }
    return response;
    }
    try {
        // check first if form exists.
        const existingForm = await prisma.form.findUnique({
            where: { 
                id:formId 
            }
          });
          if (!existingForm) {
            const response = { ok:false, form:null, error:'form doesnt exist' }
            return response;
          }
          const fieldsWithFormId = fields.map((field) => ({
            ...field, formId:formId
          }))
          const createFields = await prisma.field.createMany({
            data: fieldsWithFormId,
          })
          console.log(createFields);
    } catch (error) {
        
    }
}