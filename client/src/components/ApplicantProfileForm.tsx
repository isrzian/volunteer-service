import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "./ui/use-toast";

const applicantFormSchema = z.object({
  surname: z.string(),
  name: z.string(),
  patronymic: z.string(),
  email: z.string().email({
    message: "Неверный формат эл. почты",
  }),
  phone: z.string(),
});
type ApplicantFormValues = z.infer<typeof applicantFormSchema>;

export default function ApplicantProfileForm({
  defaultValues,
}: {
  defaultValues?: ApplicantFormValues;
}) {
  const { toast } = useToast();
  const session = useSession();
  const form = useForm<ApplicantFormValues>({
    resolver: zodResolver(applicantFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: [`applicant/edit/${session.data?.user.id}`],
    mutationFn: async (body: ApplicantFormValues) => {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/applicant/${session.data?.user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      ).then((res) => res.json());
    },
    onSuccess: () => {
      toast({
        title: "Данные успешно сохранены.",
      });
    },
  });

  return (
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
              <FormLabel>Фамилия</FormLabel>
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
              <FormLabel>Имя</FormLabel>
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
              <FormLabel>Отчество</FormLabel>
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
              <FormLabel>Эл. адрес</FormLabel>
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
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="Телефон" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="h-4" />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Обновить профиль
        </Button>
      </form>
    </Form>
  );
}
