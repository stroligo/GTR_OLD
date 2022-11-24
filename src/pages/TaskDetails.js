import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Spinner,
} from "react-bootstrap";

function TaskDetails() {
  const [validated, setValidated] = useState();
  const { taskID } = useParams(); //mesmo nome do parametro de ROTA (app.js)
  const navigate = useNavigate(); // instanciar o useNavigate()

  const [task, setTask] = useState({}); //informações do task que veio da minha API
  const [showEdit, setShowEdit] = useState(false); //controlar a visualização form // true -> form aparece

  const [form, setForm] = useState({
    nome: "",
  });

  /* const habilidades = [
    "Relatórios",
    "Planilhas",
    "Dashboards",
    "Comunicação",
    "Programação",
    "Planejamento",
    "Indicadores",
  ]; */

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/gtr_task/${taskID}`
        );
        console.log(response);
        setTask(response.data);
        setForm(response.data);
        setValidated(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Algo deu errado com o get da API.");
      }
    }
    fetchTask();

    return () => {
      console.log("vai rodar depois do useEffect");
    };
  }, [reload, taskID]);

  function handleChange({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  /* 
  async function handleDelete(e) {
    try {
      await axios.delete(`https://ironrest.cyclic.app/gtr_task/${taskID}`);
      //agora que o usuário está deletado
      //redirecionaremos ele para modelo
      navigate("/modelo");
      toast.success("Funcionário deletado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado ao deletar esse usuário.");
    }
  } */

  async function handleSubmit(e) {
    e.preventDefault();
    setValidated(true);
    if (
      [...document.querySelectorAll("input")]
        .map((element) => element.checkValidity())
        .reduce((result, element) => result * element)
    )
      try {
        //clonando o form para que possamos fazer as alterações necessárias
        const clone = { ...form };
        delete clone._id;

        await axios.put(
          `https://ironrest.cyclic.app/gtr_task/${taskID}`,
          clone
        );
        setValidated(false);
        toast.success("Alterações salvas");
        setReload(!reload);
        setShowEdit(false);
      } catch (error) {
        console.log(error);
        toast.error("Algo deu errado. Tente novamente.");
      }
  }

  console.log(form);

  return (
    <section>
      <Container className="my-4">
        {isLoading === false && (
          <>
            {/* Card task */}
            {showEdit === false && (
              <Card className="text-center" bg="light">
                <Card.Header>
                  <Row>
                    <Col>
                      <Card.Title>Tarefa</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Nome: {task.nome}
                      </Card.Subtitle>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>

                      <Card.Title>Status</Card.Title>
                      <Card.Text>{task.status}</Card.Text>


                    </Col>

                  </Row>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Row>


                    {/* <Col>
                      <Button variant="outline-danger" onClick={handleDelete}>
                        Excluir Funcionário
                      </Button>
                    </Col> */}
                  </Row>
                </Card.Footer>
              </Card>
            )}

          </>
        )}

        {isLoading === true && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Container>
    </section>
  );
}

export default TaskDetails;
