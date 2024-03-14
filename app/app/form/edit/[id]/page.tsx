"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import FormLayout from "@/components/Layout/FormLayout";
import { getFormById, EditForm } from "@/lib/Form";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
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
import { Loader2 } from "lucide-react"
import { CreateField, DeleteField } from "@/lib/Field";


export default function Page({ params }: {params: { id: string}}) {
    const router = useRouter();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ saveLoading, setSaveLoading ] = useState<boolean>(false);
    const [ form, setForm ] = useState<any>();
    const [ fields, setFields ] = useState<Field[]>([]);
    const [ fieldLabel, setFieldLabel ] = useState<string>("");
    const [ fieldType, setFieldType ] = useState<string>("text");
    const [ options, setOptions ] = useState<string[]>([""]) 
    const [ response, setResponse ] = useState<{ [key: string]: string}>({});
    const CreateNewField = async () => {
      const NewF = await CreateField(fieldLabel, fieldType, params.id, options);
      if(NewF.ok == true) {
        setFields([...fields, NewF.field as Field]);
      } else {
        console.error(NewF.error);
      }
    }
    const DeleteFieldById = async (fieldId:any) => {
      const deleteF = await DeleteField(fieldId);
      if(deleteF.ok == true) {
        console.log('field deleted successfully')
      } else {
        console.error(deleteF.error);
      }
    }
    useEffect(() => {
      const fetchForm = async () => {
        const response = await getFormById(params.id);
        if(response.ok === false) {
          router.push('/not-found')
        }
        else if(response.ok === true && response.form?.fields ) {
          setForm(response.form);
          setFields(response.form.fields);
        }
        setLoading(false);
      }
      fetchForm();
    },[])
    console.log(fields);
    const EditFormFields = async () => {
      setSaveLoading(true);
      const response = await EditForm(params.id, fields);
      setSaveLoading(false);

    }
    const handleInputChange = (e:any) => {
        setResponse({...response, [e.target.id]: e.target.value });
    }
    const handleFormSubmit = async (e:any) => {
        e.preventDefault();
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
      <DialogContent>
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
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="radio">Radio</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={CreateNewField} className="w-full">Add Field</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            {
                fields.map((field:Field) => {
                    return (
                        <div key={field.id} className='text-left flex align-middle gap-2'>  
                        {field.id}
                          <label>{field.label}</label>
                            {field.type === 'text' && <><Input className="w-1/2" type='text'/></>}
                            {field.type === 'number' && <><Input className='w-1/2' type='number' /></>}
                            {field.type === 'radio' && <></>}
                            <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline"><Settings strokeWidth={1.5} className='w-5 h-5'/></Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit Field</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-left">
                                    Label
                                  </Label>
                                  <Input
                                    id="name"
                                    value={field.label}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="username" className="text-left">
                                    Username
                                  </Label>
                                  <Input
                                    id="username"
                                    defaultValue="@peduarte"
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <DialogFooter className='flex'>
                                <Button variant={"destructive"} onClick={(() => DeleteFieldById(field.id))} className="w-full">Delete</Button>
                                <Button type="submit" className="w-full">Save changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                    )
                })
            }
            <br />
            </>
        }
        {
          saveLoading 
          ? 
          <>
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Save Form
              </Button>
          </> 
          : 
          <>
              <Button onClick={EditFormFields}>Save Form</Button>
          </>
        }
        </FormLayout>
        </center>
        </>
    )
}