import type { Metadata } from "next";
import {
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  FileText,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { VisitorsChart } from "@/components/dashboard/visitors-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your application",
};

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

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-6 md:p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Manage and track your documents
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$1,250.00"
            description="Trending up this month"
            icon={DollarSign}
            trend={{
              value: "+12.5%",
              isPositive: true,
              label: "Trending up this month",
            }}
          />
          <MetricCard
            title="New Customers"
            value="1,234"
            description="Acquisition needs attention"
            icon={Users}
            trend={{
              value: "-20%",
              isPositive: false,
              label: "Down 20% this period",
            }}
          />
          <MetricCard
            title="Active Accounts"
            value="45,678"
            description="Strong user retention"
            icon={Activity}
            trend={{
              value: "+12.5%",
              isPositive: true,
              label: "Engagement exceed targets",
            }}
          />
          <MetricCard
            title="Growth Rate"
            value="4.5%"
            description="Steady performance increase"
            icon={TrendingUp}
            trend={{
              value: "+4.5%",
              isPositive: true,
              label: "Meets growth projections",
            }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <VisitorsChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>You have 265 documents this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Documents processed</p>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </div>
                  <FileText className="size-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Active reviews</p>
                    <p className="text-xs text-muted-foreground">
                      12 pending reviews
                    </p>
                  </div>
                  <Activity className="size-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                  <TableHead>Header</TableHead>
                  <TableHead>Section Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Limit</TableHead>
                  <TableHead>Reviewer</TableHead>
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
    </div>
  );
}

