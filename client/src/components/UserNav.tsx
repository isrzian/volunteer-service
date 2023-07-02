import { LogOut, PanelTop, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ApplicationCreate } from "./ApplicationCreate";
import { ApplicationOperatorCreate } from "./ApplicationOperatorCreate";

export function UserNav() {
  const router = useRouter();
  const session = useSession();

  if (session.status === "loading" || !session.data) {
    return <Avatar className="h-9 w-9" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>SC</AvatarFallback>
            <AvatarImage src="/avatar.png" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer"
          >
            <PanelTop className="mr-2 h-4 w-4" />
            <span>Панель управления</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Настройки</span>
          </DropdownMenuItem>
          {session.data.user.role === "operator" && (
            <DropdownMenuItem asChild>
              <ApplicationOperatorCreate isMenu />
            </DropdownMenuItem>
          )}
          {session.data.user.role === "applicant" && (
            <DropdownMenuItem asChild>
              <ApplicationCreate isMenu />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
