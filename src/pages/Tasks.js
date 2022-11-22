import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Container, Button, Col, Row } from "react-bootstrap";
import ModalTarefas from "../components/ModalTarefas";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      let response = await axios("https://ironrest.cyclic.app/gtr_task");
      setTasks(response.data);
    })();
  }, []);

  function handleModal() {
    setShowModal(true);
  }
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h3>Tarefas atribuídas</h3>
          </Col>
          <Col md="auto">
            <Button onClick={handleModal}>Adicionar</Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Status</th>
              <th>Nome</th>
              <th>Prioridade</th>
              <th>Periodicidade</th>
              <th>Referência</th>
              <th>Membros</th>
              <th>Início</th>
              <th>Minutos Estimados</th>
              <th>Prazo Final</th>
              <th>Tags</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
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
            {/* {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.nome}</td>
                  <td>{user.task}</td>
                  <td>
                    <ProgressBar
                      animated
                      now={user.progresso}
                      label={`${user.progresso}%`}
                    />
                  </td>
                  <td>{user.status}</td>
                  <td>{user.departamento}</td>
                  <td>
                    <Link to={`/user/${user._id}`}>
                      <Button variant="outline-secondary" size="sm">
                        Detalhes
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </Table>

        <ModalTarefas show={showModal} setShow={setShowModal} />
        {/* reload={reload} setReload={setReload} */}
      </Container>
    </div>
  );
}
