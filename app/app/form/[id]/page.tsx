"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input";
import FormLayout from "@/components/Layout/FormLayout";
import { Button } from "@/components/ui/button";
import { getFormById } from "@/lib/Form";

export default function Page({ params }: {params: { id: string}}) {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ form, setForm ] = useState<any>()
    const [ response, setResponse ] = useState<{ [key: string]: string}>({});
    useEffect(() => {
        const fetch = async () => {
            const formData = await getFormById(params.id);
            console.log(formData);
            setForm(formData.form);
            setLoading(false);
        }
        fetch();
    },[])
    const handleInputChange = (e:any) => {
        setResponse({...response, [e.target.id]: e.target.value });
    }
    const handleFormSubmit = async (e:any) => {
        e.preventDefault();
    }
    return (
        <>
        <center>
        <FormLayout>
        {
            loading === true &&
            <>
            <br />
            <h2>loading your precious form..</h2>
            </>
        }
        {
            loading === false && 
            <>
            <br />
            <h2 className=" text-2xl font-bold">{form.title}</h2>
            <br />
            <form onSubmit={handleFormSubmit}>
            {
                form.fields.map((field:Field) => {
                    return (
                        <div key={field.id} className='text-left'>  
                        <label className="text-left">{field.label}</label>
                            {field.type === 'text' && <><Input className="w-1/2" type='text'/></>}
                            {field.type === 'number' && <><Input className='w-1/2' type='number' /></>}
                        </div>
                    )
                })
            }
            <br />
            <Button type="submit">Submit Form</Button>
            </form>
            </>
        }
        </FormLayout>
        </center>
        </>
    )
}