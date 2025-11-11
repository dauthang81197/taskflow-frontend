export type TaskStatus = "todo" | "in_progress" | "done";

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string | null;
  assigneeId?: string | null;
  status: TaskStatus;
  labels: string[];
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  deletedAt?: string | null;
}

export interface CreateTaskPayload {
  projectId: string;
  title: string;
  description?: string;
  assigneeId?: string | null;
  status?: TaskStatus;
  labels?: string[];
  dueDate?: string | null;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string | null;
  assigneeId?: string | null;
  status?: TaskStatus;
  labels?: string[];
  dueDate?: string | null;
  deletedAt?: string | null;
}

export interface AddCommentPayload {
  taskId: string;
  content: string;
}

