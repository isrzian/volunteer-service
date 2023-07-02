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
      <div className="flex flex-col-reverse lg:flex-row justify-between w-full py-20">
        <div className="flex flex-col gap-2.5">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            <p className="text-neutral-700 dark:text-neutral-200">
              “Помощь приветствуется всегда, особенно в
            </p>
            <p className="text-transparent bg-clip-text bg-gradient-to-br from-brand-light from-0% to-75% to-brand-dark pb-1">
              трудную минуту”
            </p>
          </h1>
          <p className="max-w-xl text-2xl text-neutral-500 dark:text-neutral-300">
            — Генри Форд
          </p>
          <div className="flex flex-col lg:flex-row gap-2.5 py-5">
            <Button onClick={() => router.push("/application")}>
              Начать помогать
            </Button>
            <Button variant="secondary" onClick={() => router.push("/signin")}>
              Попросить о помощи
            </Button>
            <Button variant="secondary" onClick={() => router.push("/about")}>
              Узнать больше
            </Button>
          </div>
        </div>
        <div className="relative flex justify-center items-center w-full h-full">
          <Image
            src="/salyblue.png"
            alt=""
            width={320}
            height={320}
            className="relative z-50 drop-shadow-2xl select-none"
            draggable="false"
            priority
          />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500 from-50% to-purple-500 to-50% rounded-full -translate-x-1/2 -translate-y-1/2 blur-[144px] opacity-75" />
        </div>
      </div>
      <section className="flex flex-col w-full items-center justify-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
          Текущие заявки
        </h2>
        <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
          Людям нужна Ваша помощь по всем направлениям
        </p>
        <div className="flex flex-col lg:flex-row gap-2.5 py-5">
          <Button onClick={() => router.push("/application")}>
            Начать помогать
          </Button>
          <Button variant="secondary" onClick={() => router.push("/signin")}>
            Попросить о помощи
          </Button>
          <Button variant="secondary" onClick={() => router.push("/about")}>
            Узнать больше
          </Button>
        </div>
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
