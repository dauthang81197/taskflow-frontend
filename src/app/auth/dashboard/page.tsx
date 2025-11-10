import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthManagementDashboard } from '@/features/auth-management/components/auth-management-dashboard';

export const metadata: Metadata = {
  title: 'Auth Dashboard',
  description:
    'Admin dashboard for authentication, user management, roles, and session monitoring.',
};

export default function AuthDashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Auth &amp; User Management</h1>
        <p className="text-muted-foreground max-w-2xl">
          Monitor sign-ins, manage user accounts and roles, and audit refresh
          sessions in one place.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="flex min-h-[320px] items-center justify-center text-muted-foreground">
            Loading authentication dashboard…
          </div>
        }
      >
        <AuthManagementDashboard />
      </Suspense>
    </main>
  );
}


