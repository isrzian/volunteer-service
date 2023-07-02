import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import RootLayout from "@/layouts/root";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: [`applications`],
    queryFn: async () =>
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/application`).then((res) =>
        res.json()
      ),
  });

  return (
    <RootLayout>
      <section className="flex flex-col w-full items-center justify-center pt-20">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
          Текущие заявки
        </h2>
        <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
          Людям нужна Ваша помощь по всем направлениям
        </p>
      </section>
      <div className="grid lg:grid-cols-3 gap-4 pb-5">
        {!!data &&
          !!data.items &&
          data?.items?.map((item: any) => (
            <article
              key={item.id}
              className="flex flex-col h-full p-6 bg-neutral-50 rounded-lg gap-5 dark:bg-neutral-900 justify-between"
            >
              <div className="flex items-start">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{`${item.applicant.name
                    .toUpperCase()
                    .substr(0, 1)}${item.applicant.surname
                    .toUpperCase()
                    .substr(0, 1)}`}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{`${item.applicant.name} ${item.applicant.surname}`}</p>
                  <p className="text-sm text-neutral-500">{item.title}</p>
                </div>
              </div>
              <Button onClick={() => router.push(`/application/${item.id}`)}>
                Открыть объявление
              </Button>
            </article>
          ))}
      </div>
    </RootLayout>
  );
}
