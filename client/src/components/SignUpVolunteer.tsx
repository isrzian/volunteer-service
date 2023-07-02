import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";

interface SignUpVolunteerProps extends React.HTMLAttributes<HTMLDivElement> {}

const volunteerFormSchema = z.object({
  name: z.string({
    required_error: "Укажите отображаемое имя",
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
  isAuthorizedToEpgu: z.boolean().default(false),
});
type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

export function SignUpVolunteer({ className, ...props }: SignUpVolunteerProps) {
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    mode: "onChange",
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: [`applicant/create`],
    mutationFn: async (body: VolunteerFormValues) => {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/volunteer`,
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
        role: "volunteer",
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Имя пользователя" {...field} />
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
