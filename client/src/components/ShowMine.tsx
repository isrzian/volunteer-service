import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { showMineAtom } from "@/lib/atom";

export function ShowMine() {
  const [mine, setMine] = useAtom(showMineAtom);
  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 border-dashed"
      onClick={() => setMine((mine) => !mine)}
    >
      <Checkbox
        id="mine"
        className="mr-2 rounded-full h-4 w-4"
        checked={mine}
        defaultChecked={mine}
      />
      Только мои заявки
    </Button>
  );
}
