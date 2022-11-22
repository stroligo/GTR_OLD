import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Button, Container, Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";

export default function TaskDetail() {
  const navigate = useNavigate();
  const { taskID } = useParams();
  const [isLoading, setIsLoading] = useState(true); //informações do user que veio da minha API
  const [task, setTask] = useState({}); //informações do user que veio da minha API
  const [showEdit, setShowEdit] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/gtr_task/${taskID}`
        );
        setTask(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Algo deu errado com o get da API.");
      }
    }
    fetchUser();
  }, [reload, taskID]);

  async function handleDelete(e) {
    try {
      await axios.delete(`https://ironrest.cyclic.app/gtr_task/${taskID}`);
      navigate("/tasks");
      toast.success("Tarefa deletada com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado ao deletar essa tarefa.");
    }
  }

  return (
    <Container>
      {isLoading === false && (
        <>
          {showEdit === false && (
            <Card className="text-center" bg="light">
              <Card.Header>
                <Card.Title>{task.nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  tags: {task.tags}
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col>
                    <Card.Title>Prioridade</Card.Title>
                    <Card.Text>{task.prioridade}</Card.Text>
                  </Col>
                  <Col>
                    <Card.Title>Periodicidade</Card.Title>
                    <Card.Text>
                      {task.periodicidade || "não há informação"}{" "}
                      {task.perioDetalhes
                        ? " - " + task.perioDetalhes.join(", ")
                        : ""}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Title>Membros</Card.Title>
                    <Card.Text>
                      {Array.isArray(task.membros)
                        ? task.membros.join(", ")
                        : task.membros}
                    </Card.Text>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Card.Title>Descrição</Card.Title>
                    <Card.Text>{task.descrição}</Card.Text>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Card.Title>Referência</Card.Title>
                    <Card.Text>{task.Referencia}</Card.Text>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Card.Title>Inicio</Card.Title>
                    <Card.Text>{task.inicio}</Card.Text>
                  </Col>
                  <Col>
                    <Card.Title>Tempo Estimado</Card.Title>
                    <Card.Text>{task.tempoestimado} minutos</Card.Text>
                  </Col>
                  <Col>
                    <Card.Title>Prazo Final</Card.Title>
                    <Card.Text>{task.prazoFinal}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Row>
                  <Col>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowEdit(true)}>
                      Editar Funcionário
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-danger" onClick={handleDelete}>
                      Excluir Funcionário
                    </Button>
                  </Col>
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
  );
}
