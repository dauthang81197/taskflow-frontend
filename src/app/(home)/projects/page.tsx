import type { Metadata } from "next";
import { ProjectList } from "@/features/projects/components/project-list";
import { ProjectDialog } from "@/features/projects/components/project-dialog";

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage projects",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Create, update and soft-delete projects.
          </p>
        </div>
        <ProjectDialog />
      </div>
      <ProjectList />
    </div>
  );
}


