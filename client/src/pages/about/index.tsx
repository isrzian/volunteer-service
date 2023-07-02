import { Button } from "@/components/ui/button";
import RootLayout from "@/layouts/root";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function About() {
  const router = useRouter();

  return (
    <RootLayout>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-neutral-700 dark:text-neutral-300 pt-10">
        О Проекте
      </h1>
      <div className="border-b">
        <div className="flex items-center px-4"></div>
      </div>
      <div className="relative flex justify-end items-center w-full h-full">
        <Image
          src="/salyblue.png"
          alt=""
          width={320}
          height={320}
          className="relative z-50 drop-shadow-2xl select-none opacity-10 lg:opacity-100"
          draggable="false"
          priority
        />
        <div className="absolute top-0 left-0 flex flex-col gap-5 font-medium text-neutral-600 z-50 dark:text-neutral-300 lg:mr-[320px]">
          <p>
            Мы рады приветствовать вас в нашем сообществе волонтеров, где люди
            могут встретиться, помочь друг другу и делать мир немного лучше.
          </p>
          <p>
            Наш проект предназначен для того, чтобы соединить две группы
            пользователей: тех, кто ищет помощь, и тех, кто готов помочь. Если
            вам нужна помощь в выполнении определенной задачи или вы хотите
            сделать доброе дело, у нас есть все необходимое, чтобы помочь вам
            достичь вашей цели.
          </p>
          <p>Как это работает? Процесс очень прост:</p>
          <p>
            1.{" "}
            <Link
              href="/signup"
              className="text-brand-primary font-medium hover:text-brand-lighter transition-colors"
            >
              Создайте аккаунт:
            </Link>{" "}
            Для начала вам нужно создать свой аккаунт в нашей системе. Это
            займет всего несколько минут, и вы сможете получить доступ ко всем
            функциям нашего проекта.
          </p>
          <p>
            2.{" "}
            <span className="text-brand-primary font-medium">
              Разместите заявку:
            </span>{" "}
            Если у вас есть конкретная задача, для выполнения которой вам
            требуется помощь, разместите заявку на нашей платформе. Укажите, что
            именно вам нужно сделать, а также время и место, где вам потребуется
            помощь.
          </p>
          <p>
            3.{" "}
            <span className="text-brand-primary font-medium">
              Подайте отклик:
            </span>{" "}
            Вторая группа пользователей, которая готова помочь, будет иметь
            возможность просматривать размещенные заявки и подавать отклики на
            те, которые соответствуют их возможностям и интересам. Если вы
            видите заявку, с которой вы можете помочь, просто отправьте отклик и
            договоритесь с автором о деталях.
          </p>
          <p>
            4.{" "}
            <span className="text-brand-primary font-medium">
              Встречайтесь и помогайте:
            </span>{" "}
            Как только вы найдете подходящую заявку и договоритесь с ее автором,
            встретьтесь с ними лично и приступайте к выполнению задачи. Наша
            платформа поможет вам организовать встречу и обеспечить безопасность
            для всех участников.
          </p>
          <p>
            Проект создан с целью содействия взаимопомощи и укрепления связей в
            сообществе. Мы верим, что каждое доброе дело имеет значение и может
            изменить жизни людей к лучшему.
          </p>
          <p>
            Присоединяйтесь к нашему проекту и станьте частью нашей дружной
            команды волонтеров. Вместе мы сможем сделать наш мир добрее и
            заботливее!
          </p>
          <div className="lg:h-12" />
          <Button onClick={() => router.push("/application")} className="mb-10">
            Начать помогать
          </Button>
        </div>
      </div>
    </RootLayout>
  );
}
