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
  tempoestimado: "00:30",
  prazoFinal: today_formated,
  status: "Ativo",
};

// https://stackoverflow.com/a/37511463
function removeAccents(string) {
  return string.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function filterByKeys(obj, keys, search) {
  if (!search.length || !obj) return true;
  search = removeAccents(search).toLowerCase();

  for (let key of keys) {
    let values = obj[key];

    // eslint-disable-next-line eqeqeq
    if (values == undefined) return false;
    if (typeof values === "string") values = [values];
    if (!Array.isArray(values))
      throw Error(
        "Não é possível filtar, pois um dos valores recebidos é de tipo diverso de array e string"
      );

    for (let str of values) {
      console.log(str, search);
      if (removeAccents(str.toLowerCase()).includes(search)) return true;
    }
  }

  return false;
}
