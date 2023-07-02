import { Table } from "@tanstack/react-table";
import {
  AlertCircle,
  CircleDot,
  CircleSlash,
  PlayCircle,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view.options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useSession } from "next-auth/react";
import { ApplicationCreate } from "./ApplicationCreate";
import { ApplicationOperatorCreate } from "./ApplicationOperatorCreate";
import { Fragment } from "react";
import { ShowMine } from "./ShowMine";
// import { DatePickerWithRange } from "./DatePickerWithRange";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const session = useSession();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex lg:flex-row flex-col flex-1 items-center space-x-2 gap-2">
        <Input
          placeholder="Фильтр объявлений..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full lg:w-[250px]"
        />
        <div className="flex flex-row w-full gap-2 items-center">
          {/* <DatePickerWithRange /> */}
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Статус"
              options={[
                {
                  label: "Новое",
                  value: "new",
                  icon: CircleSlash,
                },
                {
                  label: "Проверено",
                  value: "verified",
                  icon: CircleDot,
                },
                {
                  label: "Выполняется",
                  value: "in_process",
                  icon: PlayCircle,
                },
                {
                  label: "Выполнено",
                  value: "completed",
                  icon: AlertCircle,
                },
              ]}
            />
          )}
          {session.data?.user.role === "applicant" && <ApplicationCreate />}
          {session.data?.user.role === "operator" && (
            <Fragment>
              <ApplicationOperatorCreate />
              <ShowMine />
            </Fragment>
          )}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Сбросить
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
