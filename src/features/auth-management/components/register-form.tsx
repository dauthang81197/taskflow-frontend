'use client';

import { useState } from 'react';
import { Loader2, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegisterMutation } from '../hooks';
import { parseApiError } from '@/lib/http';

type RegisterFormState = {
  name: string;
  email: string;
  password: string;
};

const defaultState: RegisterFormState = {
  name: '',
  email: '',
  password: '',
};

export function RegisterForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<RegisterFormState>(defaultState);
  const registerMutation = useRegisterMutation();

  const registerError = registerMutation.error
    ? parseApiError(registerMutation.error)
    : null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerMutation.mutate(formState, {
      onSuccess: () => {
        setFormState(defaultState);
        router.push('/auth/login?registered=1');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="register-name">Full name</Label>
        <Input
          id="register-name"
          placeholder="Jane Doe"
          value={formState.name}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, name: event.target.value }))
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email">Email address</Label>
        <Input
          id="register-email"
          type="email"
          placeholder="you@example.com"
          value={formState.email}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, email: event.target.value }))
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <Input
          id="register-password"
          type="password"
          placeholder="Create a secure password"
          value={formState.password}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, password: event.target.value }))
          }
          required
        />
        <p className="text-xs text-muted-foreground">
          Minimum 8 characters, ideally with both letters and numbers.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <UserPlus className="mr-2 size-4" />
        )}
        Create account
      </Button>

      {registerError && (
        <p className="text-sm text-destructive">{registerError.message}</p>
      )}
      {registerMutation.isSuccess && !registerError && (
        <p className="text-sm text-emerald-600">
          Account created. Redirecting to sign in…
        </p>
      )}
    </form>
  );
}


