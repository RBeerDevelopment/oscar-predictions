import { db } from "@/db/db";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FolderOpen, 
  Users, 
  Award, 
  Trophy,
  ArrowRight
} from "lucide-react";

export default async function AdminPage() {
  // Fetch statistics
  const [categoriesCount, nomineesCount, nominationsCount, votesCount, winnersCount] = await Promise.all([
    db.query.categories.findMany({ columns: { id: true } }).then(r => r.length),
    db.query.nominees.findMany({ columns: { id: true } }).then(r => r.length),
    db.query.nominations.findMany({ columns: { id: true } }).then(r => r.length),
    db.query.votes.findMany({ columns: { id: true } }).then(r => r.length),
    db.query.nominations.findMany({ 
      where: { isWinner: true },
      columns: { id: true } 
    }).then(r => r.length),
  ]);

  const adminLinks = [
    {
      title: "Categories",
      description: "Manage award categories",
      href: "/admin/categories",
      icon: FolderOpen,
      stat: categoriesCount,
    },
    {
      title: "Nominees",
      description: "Add and manage nominees",
      href: "/admin/nominees",
      icon: Users,
      stat: nomineesCount,
    },
    {
      title: "Nominations",
      description: "Create nominations for categories",
      href: "/admin/nominations",
      icon: Award,
      stat: nominationsCount,
    },
    {
      title: "Winners",
      description: "Select winners for each category",
      href: "/admin/winners",
      icon: Trophy,
      stat: winnersCount,
    },
  ];

  return (
    <div className="flex flex-col w-full h-full p-8 gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage categories, nominees, nominations, and winners
        </p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{votesCount}</div>
            <p className="text-xs text-muted-foreground">
              User votes cast
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Winners Selected</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winnersCount}</div>
            <p className="text-xs text-muted-foreground">
              Out of {categoriesCount} categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nominations</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nominationsCount}</div>
            <p className="text-xs text-muted-foreground">
              Total nominations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nominees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nomineesCount}</div>
            <p className="text-xs text-muted-foreground">
              Unique nominees
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Links */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Card key={link.href} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <CardTitle>{link.title}</CardTitle>
                        <CardDescription>{link.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-muted-foreground">
                      {link.stat}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={link.href}>
                    <Button className="w-full" variant="outline">
                      Manage {link.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
