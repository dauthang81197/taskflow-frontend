'use client';

import { useMemo, useState } from 'react';
import {
  BadgeCheck,
  Loader2,
  LogIn,
  RefreshCcw,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { parseApiError } from '@/lib/http';
import {
  authKeys,
  useCurrentUserQuery,
  useRevokeSessionMutation,
  useSessionsQuery,
  useUpdateProfileMutation,
  useUpdateUserRoleMutation,
  useUsersQuery,
} from '../hooks';
import type { UserRole } from '../types';

type ProfileFormState = {
  name: string;
  password: string;
};

export function AuthManagementDashboard() {
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    name: '',
    password: '',
  });
  const [refreshPolicy, setRefreshPolicy] = useState(
    'Refresh tokens live in the user_sessions table and are invalidated automatically when they expire.',
  );

  const profileMutation = useUpdateProfileMutation();
  const updateRoleMutation = useUpdateUserRoleMutation();
  const revokeSessionMutation = useRevokeSessionMutation();

  const { data: currentUser } = useCurrentUserQuery();
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useUsersQuery();
  const {
    data: sessions,
    isLoading: isLoadingSessions,
    error: sessionsError,
  } = useSessionsQuery();

  const profileError = profileMutation.error
    ? parseApiError(profileMutation.error)
    : null;
  const roleError = updateRoleMutation.error
    ? parseApiError(updateRoleMutation.error)
    : null;
  const revokeError = revokeSessionMutation.error
    ? parseApiError(revokeSessionMutation.error)
    : null;

  const stats = useMemo(() => {
    const totalUsers = users?.length ?? 0;
    const admins = users?.filter((user) => user.role === 'admin').length ?? 0;
    const activeSessions = sessions?.length ?? 0;

    return {
      totalUsers,
      admins,
      activeSessions,
    };
  }, [users, sessions]);

  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    profileMutation.mutate(
      {
        name: profileForm.name || undefined,
        password: profileForm.password || undefined,
      },
      {
        onSuccess: () => {
          setProfileForm((prev) => ({ ...prev, password: '' }));
        },
      },
    );
  };

  const handleRoleChange = (userId: string, role: UserRole) => {
    updateRoleMutation.mutate({
      userId,
      payload: { role },
    });
  };

  const handleRevokeSession = (sessionId: string) => {
    revokeSessionMutation.mutate(sessionId);
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total users</CardTitle>
            <UserPlus className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalUsers.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              Every account must use a unique email address.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <ShieldCheck className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.admins.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              Supported roles: <code>admin</code>, <code>member</code>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active refresh sessions
            </CardTitle>
            <RefreshCcw className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.activeSessions.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              Expired tokens are cleaned up automatically.
            </p>
          </CardContent>
        </Card>
      </section>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User directory</CardTitle>
              <CardDescription>
                Manage personal information and assign roles (`admin`, `member`).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {roleError && (
                <p className="text-sm text-destructive">{roleError.message}</p>
              )}
              {isLoadingUsers ? (
                <div className="flex min-h-[120px] items-center justify-center text-sm text-muted-foreground">
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Loading users…
                </div>
              ) : usersError ? (
                <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                  Unable to load users. Verify the API endpoint (
                  <code>{authKeys.users().join('/')}</code>).
                </div>
              ) : users && users.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Created at</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                user.role === 'admin' ? 'default' : 'secondary'
                              }
                            >
                              {user.role}
                            </Badge>
                            <Select
                              value={user.role}
                              onValueChange={(value) =>
                                handleRoleChange(user.id, value as UserRole)
                              }
                              disabled={updateRoleMutation.isPending}
                            >
                              <SelectTrigger size="sm">
                                <SelectValue placeholder="Role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">admin</SelectItem>
                                <SelectItem value="member">member</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground">
                          ID: {user.id}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>{users.length} users total.</TableCaption>
                </Table>
              ) : (
                <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                  No users found. Create an account to populate the directory.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Refresh sessions</CardTitle>
                <CardDescription>
                  Inspect active refresh tokens and revoke them whenever needed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {revokeError && (
                  <p className="text-sm text-destructive">{revokeError.message}</p>
                )}
                {isLoadingSessions ? (
                  <div className="flex min-h-[120px] items-center justify-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Loading sessions…
                  </div>
                ) : sessionsError ? (
                  <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                    Unable to load sessions. Verify the API endpoint (
                    <code>{authKeys.sessions().join('/')}</code>).
                  </div>
                ) : sessions && sessions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Device</TableHead>
                        <TableHead>IP address</TableHead>
                        <TableHead>Expires at</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">
                            {session.device}
                          </TableCell>
                          <TableCell>{session.ipAddress ?? '—'}</TableCell>
                          <TableCell>
                            {new Date(session.expiresAt).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                session.isCurrent ? 'default' : 'secondary'
                              }
                            >
                              {session.isCurrent
                                ? 'Current session'
                                : 'Active session'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={
                                revokeSessionMutation.isPending ||
                                session.isCurrent
                              }
                              onClick={() => handleRevokeSession(session.id)}
                            >
                              {revokeSessionMutation.isPending ? (
                                <Loader2 className="mr-2 size-4 animate-spin" />
                              ) : (
                                <LogIn className="mr-2 size-4" />
                              )}
                              Revoke
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption>
                      Refresh tokens are stored in <code>user_sessions</code>.
                    </TableCaption>
                  </Table>
                ) : (
                  <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                    No active sessions detected.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session status quick reference</CardTitle>
                <CardDescription>
                  Communicate the meaning of each refresh token status.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Badge variant="default" className="mt-0.5">
                    Current session
                  </Badge>
                  <span>Session belonging to the device currently logged in.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    Active session
                  </Badge>
                  <span>Valid refresh token issued to other devices.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="destructive" className="mt-0.5">
                    Revoked / expired
                  </Badge>
                  <span>
                    Token should be removed by the cleanup job and rejected by the
                    API.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update profile</CardTitle>
              <CardDescription>
                Submit changes with the current access token. Leave fields empty to
                keep existing values.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-name">Display name</Label>
                  <Input
                    id="profile-name"
                    placeholder={currentUser?.name ?? 'Your name'}
                    value={profileForm.name}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-password">New password</Label>
                  <Input
                    id="profile-password"
                    type="password"
                    placeholder="••••••••"
                    value={profileForm.password}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        password: event.target.value,
                      }))
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to keep the current password.
                  </p>
                </div>
                <Button type="submit" disabled={profileMutation.isPending}>
                  {profileMutation.isPending && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Save changes
                </Button>
                {profileError && (
                  <p className="text-sm text-destructive">{profileError.message}</p>
                )}
                {profileMutation.isSuccess && !profileError && (
                  <p className="text-sm text-emerald-600">
                    Profile updated successfully.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Refresh token policy</CardTitle>
                <CardDescription>
                  Document how sessions should be created, renewed, and revoked.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="refresh-policy">Policy notes</Label>
                  <Textarea
                    id="refresh-policy"
                    className="min-h-[120px]"
                    value={refreshPolicy}
                    onChange={(event) => setRefreshPolicy(event.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Refresh tokens are stored in the <code>user_sessions</code>{' '}
                    table with device, IP address, and expiration metadata.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Cleanup:</strong> expired sessions are deleted by a
                    scheduled job or background worker.
                  </p>
                  <p>
                    <strong>Rotation:</strong> issue a new refresh token on every
                    successful renewal and archive the previous one.
                  </p>
                  <p>
                    <strong>Revocation:</strong> manual revocation should invalidate
                    the token immediately and force the device to sign in again.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security checklist</CardTitle>
                <CardDescription>
                  Quick reminders for backend and platform teams.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  <span>
                    Enforce a unique email constraint before inserting a new user.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <BadgeCheck className="size-4 text-emerald-500" />
                  <span>
                    Persist refresh tokens in <code>user_sessions</code> with device
                    metadata and expiry timestamps.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <LogIn className="size-4 text-emerald-500" />
                  <span>
                    On token expiration, remove the session and require a fresh login
                    flow.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Loader2 className="size-4 text-emerald-500" />
                  <span>
                    Use a worker or cron job to rotate refresh tokens and evict stale
                    data.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


