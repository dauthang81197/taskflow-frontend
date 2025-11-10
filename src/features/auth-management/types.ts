export type UserRole = "admin" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  device: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
  expiresAt: string;
  isCurrent: boolean;
}

export interface CredentialsPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends CredentialsPayload {
  name: string;
}

export interface UpdateProfilePayload {
  name?: string;
  password?: string;
}

export interface UpdateUserRolePayload {
  role: UserRole;
}

export type OAuthProvider = "google" | "github";

