import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ApplicationShare({ id }: { id: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Поделиться</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[520px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Поделиться объявлением</h3>
          <p className="text-sm text-muted-foreground">
            Любой, у кого есть эта ссылка и учетная запись, сможет просмотреть
            это объявление.
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`http://localhost:3000/application/${id}`}
              readOnly
              className="h-9"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
