"use client"
import { useState } from "react"

export default function page() {
    const [ formTitle, setFormTitle ] = useState<string>();
    const [ fields, setFields ] = useState<Field[]>([
        {type: 'text', label:'Enter name'},
        {type: 'number', label:'Enter phone number'}
    ]);
    {fields.map((field, index) => {
        console.log(field, index);
    })}
    return (
        <>
            {fields.map((field, index) => {
                return (
                    <>
                        <input key={index} type={field.type}/>
                    </>
                )
            })}
        </>
    )
}