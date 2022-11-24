import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Container,
  Card,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

function TaskDetails() {
  const { taskID } = useParams(); //mesmo nome do parametro de ROTA (app.js)
  const [task, setTask] = useState({}); //informações do task que veio da minha API
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

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/gtr_task/${taskID}`
        );
        console.log(response);
        setTask(response.data);
        setForm(response.data);
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
  }, [taskID]);

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

  console.log(form);

  return (
    <section>
      <Container className="my-4">
        {isLoading === false && (
          <>
            {/* Card task */}
            { (
              <Card className="text-center" bg="light">
                <Card.Header>
                  <Row>
                    <Col>
                      <Card.Title>{task.nome}</Card.Title>

                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>Prioridade</Card.Title>
                      <Card.Text>{task.prioridade}</Card.Text>

                      <Card.Title>Referencia</Card.Title>
                      <Card.Text>{task.referencia}</Card.Text>

                      <Card.Title>Inicio</Card.Title>
                      <Card.Text>{task.inicio}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Title>Tempo Estimado</Card.Title>
                      <Card.Text>{task.tempoestimado}</Card.Text>

                      <Card.Title>Inicio</Card.Title>
                      <Card.Text>{task.inicio}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>

                <Card.Footer className="text-muted">
                  <Row>
                    <Card.Title>Prazo Final</Card.Title>
                    <Card.Text>{task.prazoFinal}</Card.Text>

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
