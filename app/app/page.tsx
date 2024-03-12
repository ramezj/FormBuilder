"use client"
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateForm from "@/components/CreateForm";
import { signIn } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
    {
      status == "authenticated" &&
      <>
      <p>signed in as {JSON.stringify(session.user)}</p>
      </>
    }
    { status === "unauthenticated" && 
    <>
    <Button onClick={(() => signIn('google'))}>
      Continue with google
    </Button>
    </>
    }
    <br />
    <center>
      <br />
      <h1 className='font-light text-6xl'>Experience the future of form building.</h1>
      <CreateForm />
    </center>
    </>
  );
}
