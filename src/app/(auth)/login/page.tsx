'use client';
import { SignInForm } from "@/components/login/form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const {data: session} = useSession();
  if (session) {
   redirect('/calculator')
  }
  return <SignInForm />;
}
