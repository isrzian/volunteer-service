import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-row-actions";
import { ApplicationType } from "@/lib/schema";
import StatusBadge from "./StatusBadge";

export const columns: ColumnDef<ApplicationType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-fit items-center">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
    filterFn: (row, status, value) => {
      return value.includes(row.getValue(status));
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-fit items-center">
          <span>{row.original.title}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Описание" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-fit items-center">
          <span>{row.original.description}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "applicant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Заявитель" />
    ),
    cell: ({ row }) => {
      if (!row.original.applicant) return <></>;
      return (
        <div className="flex w-fit items-center">
          <span>
            {row.original.applicant.surname} {row.original.applicant.name}
          </span>
        </div>
      );
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "operator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Оператор" />
    ),
    cell: ({ row }) => {
      if (!row.original.operator) return <></>;
      return (
        <div className="flex w-fit items-center">
          <span>{row.original.operator.name}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
