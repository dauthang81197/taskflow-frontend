"use client";

import { CalendarClock, CircleCheck, Clock, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Task } from "../types";

function isOverdue(task: Task) {
  if (!task.dueDate || task.status === "done") return false;
  try {
    return new Date(task.dueDate).getTime() < Date.now();
  } catch {
    return false;
  }
}

export function TaskCard({ task }: { task: Task }) {
  const overdue = isOverdue(task);
  return (
    <div
      className={cn(
        "rounded-md border bg-background p-3 shadow-xs",
        overdue && "ring-1 ring-destructive/30"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium">{task.title}</p>
        {task.status === "done" ? (
          <Badge className="gap-1" variant="default">
            <CircleCheck className="size-3" />
            Done
          </Badge>
        ) : overdue ? (
          <Badge className="gap-1" variant="destructive">
            <Clock className="size-3" />
            Overdue
          </Badge>
        ) : null}
      </div>
      {task.labels?.length ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {task.labels.map((l) => (
            <Badge key={l} variant="secondary">
              {l}
            </Badge>
          ))}
        </div>
      ) : null}
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <User2 className="size-3.5" />
          <span>{task.assigneeId ?? "Unassigned"}</span>
        </div>
        {task.dueDate ? (
          <div className="flex items-center gap-1">
            <CalendarClock className="size-3.5" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

