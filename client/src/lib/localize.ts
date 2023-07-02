export const localize = (str: string) => {
  if (str === "title") return "Наименование";
  if (str === "description") return "Описание";
  if (str === "applicant") return "Заявитель";
  if (str === "operator") return "Оператор";
  if (str === "status") return "Статус";
  return null;
};
