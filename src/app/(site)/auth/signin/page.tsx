import { Signin } from '@/_core/components/site/signin/signin';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log in',
}

export default function SigninPage() {
  return <Signin />;
}