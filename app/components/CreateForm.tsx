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
import { createForm } from "@/lib/Form"

export default function CreateForm() {
    const router = useRouter();
    const [ name, setName ] = useState<string>("");
    const [ buttonText, setButtonText ] = useState<any>("Create form");
    const [ loading, setLoading ] = useState<boolean>(false);
    const CreateNewForm = async (e:any) => {
      e.preventDefault();
      setLoading(true);
      const response = await createForm(name);
      setLoading(false);
      if(response.ok === true ) {
        router.push(`/form/edit/${response.form?.id}`)
      } else {
        // catch error here and display to user
        if(response.ok === false ) {
          setButtonText(response.error);
        }
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
        <form onSubmit={CreateNewForm}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
            required
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
                     <Button className="w-full" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Create Form
                    </Button>
                </>
                : 
                <>
                    <Button type="submit" className="w-full">{buttonText}</Button>
                </>
            }
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
        </>
    )
}