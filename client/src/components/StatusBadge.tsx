import { Badge } from "./ui/badge";

export default function StatusBadge({ status }: { status: string }) {
  if (status === "completed") return <Badge className="w-fit">Выполнено</Badge>;
  if (status === "in_process")
    return <Badge className="w-fit">Выполняется</Badge>;
  if (status === "new") return <Badge className="w-fit">Новая</Badge>;
  if (status === "verified") return <Badge className="w-fit">Проверено</Badge>;
  return null;
}
