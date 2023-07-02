import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/router";
import Gosuslugi from "./Gosuslugi";

interface ApplicantAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const signUpSchema = z.object({
  id: z.string({
    required_error: "Укажите идентификатор пользователя.",
  }),
});
type ApplicantFormValues = z.infer<typeof signUpSchema>;

export function ApplicantAuthForm({
  className,
  ...props
}: ApplicantAuthFormProps) {
  const form = useForm<ApplicantFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      id: undefined,
    },
  });

  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;

  const { mutate, isLoading } = useMutation({
    mutationKey: [`signin`],
    mutationFn: async (data: ApplicantFormValues) =>
      signIn(`credentials`, {
        id: data.id,
        role: "applicant",
        callbackUrl,
        redirect: false,
      }),
    onSuccess: (res) => {
      toast({
        title: res?.ok ? "Вы вошли." : "Пользователь не существует.",
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
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Пользователь" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Нет учетной записи?{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-brand-primary dark:hover:text-brand-light"
            >
              Создать
            </Link>
          </p>
          <Button className="w-full" disabled={isLoading}>
            Войти
          </Button>
          <Button
            className="flex flex-row items-center justify-center gap-2 w-full"
            disabled={isLoading}
            variant="outline"
          >
            <Gosuslugi className="w-6 h-6" /> <span>Войти через госуслуги</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
