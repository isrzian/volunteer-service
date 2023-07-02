import Link from "next/link";

import RootLayout from "@/layouts/root";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SignUpOperator } from "@/components/SignUpOperator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignUpApplicant } from "@/components/SignUpApplicant";
import { SignUpVolunteer } from "@/components/SignUpVolunteer";

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
      <div className="relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0 py-10">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[384px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Регистрация
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
                <SignUpApplicant />
              </TabsContent>
              <TabsContent value="volunteer">
                <SignUpVolunteer />
              </TabsContent>
              <TabsContent value="operator">
                <SignUpOperator />
              </TabsContent>
            </Tabs>
            <p className="px-5 text-center text-sm text-muted-foreground">
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
