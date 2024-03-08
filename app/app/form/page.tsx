"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react"
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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

export default function page() {
    const [ formTitle, setFormTitle ] = useState<string>("");
    const [ fields, setFields ] = useState<Field[]>([]);
    const [ fieldLabel, setFieldLabel ] = useState<string>("");
    const [ fieldType, setFieldType ] = useState<string>("text");
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
        <center>
        <Input value={formTitle} onChange={((e) => {setFormTitle(e.target.value)})} className="border-none text-lg w-1/2" placeholder="Form Name" />
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
                <SelectTrigger className="w-[180px]">
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
            {fields.map((field) => {
                return (
                    <div key={field.id}>
                        <label>{field.label}</label>
                        <Input className="w-1/2" type={field.type}/>
                        <Button onClick={(() => {removeField(field.id)})}>Delete</Button>
                        <br />
                    </div>
                )
            })}
            <br />
            <Button onClick={handleSubmit}>Create Form</Button>
            </center>
        </>
    )
}