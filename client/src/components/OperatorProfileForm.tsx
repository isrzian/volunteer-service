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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "./ui/switch";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const operatorFormSchema = z.object({
  name: z.string(),
  position: z.string(),
  isActive: z.boolean(),
});
type OperatorFormValues = z.infer<typeof operatorFormSchema>;

export default function OperatorProfileForm({
  defaultValues,
}: {
  defaultValues?: OperatorFormValues;
}) {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState<boolean>(
    defaultValues?.isActive || false
  );
  const session = useSession();
  const form = useForm<OperatorFormValues>({
    resolver: zodResolver(operatorFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: [`applicant/edit/${session.data?.user.id}`],
    mutationFn: async (body: OperatorFormValues) => {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/operator/${session.data?.user.id}`,
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
        onSubmit={form.handleSubmit((data) => {
          data.isActive = isActive;
          mutate(data);
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input
                  placeholder="Имя"
                  {...field}
                  autoComplete="off"
                  autoCorrect="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Должность</FormLabel>
              <FormControl>
                <Input
                  placeholder="Должность"
                  {...field}
                  autoComplete="off"
                  autoCorrect="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col space-y-1">
            <span>Статус учетной записи</span>
            <span className="font-normal leading-snug text-neutral-500">
              Позволяeт принимать в работу объявления от заявителей.
            </span>
          </div>
          <Switch
            id="isAcitve"
            defaultChecked={defaultValues?.isActive}
            {...form.register("isActive")}
            onCheckedChange={() => setIsActive((active) => !active)}
          />
        </div>
        <div className="h-4" />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Обновить профиль
        </Button>
      </form>
    </Form>
  );
}
