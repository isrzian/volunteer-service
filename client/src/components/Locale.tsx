import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpRight } from "lucide-react";

export function Locale() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex flex-row items-center gap-1 max-w-fit"
          variant="ghost"
          size="sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-neutral-700 dark:fill-neutral-300"
          >
            <path d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "></path>
          </svg>
          <span className="sr-only">Изменить язык</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex flex-row gap-1 items-center">
          <span className="text-brand-dark dark:text-brand-light">Русский</span>{" "}
          <ArrowUpRight
            size={12}
            className="text-brand-dark dark:text-brand-light"
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-row gap-1 items-center opacity-80"
          disabled
        >
          English <ArrowUpRight size={12} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-row gap-1 items-center opacity-80"
          disabled
        >
          日本語
          <ArrowUpRight size={12} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-row gap-1 items-center opacity-80"
          disabled
        >
          简体中文 <ArrowUpRight size={12} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-row gap-1 items-center opacity-80"
          disabled
        >
          Español <ArrowUpRight size={12} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
