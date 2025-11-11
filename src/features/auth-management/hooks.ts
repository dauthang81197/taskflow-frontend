import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    fetchCurrentUser,
    fetchSessions,
    fetchUsers,
    loginWithCredentials,
    loginWithOAuth,
    registerUser,
    revokeSession,
    updateProfile,
    updateUserRole,
} from "./api";
import type {
    CredentialsPayload,
    OAuthProvider,
    RegisterPayload,
    UpdateProfilePayload,
    UpdateUserRolePayload,
} from "./types";
import type {Session, User} from "./types";

export const authKeys = {
    all: ["auth"] as const,
    currentUser: () => [...authKeys.all, "current-user"] as const,
    users: () => [...authKeys.all, "users"] as const,
    sessions: () => [...authKeys.all, "sessions"] as const,
};

export function useCurrentUserQuery(enabled = true) {
    return useQuery<User>({
        queryKey: authKeys.currentUser(),
        queryFn: fetchCurrentUser,
        enabled,
    });
}

export function useUsersQuery() {
    return useQuery<User[]>({
        queryKey: authKeys.users(),
        queryFn: fetchUsers,
    });
}

export function useSessionsQuery() {
    return useQuery<Session[]>({
        queryKey: authKeys.sessions(),
        queryFn: fetchSessions,
    });
}

export function useRegisterMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: RegisterPayload) => registerUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: authKeys.users()});
        },
    });
}

export function useLoginMutation() {
    return useMutation({
        mutationFn: (payload: CredentialsPayload) =>
            loginWithCredentials(payload),
        onSuccess: (data) => {
            // ✅ Lưu token (tuỳ bạn muốn lưu ở đâu)
            localStorage.setItem("access_token", data.accessToken);
        },

    });
}

export function useOAuthMutation() {
    return useMutation({
        mutationFn: (provider: OAuthProvider) => loginWithOAuth(provider),
    });
}

export function useUpdateProfileMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: authKeys.currentUser()});
        },
    });
}

export function useUpdateUserRoleMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
                         userId,
                         payload,
                     }: {
            userId: string;
            payload: UpdateUserRolePayload;
        }) => updateUserRole(userId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: authKeys.users()});
        },
    });
}

export function useRevokeSessionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (sessionId: string) => revokeSession(sessionId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: authKeys.sessions()});
        },
    });
}

