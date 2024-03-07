"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react"
import axios from "axios";

export default function page() {
    const [ formTitle, setFormTitle ] = useState<string>("Hello World!");
    const [ fields, setFields ] = useState<Field[]>([]);
    const addNewField = (e:any) => {
        setFields([...fields,  { type: 'text', label:'New Field'}])
    }
    const handleSubmit = async () => {
        try {
            const formData = {
                title: formTitle,
                fields
            };
            const res = await axios.post('/api/form/create', formData);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
        <Button onClick={addNewField}>
            Add New Field
        </Button>
            {fields.map((field, index) => {
                return (
                    <div key={index}>
                        <label>{field.label}</label>
                        <input type={field.type}/>
                        <br />
                    </div>
                )
            })}
            <Button onClick={handleSubmit}>Submit New Form</Button>
        </>
    )
}