import { Activity } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RootLayout from "@/layouts/root";
import { Overview } from "@/components/Overview";
import { RecentApplications } from "@/components/RecentApplications";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { columns } from "@/components/columns";
import { useAtom } from "jotai";
import { showMineAtom } from "@/lib/atom";

export default function DashboardPage() {
  const session = useSession({ required: true });

  const [mine] = useAtom(showMineAtom);
  const applicantId =
    session.data?.user.role === "applicant" ? session.data.user.id : "";
  const operatorId =
    session.data?.user.role === "operator" && mine ? session.data.user.id : "";

  const { data } = useQuery({
    queryKey: [`applications`, mine],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/application/?applicantId=${applicantId}&operatorId=${operatorId}`
      ).then((res) => res.json()),
    enabled: !!session.data?.user,
  });

  if (session.status !== "authenticated") return null;

  return (
    <RootLayout>
      <div className="flex-col pb-10">
        <div className="border-b">
          <div className="flex h-16 items-center px-4"></div>
        </div>
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight dark:text-neutral-200">
              Панель управления
            </h2>
          </div>
          <Tabs
            defaultValue={
              session.data.user.role === "operator"
                ? "overview"
                : "applications"
            }
            className="space-y-4"
          >
            <TabsList className="w-full">
              {session.data.user.role === "operator" && (
                <TabsTrigger value="overview">Статистика</TabsTrigger>
              )}
              <TabsTrigger value="applications">
                {session.data.user.role === "operator"
                  ? "Все заявки"
                  : "Мои заявки"}
              </TabsTrigger>
              <TabsTrigger value="notifications">Оповещения</TabsTrigger>
            </TabsList>
            {session.data.user.role === "operator" && (
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Всего выполненных заявок
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">15</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% с прошлого месяца
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Заявок в этом месяце
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4</div>
                      <p className="text-xs text-muted-foreground">
                        +8.3% с прошлого месяца
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Людям оказана помощь
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-xs text-muted-foreground">
                        +19% с прошлого месяца
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        В рейтенге волонтеров
                      </CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-xs text-muted-foreground">
                        +7 с прошлого месяца
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4 hidden md:block">
                    <CardHeader>
                      <CardTitle>Показатели</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Последние заявки</CardTitle>
                      <CardDescription>
                        Заявок всего в этом месяце {data?.total}.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentApplications />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            )}
            <TabsContent value="applications">
              <DataTable data={data?.items || []} columns={columns} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RootLayout>
  );
}
