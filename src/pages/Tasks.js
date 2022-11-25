import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";

import {
  Table,
  Container,
  Button,
  Col,
  Row,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { toast } from "react-hot-toast";
import ModalTarefas from "../components/ModalTarefas";
import { filterByKeys } from "../components/globalfns";

const priorities = {
  Alto: 2,
  Médio: 1,
  Baixo: 0,
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [tasksSearch, setTaskSearch] = useState("");
  const [allMembers, setAllMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [formObj, setFormObj] = useState({});
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        let response = await axios("https://ironrest.cyclic.app/gtr_task");
        setTasks(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Algo deu errado ao carregar as tarefas.");
      }
      try {
        let response = await axios("https://ironrest.cyclic.app/gtr_user");
        setAllMembers(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Algo deu errado ao carregar os membros.");
      }
    })();
  }, [reload]);

  function handleModal() {
    setMembers([]);
    setFormObj({});
    setModalKey(modalKey + 1); // force modal reload
    setShowModal(true);
  }

  function handleEditTask(task) {
    setMembers(
      allMembers.filter((item) => task.membros.includes(item.matricula))
    );
    setFormObj(task);
    setModalKey(modalKey + 1); // force modal reload
    setShowModal(true);
  }

  return (
    <section>
      <Container>
        <Row>
          <Col>
            <h4>Tarefas abertas</h4>
          </Col>
          <Col md="auto">
            <Button onClick={handleModal}>Adicionar</Button>
          </Col>
        </Row>
        <FloatingLabel
          controlId="floatingInput"
          label="Pesquise por status"
          className="my-3"
        >
          <Form.Control
            type="text"
            placeholder="pesquise"
            value={tasksSearch}
            onChange={({ target }) => setTaskSearch(target.value)}
          />
        </FloatingLabel>

        <Table bordered hover>
          <thead>
            <tr>
              <th className="col-md-4">Atividade</th>
              <th>Atribuido</th>
              <th>Status</th>
              {/*  <th>Prioridade</th> */}
              <th>Periodicidade</th>
              {/* <th>Referência</th> */}

              {/*  <th>Estimativa</th> */}
              <th>Tags</th>
              <th>Prazo</th>
              {/*  <th>Detalhes</th> */}
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter((task) => filterByKeys(task, ["status"], tasksSearch))
              .sort((task1, task2) => {
                let first =
                  priorities[task2.prioridade] - priorities[task1.prioridade];
                if (first !== 0) return first;

                let second = task1.prazoFinal.localeCompare(task2.prazoFinal);
                if (second !== 0) return second;

                return task1.inicio.localeCompare(task2.inicio);
              })
              .map((task) => (
                <tr key={task._id}>
                  <td>
                    <b>{task.nome}</b>
                  </td>
                  <td>
                    {allMembers
                      .filter((item) => task.membros.includes(item.matricula))
                      .map((member) => member.nome)
                      .join(", ")}
                  </td>
                  <td>{task.status}</td>
                  <td>{task.prioridade}</td>
                  {/*   <td>{task.periodicidade}</td> */}
                  {/* <td>{task.Referencia}</td> */}

                  {/*   <td>{task.tempoestimado}</td> */}
                  <td>{task.tags.join(" / ")}</td>
                  <td>
                    {new Date(task.inicio + " 00:00").toLocaleDateString()}{" "}
                    <br />
                    {new Date(task.prazoFinal + " 00:00").toLocaleDateString()}
                  </td>

                  {/*   <td>
                    <Button variant="outline-secondary" size="sm">
                      Detalhes
                    </Button>
                  </td> */}
                  <td>
                    <BsFillPencilFill
                      onClick={() => handleEditTask(task)}
                      className="editar"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <ModalTarefas
          key={modalKey}
          show={showModal}
          setShow={setShowModal}
          reload={reload}
          setReload={setReload}
          formObj={formObj}
          currentMembers={members}
          allMembers={allMembers}
        />
      </Container>
    </section>
  );
}
