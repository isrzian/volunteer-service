import Header from "@/components/Header";
import Head from "next/head";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <Head>
        <title></title>
        <meta charSet="UTF-8" />
        <title>Помощь в трудную минуту</title>
        <meta name="viewport" content="width=device-width" />
        <meta name="robots" content="follow, index" />
        <meta
          name="description"
          content="Cоциальный онлайн-ресурс, предоставляющий возможность заявителям размещать объявления о поиске волонтеров, готовых оказать помощь. Эта платформа создана для людей, которым требуется нематериальная поддержка в различных сферах жизни."
        />
      </Head>
      <Header />
      <main className="max-w-6xl px-5 mx-auto space-y-10">{children}</main>
    </>
  );
}
