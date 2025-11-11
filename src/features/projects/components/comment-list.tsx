"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddCommentMutation,
  useCommentsQuery,
} from "../hooks";

export function CommentList({
  taskId,
  projectId,
}: {
  taskId: string;
  projectId: string;
}) {
  const { data: comments, isLoading } = useCommentsQuery(taskId);
  const addMut = useAddCommentMutation(taskId, projectId);
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    addMut.mutate(
      { taskId, content: value },
      {
        onSuccess: () => setValue(""),
      }
    );
  };

  return (
    <div className="space-y-3">
      <div className="rounded-md border p-3">
        <p className="mb-2 text-sm font-semibold">Comments</p>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : comments && comments.length > 0 ? (
          <ul className="space-y-2">
            {comments.map((c) => (
              <li key={c.id} className="rounded-md border bg-background p-2">
                <p className="text-sm">{c.content}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}
      </div>

      <form onSubmit={submit} className="space-y-2">
        <Textarea
          placeholder="Write a comment…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit" disabled={addMut.isPending}>
          {addMut.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          <Send className="mr-2 size-4" />
          Add comment
        </Button>
      </form>
    </div>
  );
}

