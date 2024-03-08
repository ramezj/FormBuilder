"use client"
export default function FormLayout(props:any) {
    return (
        <div className="2xl:w-1/2 h-screen">
            {props.children}
        </div>
    )
}