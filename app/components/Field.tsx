"use client"
import { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
export function Field( { field } : { field: Field}) {
    return (
        <div key={field.id}>
            <Label>{field.label}</Label>
            <Input type={field.type} className="w-1/3"></Input>
        </div>
    )
}