"use server"

import prisma from "./prisma";

export async function getFormById(id:string) {
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
    if(!title) {
        const response = { ok:false, form:null, error: 'title missing'}
        return response;
    }
    try {
        const NewForm = await prisma.form.create({
            data: {
                title:title
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
    } catch (error) {
        
    }
}