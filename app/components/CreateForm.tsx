"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function CreateForm() {
    const router = useRouter();
    const [ name, setName ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);
    const CreateNewForm = async (e:any) => {
        setLoading(true);
        e.preventDefault();
        const formData = {
            title:name,
            fields:[]
        }
        const res = await axios.post('/api/form/create', formData);
        const response = await res.data;
        if(response.ok === true) {
            setLoading(false);
            router.push(`/form/edit/${response.response.id}`)
        } else {
            console.error('something went wrong');
        }
    }
    return (
        <>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Form</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              value={name}
              onChange={((e) => {setName(e.target.value)})}
              id="name"
              className="col-span-3"
            />
          </div>
         </div>
        <DialogFooter>
            {
                loading 
                ? 
                <>
                     <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Create Form
                    </Button>
                </>
                : 
                <>
                    <Button onClick={CreateNewForm}>Create form</Button>
                </>
            }
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </>
    )
}