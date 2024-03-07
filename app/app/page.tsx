"use client"
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { GetUser } from "@/actions/User";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <Button asChild>
      <Link href='/form'>
        Create Form
      </Link>
    </Button>
    </>
  );
}
