import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const applicationCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
  applicantId: z.number().optional(),
  operatorId: z.number().optional(),
  status: z.string().optional(),
});
type ApplicationCreateValues = z.infer<typeof applicationCreateSchema>;

export function ApplicationCreate({ isMenu }: { isMenu?: boolean }) {
  const session = useSession();
  const form = useForm<ApplicationCreateValues>({
    resolver: zodResolver(applicationCreateSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [open, setOpen] = useState(false);

  const operators = useQuery({
    queryKey: [`operators`],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/operator`
      ).then((res) => res.json()),
  });

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: [`application/create`],
    mutationFn: async (body: ApplicationCreateValues) => {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      ).then((res) => res.json());
    },
    onSuccess: () => {
      toast({
        title: "Объявление создано.",
      });
      queryClient.invalidateQueries(["applications"]);
      setOpen(false);
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isMenu ? (
          <button className="hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Создать объявление</span>
          </button>
        ) : (
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircle className="mr-2 h-4 w-4" />
            Создать объявление
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((data) => {
              data.applicantId = session.data?.user.id;
              data.status = "new";
              data.operatorId =
                !!operators.data && operators.data?.items?.length > 0
                  ? operators.data.items[
                      Math.floor(Math.random() * operators.data?.items?.length)
                    ].id
                  : null;
              mutate(data);
            })}
          >
            <DialogHeader>
              <DialogTitle>Создать объявление</DialogTitle>
              <DialogDescription>
                Расскажите, пожалуйста, с чем Вам нужна помощь.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Мне нужна помощь с..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Пожалуйста опишите с чем нужна помощь."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
