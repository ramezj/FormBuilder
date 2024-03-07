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
    const [ formTitle, setFormTitle ] = useState<string>("Hello World!");
    const [ fields, setFields ] = useState<Field[]>([]);
    const [ fieldLabel, setFieldLabel ] = useState<string>("");
    const [ fieldType, setFieldType ] = useState<string>();
    const addNewField = (e:any) => {
        setFields([...fields,  { type: 'text', label:fieldLabel}])
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
              placeholder="Enter Email"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Type
            </Label>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="text" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="apple">text</SelectItem>
                    <SelectItem value="banana">number</SelectItem>
                    <SelectItem value="blueberry">radio</SelectItem>
                    <SelectItem value="grapes">dropdown</SelectItem>
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
            {fields.map((field, index) => {
                return (
                    <div key={index}>
                        <label>{field.label}</label>
                        <input type={field.type}/>
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