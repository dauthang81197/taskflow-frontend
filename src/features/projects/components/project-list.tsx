"use client";

import {Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {useProjectsQuery, useUpdateProjectMutation} from "../hooks";
import Link from "next/link";

export function ProjectList() {
    const {data: projects, isLoading, error} = useProjectsQuery();
    const softDeleteMut = useUpdateProjectMutation("placeholder-project-id");

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardDescription>Manage projects across your organization.</CardDescription>
                </div>

            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="text-sm text-muted-foreground">Loading projects…</div>
                ) : error ? (
                    <div className="text-sm text-muted-foreground">Could not load projects.</div>
                ) : !projects || projects?.data.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No projects yet.</div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {projects?.data?.map((p) => (
                            <Card key={p.id} className="border-dashed">
                                <CardHeader className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base">{p.name}</CardTitle>
                                        {p.deletedAt ? (
                                            <Badge variant="destructive">Deleted</Badge>
                                        ) : null}
                                    </div>
                                    {p.description ? (
                                        <CardDescription>{p.description}</CardDescription>
                                    ) : null}
                                </CardHeader>
                                <CardContent className="flex items-center justify-between">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/projects/${p.id}`}>Open</Link>
                                    </Button>
                                    {!p.deletedAt && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive"
                                            onClick={() =>
                                                softDeleteMut.mutate({
                                                    deletedAt: new Date().toISOString(),
                                                })
                                            }
                                        >
                                            <Trash2 className="size-4"/>
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

