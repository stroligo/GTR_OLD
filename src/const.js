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

let today = new Date();
let today_formated = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
)
  .toISOString()
  .split("T")[0];

export let taskObject = {
  nome: "",
  tags: [],
  prioridade: "Médio",
  periodicidade: "",
  perioDetalhes: [],
  descrição: "",
  membros: [],
  Referencia: "",
  inicio: today_formated,
  tempoestimado: 5,
  prazoFinal: today_formated,
};
