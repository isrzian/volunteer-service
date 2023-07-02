import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/SideBarNav";
import RootLayout from "./root";
import { useSession } from "next-auth/react";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Аккаунт",
    href: "/profile",
  },
  {
    title: "Оповещения",
    href: "/profile/notifications",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  useSession({ required: true });
  return (
    <RootLayout>
      <div className="space-y-6 py-10">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Настройки</h2>
          <p className="text-muted-foreground">
            Управляйте настройками своей учетной записи
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </RootLayout>
  );
}
