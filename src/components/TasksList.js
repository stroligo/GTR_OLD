import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Tasks(id) {
  const { matricula } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios("https://ironrest.cyclic.app/gtr_task");
      setTasks(response.data);
    })();
  }, []);

  return (
    <tbody>
      {tasks

        .filter((task) => {
          return (
            task.membros === matricula || task.membros === ""
          );
        })
        .map((task) => (
          <tr key={task._id}>
            <td>{task.status}</td>
            <td>{task.nome}</td>
            <td>{task.prioridade}</td>
            <td>{task.peridiciodade}</td>
            <td>{task.Referencia}</td>
            <td>{task.membros}</td>
            <td>{task.inicio}</td>
            <td>{task.tempoestimado}</td>
            <td>{task.PrazoFinal}</td>
            <td>{task.tags}</td>
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