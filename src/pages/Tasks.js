import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Container, Button, Col, Row } from "react-bootstrap";
import ModalTarefas from "../components/ModalTarefas";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [formObj, setFormObj] = useState({});
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    (async () => {
      let response = await axios("https://ironrest.cyclic.app/gtr_task");
      setTasks(response.data);
    })();
  }, [reload]);

  function handleModal() {
    setFormObj({});
    setModalKey(modalKey + 1); // force modal reload
    setShowModal(true);
  }

  function handleEditTask(task) {
    setFormObj(task);
    setModalKey(modalKey + 1); // force modal reload
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
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleEditTask(task)}>
                    Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ModalTarefas
          show={showModal}
          setShow={setShowModal}
          reload={reload}
          setReload={setReload}
          formObj={formObj}
          key={modalKey}
        />
      </Container>
    </div>
  );
}
