// import { Signup } from "@/_core/components/site/signup/signup";
import type { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Create Account',
}

export default function SignupPage() {
  return redirect('/');
  // return <Signup />;
}