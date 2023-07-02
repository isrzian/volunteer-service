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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const applicationCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
  applicantId: z.number().nullable().default(null),
  operatorId: z.number().nullable().default(null),
  volunteerId: z.number().nullable().default(null),
  operator: z.any().nullable(),
  applicant: z.any().nullable(),
  volunteer: z.any().nullable(),
  status: z.string().optional(),
});
type ApplicationCreateValues = z.infer<typeof applicationCreateSchema>;

export function ApplicationOperatorCreate({ isMenu }: { isMenu?: boolean }) {
  const session = useSession();
  const form = useForm<ApplicationCreateValues>({
    resolver: zodResolver(applicationCreateSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<string | null>(
    null
  );
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("new");

  const operators = useQuery({
    queryKey: [`operators`],
    queryFn: async () =>
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/operator`).then(
        (res) => res.json()
      ),
  });

  const applicants = useQuery({
    queryKey: [`applicants`],
    queryFn: async () =>
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/applicant`).then(
        (res) => res.json()
      ),
  });

  // const volunteers = useQuery({
  //   queryKey: [`volunteers`],
  //   queryFn: async () =>
  //     await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/volunteer`).then(
  //       (res) => res.json()
  //     ),
  // });

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
              const selectedOperatorId =
                !!selectedOperator && typeof selectedOperator === "string"
                  ? selectedOperator.split("-")[1]
                  : session.data?.user.id.toString();
              const selectedApplicantId =
                !!selectedApplicant && typeof selectedApplicant === "string"
                  ? selectedApplicant.split("-")[1]
                  : null;
              const selectedVolunteerId =
                !!selectedVolunteer && typeof selectedVolunteer === "string"
                  ? selectedVolunteer.split("-")[1]
                  : session.data?.user.id.toString();
              data.status = selectedStatus;
              (data as any).operatorId = selectedOperatorId
                ? parseInt(selectedOperatorId)
                : session.data?.user.id;
              data.applicantId = selectedApplicantId
                ? parseInt(selectedApplicantId)
                : null;
              data.volunteerId = selectedVolunteerId
                ? parseInt(selectedVolunteerId)
                : null;
              mutate(data);
            })}
          >
            <DialogHeader>
              <DialogTitle>Редактировать объявление</DialogTitle>
              <DialogDescription>
                Расскажите, пожалуйста, с чем нужна помощь.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="status"
              render={() => (
                <FormItem>
                  <FormLabel>Статус объявления</FormLabel>
                  <FormControl>
                    <Select onValueChange={(e) => setSelectedStatus(e)}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Выберите статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Новое</SelectItem>
                        <SelectItem
                          value="verified"
                          disabled={session.data?.user.role === "applicant"}
                        >
                          Проверено
                        </SelectItem>
                        <SelectItem value="in_process">Выполняется</SelectItem>
                        <SelectItem value="completed">Выполнено</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applicant"
              render={() => (
                <FormItem>
                  <FormLabel>Заявитель</FormLabel>
                  <FormControl>
                    <Select onValueChange={(e) => setSelectedApplicant(e)}>
                      <SelectTrigger id="applicant">
                        <SelectValue placeholder="Укажите заявителя" />
                      </SelectTrigger>
                      <SelectContent>
                        {applicants.data?.items.map((applicant: any) => (
                          <SelectItem
                            key={applicant.name}
                            value={"applicant-" + applicant.id}
                          >
                            {applicant.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField */}
            {/*   control={form.control} */}
            {/*   name="volunteer" */}
            {/*   render={() => ( */}
            {/*     <FormItem> */}
            {/*       <FormLabel>Исполнитель</FormLabel> */}
            {/*       <FormControl> */}
            {/*         <Select onValueChange={(e) => setSelectedVolunteer(e)}> */}
            {/*           <SelectTrigger id="volunteer"> */}
            {/*             <SelectValue placeholder="Укажите исполнителя" /> */}
            {/*           </SelectTrigger> */}
            {/*           <SelectContent> */}
            {/*             {volunteers.data?.items?.map((volunteer: any) => ( */}
            {/*               <SelectItem */}
            {/*                 key={volunteer.name} */}
            {/*                 value={"volunteer-" + volunteer.id} */}
            {/*               > */}
            {/*                 {volunteer.name} */}
            {/*               </SelectItem> */}
            {/*             ))} */}
            {/*           </SelectContent> */}
            {/*         </Select> */}
            {/*       </FormControl> */}
            {/*       <FormMessage /> */}
            {/*     </FormItem> */}
            {/*   )} */}
            {/* /> */}
            <FormField
              control={form.control}
              name="operator"
              render={() => (
                <FormItem>
                  <FormLabel>Оператор</FormLabel>
                  <FormControl>
                    <Select onValueChange={(e) => setSelectedOperator(e)}>
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Название заявки" {...field} />
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
                    <Textarea placeholder="Описание заявки" {...field} />
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
