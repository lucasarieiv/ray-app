"use client";
import { SignInForm } from "@/components/login/signin-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    redirect("/calculator");
  }
  return (
    <div className="flex mx-auto mt-12 w-[37.2rem]">
      <SignInForm />
    </div>
  );
}
