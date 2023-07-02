import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "./ui/use-toast";

interface SignUpApplicantProps extends React.HTMLAttributes<HTMLDivElement> {}

const applicantFormSchema = z.object({
  surname: z.string({
    required_error: "Укажите фамилию",
  }),
  name: z.string({
    required_error: "Укажите имя",
  }),
  patronymic: z.string({
    required_error: "Укажите отчество",
  }),
  email: z
    .string({
      required_error: "Укажите адрес эл. почты",
    })
    .email({
      message: "Неверный формат эл. почты",
    }),
  phone: z.string({
    required_error: "Укажите номер телефона",
  }),
});
type ApplicantFormValues = z.infer<typeof applicantFormSchema>;

export function SignUpApplicant({ className, ...props }: SignUpApplicantProps) {
  const form = useForm<ApplicantFormValues>({
    resolver: zodResolver(applicantFormSchema),
    mode: "onChange",
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: [`applicant/create`],
    mutationFn: async (body: ApplicantFormValues) => {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/applicant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      ).then((res) => res.json());
    },
    onSuccess: (res) => {
      toast({
        title: "Учетная запись создана.",
      });
      signIn(`credentials`, {
        id: res.id,
        role: "applicant",
      });
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((data) => mutate(data))}
        >
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Фамилия" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Имя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="patronymic"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Отчество" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Эл. адрес" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Телефон" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="px-5 text-center text-sm text-muted-foreground">
            Уже есть учетная запись?{" "}
            <Link
              href="/signin"
              className="underline underline-offset-4 hover:text-brand-primary dark:hover:text-brand-light"
            >
              Войти
            </Link>
          </p>
          <div className="h-4" />
          <Button type="submit" className="w-full" disabled={isLoading}>
            Создать пользователя
          </Button>
        </form>
      </Form>
    </div>
  );
}
