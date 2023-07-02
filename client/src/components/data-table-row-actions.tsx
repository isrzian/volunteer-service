import { Row } from "@tanstack/react-table";
import { ArrowUpRightSquare, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { applicationSchema } from "@/lib/schema";
import ApplicationEdit from "./ApplicationEdit";
import { ApplicationDelete } from "./ApplicationDelete";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApplicationRespond } from "./ApplicationRespond";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const session = useSession();
  const application = applicationSchema.parse(row.original);

  const { data } = useQuery({
    queryKey: [`application/${application.id}`],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/application/${application.id}`
      ).then((res) => res.json()),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 dark:data-[state=open]:bg-neutral-800 data-[state=open]:bg-neutral-200"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/application/${application.id}`}>
            <ArrowUpRightSquare className="mr-2 h-3.5 w-3.5 text-neutral-700/70" />
            Открыть
          </Link>
        </DropdownMenuItem>

        {session.data?.user.role === "volunteer" && data?.status !== "new" && (
          <DropdownMenuItem asChild>
            <ApplicationRespond application={data} isMenu />
          </DropdownMenuItem>
        )}

        {session.data?.user.role === "applicant" ||
          (session.data?.user.role === "operator" && (
            <DropdownMenuItem asChild>
              <ApplicationEdit defaultValues={data} isMenu />
            </DropdownMenuItem>
          ))}

        {session.data?.user.role === "applicant" ||
          (session.data?.user.role === "operator" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ApplicationDelete id={application.id} />
              </DropdownMenuItem>
            </>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
