"use client"
import axios from "axios"
import { useState, useEffect } from "react"
export default function Page({ params }: {params: { id: string}}) {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ form, setForm ] = useState<any>()
    const [ response, setResponse ] = useState<{ [key: string]: string}>({});
    useEffect(() => {
        const fetchForm = async () => {
            const response = await axios.get(`/api/form/${params.id}`);
            setForm(response.data.form);
            setLoading(false);
        }
        fetchForm();
    },[])
    const handleInputChange = (e:any) => {
        setResponse({...response, [e.target.id]: e.target.value });
    }
    const handleFormSubmit = async (e:any) => {
        e.preventDefault();
    }
    return (
        <>
        {
            loading === false && 
            <>
            <h2>Form Name : {form.title}</h2>
            <br />
            <h2>Form Fields :</h2>
            <br />
            <form onSubmit={handleFormSubmit}>
            {
                form.fields.map((field:Field) => {
                    return (
                        <div key={field.id}>  
                        <label>{field.label}</label>
                            {field.type === 'text' && <><input type='text'/></>}
                            {field.type === 'number' && <><input type='number' /></>}
                        </div>
                    )
                })
            }
            </form>
            </>
        }
        </>
    )
}