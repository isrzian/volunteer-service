import * as React from "react";
import { ArrowUpLeftSquare, MoreHorizontal, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function ApplicationActions({ id }: { id: string }) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const { mutate, isLoading } = useMutation({
    mutationKey: [`application/delete/${id}`],
    mutationFn: async (id: string) =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/application/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "*/*",
          },
        }
      ),
    onSuccess: () => {
      toast({
        title: "Объявление удалено.",
      });
      router.push("/dashboard");
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <span className="sr-only">Действия</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => router.push("/dashboard")}
            className="cursor-pointer"
          >
            <ArrowUpLeftSquare className="mr-2 h-4 w-4" />
            Вернуться в панель
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Удалить объявление
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие не может быть отменено. Это объявление больше не
              будет доступен ни вам, ни другим пользователям.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отменить</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                mutate(id);
                setShowDeleteDialog(false);
              }}
              disabled={isLoading}
            >
              Удалить
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
