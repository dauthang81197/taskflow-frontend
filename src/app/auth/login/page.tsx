import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/features/auth-management/components/login-form';

type SearchParams = {
  registered?: string;
};

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Authenticate with email/password or OAuth providers.',
};

export default function LoginPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const registered = searchParams?.registered === '1';

  return (
    <main className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-lg flex-col justify-center gap-10 px-4 py-12">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in with your credentials or continue with a connected provider.
        </p>
        {registered && (
          <p className="text-sm text-emerald-600">
            Account created successfully. Please sign in to continue.
          </p>
        )}
      </div>

      <LoginForm />

      <p className="text-sm text-muted-foreground text-center">
        Don&apos;t have an account yet?{' '}
        <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
          Create one now
        </Link>
      </p>
    </main>
  );
}


