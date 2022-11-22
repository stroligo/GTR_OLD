export const periodicity = [
  { label: "Única", value: "unica" },
  { label: "Diária", value: "diaria" },
  { label: "Semanal", value: "semanal" },
  { label: "Mensal", value: "mensal" },
];

export const week = [
  { label: "Segunda", value: "segunda" },
  { label: "Terça", value: "terça" },
  { label: "Quarta", value: "quarta" },
  { label: "Quinta", value: "quinta" },
  { label: "Sexta", value: "sexta" },
  { label: "Sábado", value: "sabado" },
  { label: "Domingo", value: "domingo" },
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
  periodicidade: "unica",
  detalhesPeriodicidade: [],
  descrição: "",
  membros: [],
  Referencia: "",
  inicio: today_formated,
  tempoestimado: 5,
  prazoFinal: today_formated,
  status: "Ativo",
};
