import { ApplicationActions } from "@/components/ApplicationActions";
import ApplicationEdit from "@/components/ApplicationEdit";
import { ApplicationRespond } from "@/components/ApplicationRespond";
import { ApplicationShare } from "@/components/ApplicationShare";
import StatusBadge from "@/components/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import RootLayout from "@/layouts/root";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PageContent = ({ id }: { id: string }) => {
  const session = useSession();
  const { data, isLoading } = useQuery({
    queryKey: [`application/${id}`],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/application/${id}`
      ).then((res) => res.json()),
  });

  if (!data || isLoading || session.status === "loading") return null;

  return (
    <RootLayout>
      <div className="mt-10 lg:py-10 flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <div className="w-full flex flex-col gap-2">
          <StatusBadge status={data.status} />
          <h2 className="text-2xl font-semibold w-full">{data.title}</h2>
        </div>
        {(session.data?.user.role === "applicant" &&
          session.data.user.id === data.applicantId) ||
        session.data?.user.role === "operator" ? (
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <ApplicationEdit defaultValues={data} />
            <ApplicationShare id={id} />
            <ApplicationActions id={id} />
          </div>
        ) : data.status !== "new" && data.status !== "completed" ? (
          <ApplicationRespond application={data} />
        ) : (
          data.status === "new" && (
            <span className="text-sm lg:text-right italic text-brand-primary dark:text-brand-light">
              Объявление находится на проверке оператором. Откликнуться на него
              можно будет позже.
            </span>
          )
        )}
      </div>
      <Separator />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          <div className="flex items-center">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{`${data.applicant.name
                .toUpperCase()
                .substr(0, 1)}${data.applicant.surname
                .toUpperCase()
                .substr(0, 1)}`}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {data.applicant.name} {data.applicant.surname}
              </p>
              <p className="text-sm text-neutral-500">Заявитель</p>
            </div>
          </div>
          {!!data.operator && (
            <div className="flex items-center">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {data.operator.name.toUpperCase().substr(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {data.operator.name}
                </p>
                <p className="text-sm text-neutral-500">Опреатор</p>
              </div>
            </div>
          )}
          <p>{data.description}</p>
        </div>
      </div>
    </RootLayout>
  );
};

export default function Application() {
  const router = useRouter();
  const id = router.query.id as string;

  if (!id || typeof id !== "string") return null;

  return <PageContent id={id} />;
}
