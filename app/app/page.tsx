"use client"
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { GetUser } from "@/actions/User";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
    <Navbar />
    <h1 className='text-lg'>HireStudent</h1>
    {
      status == "authenticated" &&
      <>
      <p>signed in as {JSON.stringify(session.user)}</p>
      </>
    }
    <ThemeToggle />
    </>
  );
}
