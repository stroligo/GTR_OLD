import TasksParam from "./TasksParam";

export default function TaskUser() {

  return (
    <div>
      <TasksParam op={1} botaoAdicionar={false} />
      <TasksParam op={2} botaoAdicionar={true} />
    </div>

  );
}
