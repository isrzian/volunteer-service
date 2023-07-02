import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export interface ApplicationResponseEmailProps {
  title: string;
  href: string;
  name: string;
  email: string;
  phone: string;
}

export const ApplicationResponseEmail = (body: any) => (
  <Html>
    <Head />
    <Preview>На Ваше объявление “{body.title}” откликнулись</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://i.imgur.com/vetbkvA.png`}
          width="42"
          height="42"
          alt="Доброта"
          style={logo}
        />
        <Heading style={heading}>
          На Ваше объявление “{body.title}” откликнулись
        </Heading>
        <Section style={buttonContainer}>
          <Link
            style={button}
            href={`http://localhost:3000/application/${body.id}`}
          >
            Открыть объявление
          </Link>
        </Section>
        <Text style={paragraph}>
          С радостью сообщаем, что на Вашу просьбу о помощи откликнулся
          пользователь{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {body.name}
          </span>
          . Мы предоставляем Вам контактные данные этого человека, чтобы Вы
          могли легко и без проблем связаться с ним и получить необходимую
          поддержку.
        </Text>
        <Section>
          <span style={code}>{body.email}</span>
          <span style={code}>{body.phone}</span>
        </Section>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

export default ApplicationResponseEmail;

const logo = {
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#646cff",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  width: "fit-content",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontWeight: "700",
  fontFamily: "monospace",
  marginTop: "4px",
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
