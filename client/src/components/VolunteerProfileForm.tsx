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

const volunteerFormSchema = z.object({
  name: z.string(),
  email: z.string().email({
    message: "Неверный формат эл. почты",
  }),
  phone: z.string(),
});
type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

export default function VolunteerProfileForm({
  defaultValues,
}: {
  defaultValues?: VolunteerFormValues;
}) {
  const { toast } = useToast();
  const session = useSession();
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: [`volunteer/edit/${session.data?.user.id}`],
    mutationFn: async (body: VolunteerFormValues) => {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/volunteer/${session.data?.user.id}`,
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
