import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function RecentApplications() {
  const session = useSession();

  const operatorId =
    session.data?.user.role === "operator" ? session.data.user.id : "";

  const { data } = useQuery({
    queryKey: [`applications`],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/application/?operatorId=${operatorId}`
      ).then((res) => res.json()),
    enabled: !!session.data?.user,
  });

  if (session.status !== "authenticated") return null;

  return (
    <div className="space-y-2">
      {!!data &&
        !!data.items &&
        data?.items?.slice(0, 5).map((item: any) => (
          <Link
            key={item.id}
            className="flex items-center transition-all hover:bg-neutral-100 dark:hover:bg-neutral-900 p-2.5 rounded-lg cursor-pointer"
            href={`http://localhost:3000/application/${item.id}`}
          >
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{`${item.applicant.name
                  .toUpperCase()
                  .substr(0, 1)}${item.applicant.surname
                  .toUpperCase()
                  .substr(0, 1)}`}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{`${item.applicant.name} ${item.applicant.surname}`}</p>
                <p className="text-sm text-neutral-500">{item.title}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
