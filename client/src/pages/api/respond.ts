import type { NextApiRequest, NextApiResponse } from "next";
import { ApplicationResponseEmail } from "@/components/ResponseEmail";
import { render } from "@react-email/render";
import { transporter } from "@/lib/transporter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body && (JSON.parse(req.body) as any);
  if (req.method === "POST") {
    try {
      await transporter.sendMail({
        from: { name: "Добрые Дела", address: "gooddeeds@internet.ru" },
        to: body.applicant.email,
        subject: `На объявление “${body.title}” откликнулись`,
        html: render(ApplicationResponseEmail(body)),
      });
      return res.status(200).json({ message: "Сообщение успешно отправлено." });
    } catch (e) {
      return res
        .status(500)
        .json({ message: `Ошибка при отправке сообщения: ${e}` });
    }
  } else {
    return res.status(200).json({ message: "API для отправки сообщений." });
  }
}
