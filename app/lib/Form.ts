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
        return { form }
    } catch (error) {
        return { error }
    }
}

export async function createForm(title: string) {
    if(!title) {
        throw new Error('Form must have a name');
    }
    try {
        const NewForm = await prisma.form.create({
            data: {
                title:title
            }
        });
        const response = {
            ok:true,
            form:NewForm
        }
        return response;
    } catch (error) {
        const response = {
            ok:false,
            form:null
        }
        return response;
    }
}

export async function EditForm(formId:string, fields:Field[]) {
    try {
        const existingForm = await prisma.form.findUnique({
            where: { 
                id:formId 
            }
          });
          if (!existingForm) {
            throw new Error('Form not found');
          }
    } catch (error) {
        
    }
}