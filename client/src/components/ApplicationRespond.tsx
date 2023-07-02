import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import { Send } from "lucide-react";

const respondSchema = z.object({
  name: z.string({
    required_error: "Укажите своё имя",
  }),
  email: z.string({
    required_error: "Укажите свой адрес эл. почты",
  }),
  phone: z.string({
    required_error: "Укажите свой номер телефона",
  }),
});
type RespondValues = z.infer<typeof respondSchema>;

function ResponseForm({
  application,
  defaultValues,
  isMenu,
}: {
  application?: any;
  defaultValues?: RespondValues;
  isMenu?: boolean;
}) {
  const form = useForm<RespondValues>({
    resolver: zodResolver(respondSchema),
    defaultValues,
  });

  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationKey: ["respond"],
    mutationFn: async (body: any) =>
      await fetch("https://sender.dkrasnov.dev/api/respond", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSettled: () => {
      toast({
        title: "Вы откликнулись на объявление.",
        description:
          "Мы направили Ваш отклик заявителю. Заявитель или оператор свяжутся с Вами в ближайшее время.",
      });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isMenu ? (
          <button className="hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
            <Send className="mr-2 h-3.5 w-3.5 text-neutral-700/70" />
            <span>Откликнуться</span>
          </button>
        ) : (
          <Button>Откликнуться</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((data) => {
              const body = {
                ...data,
                ...application,
              };
              mutate(body);
            })}
          >
            <DialogHeader>
              <DialogTitle>Откликнуться на объявление</DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваше имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Ваше имя" {...field} />
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
                    <Input placeholder="Ваш эл. адрес" {...field} />
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
                    <Input placeholder="Ваш номер телефона" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Отправить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function ApplicationRespond({
  application,
  isMenu,
}: {
  application: any;
  isMenu?: boolean;
}) {
  const session = useSession();

  const volunteer = useQuery({
    queryKey: [`volunteer/${session.data?.user.id}`],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/volunteer/${session.data?.user.id}`
      ).then((res) => res.json()),
    enabled: !!session.data?.user.id && session.data.user.role === "volunteer",
  });

  const applicant = useQuery({
    queryKey: [`applicant/${session.data?.user.id}`],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/applicant/${session.data?.user.id}`
      ).then((res) => res.json()),
    enabled: !!session.data?.user.id && session.data.user.role === "applicant",
  });

  if (applicant.isFetching || volunteer.isFetching) return <></>;

  return (
    <ResponseForm
      defaultValues={applicant.data || volunteer.data}
      application={application}
      isMenu={isMenu}
    />
  );
}
