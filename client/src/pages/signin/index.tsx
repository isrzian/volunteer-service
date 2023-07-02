import Link from "next/link";

import { OperatorAuthForm } from "@/components/OperatorAuthForm";
import RootLayout from "@/layouts/root";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ApplicantAuthForm } from "@/components/ApplicantAuthForm";
import { VolunteerAuthForm } from "@/components/VolunteerAuthForm";

export default function AuthenticationPage() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") return null;
  if (!!session && !!session.data && session.status === "authenticated") {
    router.push("/dashboard");
    return null;
  }

  return (
    <RootLayout>
      <div className="relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 py-10">
        <div className="relative hidden h-full flex-col p-10 text-white dark:border-r dark:border-neutral-800 lg:flex rounded-md">
          <div className="absolute inset-0 bg-neutral-800 dark:bg-neutral-900 rounded-md drop-shadow-lg" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="/signup.png"
              alt=""
              width={540}
              height={540}
              className="relative z-50 drop-shadow-2xl select-none"
              draggable="false"
              priority
            />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                “Помощь приветствуется всегда, особенно в трудную минуту”
              </p>
              <footer className="text-sm">— Генри Форд</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Авторзиация
              </h1>
            </div>
            <Tabs defaultValue="applicant" className="space-y-4">
              <TabsList className="w-full">
                <TabsTrigger value="applicant" className="rounded-full">
                  Заявитель
                </TabsTrigger>
                <TabsTrigger value="volunteer" className="rounded-full">
                  Волонтёр
                </TabsTrigger>
                <TabsTrigger value="operator" className="rounded-full">
                  Оператор
                </TabsTrigger>
              </TabsList>
              <TabsContent value="applicant">
                <ApplicantAuthForm />
              </TabsContent>
              <TabsContent value="volunteer">
                <VolunteerAuthForm />
              </TabsContent>
              <TabsContent value="operator">
                <OperatorAuthForm />
              </TabsContent>
            </Tabs>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Нажимая продолжить, вы соглашаетесь с нашими{" "}
              <Link
                href="/about"
                className="underline underline-offset-4 hover:text-brand-primary dark:hover:text-brand-light"
              >
                Условиями обслуживания
              </Link>{" "}
              и{" "}
              <Link
                href="/about"
                className="underline underline-offset-4 hover:text-brand-primary dark:hover:text-brand-light"
              >
                Политикой конфиденциальности
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
