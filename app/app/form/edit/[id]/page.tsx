"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input";
import FormLayout from "@/components/Layout/FormLayout";
import { getFormById, EditForm } from "@/lib/Form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export default function Page({ params }: {params: { id: string}}) {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ form, setForm ] = useState<any>();
    const [ fields, setFields ] = useState<Field[]>([]);
    const [ fieldLabel, setFieldLabel ] = useState<string>("");
    const [ fieldType, setFieldType ] = useState<string>("text"); 
    const [ response, setResponse ] = useState<{ [key: string]: string}>({});
    useEffect(() => {
      const fetchForm = async () => {
        const response = await getFormById(params.id);
        setLoading(false);
        if(response.ok === true && response.form?.fields ) {
          setForm(response.form);
          setFields(response.form.fields);
        } else {
          // catch error here and handle it
        }
      }
      fetchForm();
    },[])
    const EditFormFields = async () => {
      const response = await EditForm(params.id, fields);

    }
    const handleInputChange = (e:any) => {
        setResponse({...response, [e.target.id]: e.target.value });
    }
    const handleFormSubmit = async (e:any) => {
        e.preventDefault();
    }
    const addNewField = (e:any) => {
        setFields([...fields,  { 
          id:Math.random().toString(36).substring(7),
          type: fieldType, 
          label:fieldLabel
        }])
    }
    const removeField = (id:any) => {
        const updatedFields = fields.filter(field => field.id !== id);
        setFields(updatedFields);
    }
    return (
        <>
        <center>
        <FormLayout>
        {
            loading === false && 
            <>
            <br />
            <h2 className=" text-2xl font-bold">{form.title}</h2>
            <br />
            <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Field</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Field</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Label
            </Label>
            <Input
                value={fieldLabel}
                onChange={((e) => {setFieldLabel(e.target.value)})}
              id="name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Type
            </Label>
            <Select value={fieldType} onValueChange={setFieldType}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="text" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="text">text</SelectItem>
                    <SelectItem value="number">number</SelectItem>
                    <SelectItem value="radio">radio</SelectItem>
                    <SelectItem value="dropdown">dropdown</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={addNewField}>Add Field</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            {
                fields.map((field:Field) => {
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
            </>
        }
        <Button onClick={EditFormFields}>Save Form</Button>
        </FormLayout>
        </center>
        </>
    )
}