import type { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/features/auth-management/components/register-form';

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Register a new user with email and password credentials.',
};

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-lg flex-col justify-center gap-10 px-4 py-12">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-muted-foreground">
          Provide your name, email, and a secure password to get started.
        </p>
      </div>

      <RegisterForm />

      <p className="text-sm text-muted-foreground text-center">
        Already registered?{' '}
        <Link href="/auth/login" className="text-primary underline-offset-4 hover:underline">
          Sign in instead
        </Link>
      </p>
    </main>
  );
}


