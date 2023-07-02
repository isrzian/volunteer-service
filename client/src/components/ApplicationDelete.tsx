import * as React from "react";
import { Trash } from "lucide-react";

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
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function ApplicationDelete({ id }: { id: string | number }) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: [`application/delete/${id}`],
    mutationFn: async (id: string | number) =>
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
      queryClient.invalidateQueries([`applications`]);
    },
  });

  return (
    <>
      <button
        onClick={() => setShowDeleteDialog(true)}
        className="hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50"
      >
        <Trash className="mr-2 h-3.5 w-3.5 text-neutral-700/70" />
        <span>Удалить</span>
      </button>
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
                toast({
                  description: "Объявление удалено",
                });
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
