export const periodicity = [
  { label: "Única", value: "once" },
  { label: "Diária", value: "daily" },
  { label: "Semanal", value: "weekly" },
  { label: "Mensal", value: "monthly" },
];
export const week = [
  { label: "Segunda", value: "monday" },
  { label: "Terça", value: "tuesday" },
  { label: "Quarta", value: "wednesday" },
  { label: "Quinta", value: "thursday" },
  { label: "Sexta", value: "friday" },
  { label: "Sábado", value: "saturday" },
  { label: "Domingo", value: "sunday" },
];
export function handleMultiple(list, value) {
  let result;
  if (list.includes(value)) {
    result = list.filter((item) => item !== value);
  } else {
    result = [...list, value];
  }
  return result;
}
