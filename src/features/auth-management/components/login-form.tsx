'use client';

import {useState} from 'react';
import {AtSign, Github, Loader2, ShieldCheck} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {useQueryClient} from '@tanstack/react-query';
import {parseApiError} from '@/lib/http';
import {
    authKeys,
    useLoginMutation,
    useOAuthMutation,
} from '../hooks';

type LoginFormState = {
    email: string;
    password: string;
};

const defaultState: LoginFormState = {
    email: 'thanggdau811@gmail.com',
    password: 'Admin@123',
};

export function LoginForm() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [formState, setFormState] = useState<LoginFormState>(defaultState);

    const loginMutation = useLoginMutation();
    const oauthMutation = useOAuthMutation();

    const loginError = loginMutation.error
        ? parseApiError(loginMutation.error)
        : null;
    const oauthError = oauthMutation.error
        ? parseApiError(oauthMutation.error)
        : null;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginMutation.mutate(formState, {
            onSuccess: () => {
                setFormState(defaultState);

                queryClient.invalidateQueries({queryKey: authKeys.currentUser()});
                router.push('/dashboard');
            },
        });
    };

    const handleOAuthLogin = (provider: 'google' | 'github') => {
        oauthMutation.mutate(provider, {
            onSuccess: (data) => {
                if (typeof window !== 'undefined' && data?.url) {
                    window.location.href = data.url;
                }
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="login-email">Email address</Label>
                <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={(event) =>
                        setFormState((prev) => ({...prev, email: event.target.value}))
                    }
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={formState.password}
                    onChange={(event) =>
                        setFormState((prev) => ({...prev, password: event.target.value}))
                    }
                    required
                />
            </div>

            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending && (
                    <Loader2 className="mr-2 size-4 animate-spin"/>
                )}
                Sign in
            </Button>

            {loginError && (
                <p className="text-sm text-destructive">{loginError.message}</p>
            )}

            <Separator className="my-6"/>

            <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                    Or continue with
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOAuthLogin('google')}
                        disabled={oauthMutation.isPending}
                    >
                        {oauthMutation.isPending ? (
                            <Loader2 className="mr-2 size-4 animate-spin"/>
                        ) : (
                            <AtSign className="mr-2 size-4"/>
                        )}
                        Google
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOAuthLogin('github')}
                        disabled={oauthMutation.isPending}
                    >
                        {oauthMutation.isPending ? (
                            <Loader2 className="mr-2 size-4 animate-spin"/>
                        ) : (
                            <Github className="mr-2 size-4"/>
                        )}
                        GitHub
                    </Button>
                </div>
                {oauthError && (
                    <p className="text-sm text-destructive">{oauthError.message}</p>
                )}
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                <ShieldCheck className="mt-[2px] size-4 text-emerald-500"/>
                <div>
                    <p className="font-medium text-foreground">Security tips</p>
                    <p>Use strong passwords and avoid reusing credentials across systems.</p>
                </div>
            </div>
        </form>
    );
}


