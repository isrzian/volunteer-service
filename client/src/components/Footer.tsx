import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16 py-8">
      <section className="flex flex-col w-full items-center justify-center gap-5">
        <Button variant="outline">Поддержать проект</Button>
      </section>
    </footer>
  );
}
