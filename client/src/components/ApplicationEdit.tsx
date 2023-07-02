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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Edit } from "lucide-react";
import { useToast } from "./ui/use-toast";

const applicationCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
  applicantId: z.number().nullable(),
  operatorId: z.number().nullable().default(null),
  operator: z.any().nullable(),
  volunteerId: z.number().nullable().default(null),
  volunteer: z.any().nullable(),
  status: z.string().optional(),
});
type ApplicationEditValues = z.infer<typeof applicationCreateSchema>;

export default function ApplicationEdit({
  defaultValues,
  isMenu,
}: {
  defaultValues: any;
  isMenu?: boolean;
}) {
  const { toast } = useToast();
  const session = useSession();
  const form = useForm<ApplicationEditValues>({
    resolver: zodResolver(
      applicationCreateSchema.omit({
        applicantId: true,
      })
    ),
    defaultValues,
  });

  const [open, setOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<string>(
    defaultValues.operatorId
  );
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>(
    defaultValues.volunteerId
  );
  const [selectedStatus, setSelectedStatus] = useState<string>(
    defaultValues.status
  );

  // const volunteers = useQuery({
  //   queryKey: [`volunteers`],
  //   queryFn: async () =>
  //     await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/volunteer`).then(
  //       (res) => res.json()
  //     ),
  // });

  const operators = useQuery({
    queryKey: [`operators`],
    queryFn: async () =>
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/operator`).then(
        (res) => res.json()
      ),
  });

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: [`application/edit/${defaultValues.id}`],
    mutationFn: async (body: ApplicationEditValues) => {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/application/${defaultValues.id}`,
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
        title: "Информация успешно обновлена.",
      });
      setOpen(false);
      queryClient.invalidateQueries(["applications"]);
      queryClient.invalidateQueries([`application/${defaultValues.id}`]);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isMenu ? (
          <button className="hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
            <Edit className="mr-2 h-3.5 w-3.5 text-neutral-700/70" />
            <span>Редактировать</span>
          </button>
        ) : (
          <Button>Редактировать</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((data) => {
              const selectedVolunteerId =
                !!selectedVolunteer && typeof selectedVolunteer === "string"
                  ? selectedVolunteer.split("-")[1]
                  : null;
              const selectedOperatorId =
                !!selectedOperator && typeof selectedOperator === "string"
                  ? selectedOperator.split("-")[1]
                  : null;
              data.status = selectedStatus;
              data.operatorId = selectedOperatorId
                ? parseInt(selectedOperatorId)
                : data.operatorId;
              data.volunteerId = selectedVolunteerId
                ? parseInt(selectedVolunteerId)
                : data.volunteerId;
              mutate(data);
            })}
          >
            <DialogHeader>
              <DialogTitle>Редактировать объявление</DialogTitle>
              <DialogDescription>
                Расскажите, пожалуйста, с чем нужна помощь.
              </DialogDescription>
            </DialogHeader>
            {((session.data?.user.role === "applicant" &&
              defaultValues.status !== "new") ||
              session.data?.user.role === "operator") && (
              <FormField
                control={form.control}
                name="status"
                render={() => (
                  <FormItem>
                    <FormLabel>Статус объявления</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={defaultValues.status}
                        onValueChange={(e) => setSelectedStatus(e)}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                          {session.data?.user.role === "operator" && (
                            <SelectItem value="new">Новое</SelectItem>
                          )}
                          <SelectItem
                            value="verified"
                            disabled={session.data?.user.role === "applicant"}
                          >
                            Проверено
                          </SelectItem>
                          <SelectItem value="in_process">
                            Выполняется
                          </SelectItem>
                          <SelectItem value="completed">Выполнено</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* {session.data?.user.role === "operator" && ( */}
            {/*   <FormField */}
            {/*     control={form.control} */}
            {/*     name="volunteer" */}
            {/*     render={() => ( */}
            {/*       <FormItem> */}
            {/*         <FormLabel>Исполнитель</FormLabel> */}
            {/*         <FormControl> */}
            {/*           <Select */}
            {/*             defaultValue={ */}
            {/*               "volunteer-" + defaultValues.volunteer?.id */}
            {/*             } */}
            {/*             onValueChange={(e) => setSelectedVolunteer(e)} */}
            {/*           > */}
            {/*             <SelectTrigger id="volunteer"> */}
            {/*               <SelectValue placeholder="Укажите исполнителя" /> */}
            {/*             </SelectTrigger> */}
            {/*             <SelectContent> */}
            {/*               {volunteers.data?.items?.map((volunteer: any) => ( */}
            {/*                 <SelectItem */}
            {/*                   key={volunteer.name} */}
            {/*                   value={"volunteer-" + volunteer.id} */}
            {/*                 > */}
            {/*                   {volunteer.name} */}
            {/*                 </SelectItem> */}
            {/*               ))} */}
            {/*             </SelectContent> */}
            {/*           </Select> */}
            {/*         </FormControl> */}
            {/*         <FormMessage /> */}
            {/*       </FormItem> */}
            {/*     )} */}
            {/*   /> */}
            {/* )} */}
            {session.data?.user.role === "operator" && (
              <FormField
                control={form.control}
                name="operator"
                render={() => (
                  <FormItem>
                    <FormLabel>Оператор</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={"operator-" + defaultValues.operator?.id}
                        onValueChange={(e) => setSelectedOperator(e)}
                      >
                        <SelectTrigger id="operator">
                          <SelectValue placeholder="Укажите оператора" />
                        </SelectTrigger>
                        <SelectContent>
                          {operators.data?.items?.map((operator: any) => (
                            <SelectItem
                              key={operator.name}
                              value={"operator-" + operator.id}
                            >
                              {operator.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
