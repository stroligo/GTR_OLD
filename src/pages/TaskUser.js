import TasksParam from "./TasksParam";

export default function TaskUser() {

  return (
    <div>
      <TasksParam op={1} botaoAdicionar={true} />
      <TasksParam op={2} botaoAdicionar={false} />
    </div>

  );
}
