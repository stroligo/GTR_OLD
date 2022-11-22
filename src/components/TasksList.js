import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Tasks({id}) {
  const { matricula } = useParams();
  const [tasks, setTasks] = useState([]);
  console.log({id})
  useEffect(() => {
    (async () => {
      const response = await axios("https://ironrest.cyclic.app/gtr_task");
      setTasks(response.data);
    })();
  }, []);
  let tarefas;
  
  if (id === 1) {
    tarefas = tasks.filter((task) => {
      return (
        task.membros.includes(matricula)
      );
    })
  }

  if (id === 2) {
    tarefas = tasks.filter((task) => {
     return (
       task.membros.length === 0
     );
   })
   }


   return (
    <tbody>
      {tarefas.map((task) => (
          <tr key={task._id}>
            <td>{task.status}</td>
                <td>{task.nome}</td>
                <td>{task.prioridade}</td>
                <td>{task.periodicidade}</td>
                <td>{task.Referencia}</td>
                <td>{task.membros.join(", ")}</td>
                <td>{new Date(task.inicio + " 00:00").toLocaleDateString()}</td>
                <td>{task.tempoestimado}</td>
                <td>
                  {new Date(task.prazoFinal + " 00:00").toLocaleDateString()}
                </td>
                <td>{task.tags.join(", ")}</td>
                <td>
                <Link to={`/tasks/${task._id}`}>
                <Button variant="outline-secondary" size="sm">
                  Detalhes
                </Button>
              </Link>
                </td>
          </tr>
        ))}
    </tbody>
  );
}