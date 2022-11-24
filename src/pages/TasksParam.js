import axios from "axios";
import { useEffect, useState } from "react";
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
import ModalTarefas from "../components/ModalTarefasUsers";
import { useParams, Link } from "react-router-dom";
import { filterByKeys } from "../components/globalfns";

const priorities = {
  Alto: 2,
  Médio: 1,
  Baixo: 0,
};

export default function TasksParam(opcoes) {
  const [tasks, setTasks] = useState([]);
  const [tasksSearch, setTaskSearch] = useState("");
  const [allMembers, setAllMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [formObj, setFormObj] = useState({});
  const [modalKey, setModalKey] = useState(0);
  const [edit, setEdit] = useState(false);
  const [atribuir, setAtribuir] = useState(false);
  const { matricula } = useParams();
  let titulo;
  let tarefas;

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
    setEdit("new")
    setMembers([]);
    setFormObj({});
    setModalKey(modalKey + 1); // force modal reload
    setShowModal(true);
  }

  function handleEditTask(task) {
    setEdit("editar");
    setMembers(
      allMembers.filter((item) => task.membros.includes(item.matricula))
    );
    setFormObj(task);
    setModalKey(modalKey + 1); // force modal reload
    setShowModal(true);
  }

  function aceite() {
    return (opcoes.op === 1) ? <th>Aceitar</th> : <th>Atribuir</th>
  }

  function atribuirse(task) {
    setAtribuir(matricula)
    task.membros = [matricula];
    task.status = "Aceita";
    handleEditTask(task)
  }

  function aceitar(task) {
    setEdit("aceita")
    task.status = "Aceita";
    handleEditTask(task)
  }

  function rejeitar(task) {
    setEdit("rejeitada")
    task.status = "Rejeitada";
    handleEditTask(task)
  }
  function showButton(task) {
    if (opcoes.op === 1 && task.status === "Ativo") {

      return (
        <td>
          <tr><Button
            variant="success"
            size="sm"
            onClick={() => aceitar(task)}
          >
            Aceitar
          </Button>
          </tr>
          <tr>
            <Button
              variant="danger"
              size="sm"
              onClick={() => rejeitar(task)}
            >
              Rejeitar
            </Button>
          </tr>
        </td>

      )
    }
    if (opcoes.op === 1 && task.status !== "Ativo") { return (<td></td>) }
    if (opcoes.op === 2) {
      return (<td>
        <tr>
          <Button
            variant="primary"
            size="sm"
            onClick={() => atribuirse(task)}
          >
            Atribuir
          </Button>
        </tr>
      </td>)
    }
  }
  function botaoAdicionar(condicional) {
    if (condicional) {
      return (
        <Col md="auto">
          <Button onClick={handleModal}>Adicionar</Button>
        </Col>
      );
    }
    return (false);
  }

  if (opcoes.op === 1) {
    titulo = "Tarefas Atribuidas"
    tarefas = tasks.filter((task) => {
      return (
        task.membros.includes(matricula)
      );
    })
  }

  if (opcoes.op === 2) {
    titulo = "Tarefas sem Atribuição"
    tarefas = tasks.filter((task) => {
      return (
        task.membros.length === 0
      );
    })
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h3>{titulo}</h3>
          </Col>
        </Row>
        <FloatingLabel
          controlId="floatingInput"
          label="Pesquise por status"
          className="my-3">
          <Form.Control
            type="text"
            placeholder="pesquise"
            value={tasksSearch}
            onChange={({ target }) => setTaskSearch(target.value)}
          />
        </FloatingLabel>

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
              {aceite()}
              {opcoes.op ===1 ? <th>Editar</th> : true===true}
            </tr>
          </thead>
          <tbody>
            {tarefas
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
                  <td>{task.status}</td>
                  <td>{task.nome}</td>
                  <td>{task.prioridade}</td>
                  <td>{task.periodicidade}</td>
                  <td>{task.Referencia}</td>
                  <td>
                    {allMembers
                      .filter((item) => task.membros.includes(item.matricula))
                      .map((member) => member.nome)
                      .join(", ")}
                  </td>
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
                  {showButton(task)}
                  
                    { (opcoes.op===1) ? (
                      <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleEditTask(task)}>
                        Editar
                      </Button>
                      </td>)
                      : (1==1)}
                 
                </tr>
              ))}
          </tbody>
        </Table>
        {botaoAdicionar(opcoes.botaoAdicionar)}

        <ModalTarefas
          key={modalKey}
          show={showModal}
          setShow={setShowModal}
          reload={reload}
          setReload={setReload}
          formObj={formObj}
          currentMembers={members}
          allMembers={allMembers}
          edit={edit}
          atribuir={atribuir}
        />
      </Container>
    </div>
  );
}
