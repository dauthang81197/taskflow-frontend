import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";

export interface TableProps<T> {
    data: T[],
    column: never[],
    headers: string[]
}

const documents = [
    {
        id: "1",
        header: "Drag to reorder",
        sectionType: "Cover page",
        status: "In Process",
        target: "Target",
        limit: "Limit",
        reviewer: "Eddie Lake",
    },
    {
        id: "2",
        header: "Drag to reorder",
        sectionType: "Table of contents",
        status: "Done",
        target: "Target",
        limit: "Limit",
        reviewer: "Eddie Lake",
    },
    {
        id: "3",
        header: "Drag to reorder",
        sectionType: "Executive summary",
        status: "Done",
        target: "Target",
        limit: "Limit",
        reviewer: "Eddie Lake",
    },
    {
        id: "4",
        header: "Drag to reorder",
        sectionType: "Technical approach",
        status: "Done",
        target: "Target",
        limit: "Limit",
        reviewer: "Jamik Tashpulatov",
    },
    {
        id: "5",
        header: "Drag to reorder",
        sectionType: "Design",
        status: "In Process",
        target: "Target",
        limit: "Limit",
        reviewer: "Jamik Tashpulatov",
    },
];

function getStatusVariant(status: string) {
    switch (status) {
        case "Done":
            return "default";
        case "In Process":
            return "secondary";
        default:
            return "outline";
    }
}



export const TableCustom = ({data, column, headers}: TableProps<never>) => {
    return <>
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Documents</CardTitle>
                        <CardDescription>
                            Outline · Past Performance 3 · Key Personnel 2 · Focus
                            Documents
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            Customize Columns
                        </Button>
                        <Button variant="outline" size="sm">
                            Add Section
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                headers.map((item => (<TableHead>{item}</TableHead>))
                            }
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documents.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell className="font-medium">{doc.header}</TableCell>
                                <TableCell>{doc.sectionType}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            getStatusVariant(doc.status) as
                                                | "default"
                                                | "secondary"
                                                | "destructive"
                                                | "outline"
                                        }
                                    >
                                        {doc.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{doc.target}</TableCell>
                                <TableCell>{doc.limit}</TableCell>
                                <TableCell>{doc.reviewer}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        Open menu
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div>0 of {documents.length} row(s) selected.</div>
                    <div className="flex items-center gap-2">
                        <span>Rows per page</span>
                        <span>Page 1 of 7</span>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                                Go to first page
                            </Button>
                            <Button variant="ghost" size="sm">
                                Go to previous page
                            </Button>
                            <Button variant="ghost" size="sm">
                                Go to next page
                            </Button>
                            <Button variant="ghost" size="sm">
                                Go to last page
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </>
}