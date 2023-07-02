import Link from "next/link";
import { Separator } from "./ui/separator";
import { Locale } from "./Locale";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { useSession } from "next-auth/react";
import { UserNav } from "./UserNav";
import clsx from "clsx";
import { useRouter } from "next/router";

const Pages = [
  {
    label: "Главная",
    href: "/",
  },
  {
    label: "О проекте",
    href: "/about",
  },
  {
    label: "Объявления",
    href: "/application",
  },
  {
    label: "Поддержать",
    href: "/support",
  },
];

export default function Header() {
  const session = useSession();
  const { pathname } = useRouter();

  return (
    <header className="relative z-50">
      <div className="max-w-6xl p-5 mx-auto flex flex-row justify-between items-center">
        <Link href="/">
          <Logo className="w-6 h-6 dark:fill-neutral-200 fill-neutral-900 hover:fill-brand-primary dark:hover:fill-brand-primary transition-all" />
        </Link>
        <div className="flex flex-row items-center gap-2.5 lg:gap-4 justify-end">
          <div className="hidden md:inline-flex items-center gap-4 lg:gap-4">
            {Pages.map((page) => (
              <Link
                key={page.label}
                href={page.href}
                className={clsx(
                  "text-sm font-medium hover:text-brand-primary dark:hover:text-brand-light cursor-pointer",
                  {
                    "pointer-events-none opacity-50":
                      page.href === "/documentation" ||
                      page.href === "/support",
                    "text-brand-primary": page.href === pathname,
                    "text-neutral-800 dark:text-neutral-200":
                      page.href !== pathname,
                  }
                )}
              >
                {page.label}
              </Link>
            ))}
          </div>
          <Separator orientation="vertical" />
          <Locale />
          <Separator orientation="vertical" />
          <ModeToggle />
          <Separator orientation="vertical" />
          {!session.data ? (
            <Link
              href={"/signin"}
              className="text-sm font-medium text-neutral-800 hover:text-brand-primary dark:text-neutral-200 dark:hover:text-brand-light cursor-pointer"
            >
              Авторизация
            </Link>
          ) : (
            <UserNav />
          )}
        </div>
      </div>
    </header>
  );
}
