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
  Badge,
  Offcanvas,
  ListGroup,
} from "react-bootstrap";

function BaseModeloDetailsPage() {
  const { userID } = useParams(); //mesmo nome do parametro de ROTA (app.js)
  const navigate = useNavigate(); // instanciar o useNavigate()

  const [user, setUser] = useState({}); //informações do user que veio da minha API
  const [showEdit, setShowEdit] = useState(false); //controlar a visualização form // true -> form aparece
  const [form, setForm] = useState({
    nome: "",
    salario: "",
    email: "",
    tel: "",
    departamento: "",
    dataAdmissao: "",
    status: "",
    stack: [],
    active: true,
    task: "",
    progresso: "",
    foto: "",
    cargo: "",
  });

  const stack = ["React", "JS", "HTML", "CSS", "NodeJS", "MongoDB", "Express"];

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/enap92/${userID}`
        );
        setUser(response.data);
        setForm(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Algo deu errado com o get da API.");
      }
    }
    fetchUser();

    return () => {
      console.log("vai rodar depois do useEffect");
    };
  }, [reload, userID]);

  function handleChange(e) {
    if (e.target.name === "active") {
      setForm({ ...form, active: e.target.checked });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDelete(e) {
    try {
      await axios.delete(`https://ironrest.herokuapp.com/enap92/${userID}`);
      //agora que o usuário está deletado
      //redirecionaremos ele para a homePage
      navigate("/");
      toast.success("Funcionário deletado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado ao deletar esse usuário.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //clonando o form para que possamos fazer as alterações necessárias
      const clone = { ...form };
      delete clone._id;

      await axios.put(`https://ironrest.herokuapp.com/enap92/${userID}`, clone);

      toast.success("Alterações salvas");
      setReload(!reload);
      setShowEdit(false);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  async function handleStack(e) {
    //console.log(e.target.checked); -> está clicado ou não
    //console.log(e.target.name); -> qual o nome da tech
    // toda vez que o checkbox é alterado, enviamos essa alteração pra API
    try {
      const clone = { ...user };
      delete clone._id;

      // let newuser = filter: clone = clone.filter( el => el !== e.target.name);

      if (e.target.checked === true) {
        clone.stack.push(e.target.name);
      }

      if (e.target.checked === false) {
        const index = clone.stack.indexOf(e.target.name); //acho o index do elemento que eu cliquei
        clone.stack.splice(index, 1); //retiro o elemento da array
      }

      await axios.put(`https://ironrest.herokuapp.com/enap92/${userID}`, clone);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  async function handleTaskCompletada(e) {
    e.preventDefault();

    if (!form.task) {
      // se form.task for uma string vazia ela é false -> então eu nego -> true
      toast.error("Por favor, adicione uma task primeiro");
      return;
    }

    try {
      const clone = { ...user };
      delete clone._id;

      clone.tasksFinalizadas.push(clone.task);
      clone.task = "";
      clone.progresso = "0";

      await axios.put(`https://ironrest.herokuapp.com/enap92/${userID}`, clone);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  async function handleDeleteTask(index) {
    try {
      const clone = { ...user };
      delete clone._id;

      clone.tasksFinalizadas.splice(index, 1);

      await axios.put(`https://ironrest.herokuapp.com/enap92/${userID}`, clone);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Task não foi excluída");
    }
  }

  console.log(form);

  return (
    <section>
      <Container className="my-4">
        {isLoading === false && (
          <>
            {/* Card User */}
            {showEdit === false && (
              <Card className="text-center" bg="light">
                <Card.Header>
                  <Card.Title>{user.nome}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Data de Admissão: {user.dataAdmissao}
                  </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>Email</Card.Title>
                      <Card.Text>{user.email}</Card.Text>

                      <Card.Title>Telefone</Card.Title>
                      <Card.Text>{user.tel}</Card.Text>

                      <Card.Title>Departamento</Card.Title>
                      <Card.Text>{user.departamento}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Title>Cargo</Card.Title>
                      <Card.Text>{user.cargo}</Card.Text>

                      <Card.Title>Status</Card.Title>
                      <Card.Text>{user.status}</Card.Text>

                      <Card.Text>
                        {/* ternário */}
                        {user.active ? "Ativa na empresa" : "Não está ativo"}
                      </Card.Text>
                    </Col>
                    <Col className="col-2">
                      <img
                        src={user.foto}
                        alt="pequena foto de perfil do usuário"
                        height={150}
                        style={{ borderRadius: "15px" }}
                      />
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Row>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowEdit(true)}
                      >
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
            {/* Card User Edit */}
            {showEdit === true && (
              <Card className="text-center" bg="light">
                <Card.Body>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Nome do Funcionário</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Insira o nome completo do funcionário"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            autoFocus
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Cargo</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Insira nome do cargo do funcionário"
                            name="cargo"
                            value={form.cargo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Numero de Telefone</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Insira o telefone do funcionário"
                            name="tel"
                            value={form.tel}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Insira o email do funcionário"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Salário</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Insira o valor do salário R$"
                            name="salario"
                            value={form.salario}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Departamento</Form.Label>
                          <Form.Select
                            name="departamento"
                            onChange={handleChange}
                            defaultValue={form.departamento}
                          >
                            <option>Selecione uma opção</option>
                            <option value="Front-End">Front-End</option>
                            <option value="Back-End">Back-End</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Marketing">Marketing</option>
                            <option value="People">People</option>
                            <option value="Full-Stack">Full-Stack</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Data de Admissão</Form.Label>
                          <Form.Control
                            type="date"
                            name="dataAdmissao"
                            value={form.dataAdmissao}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Adicione sua foto</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Insira a url da sua foto de perfil"
                            name="foto"
                            value={form.foto}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Row>
                    <Col>
                      <Button
                        variant="outline-danger"
                        onClick={() => setShowEdit(false)}
                      >
                        Voltar
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="outline-success" onClick={handleSubmit}>
                        Salvar Alterações
                      </Button>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Funcionário ativo na empresa"
                          name="active"
                          checked={form.active}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            )}

            <Row className="mt-3">
              <Col className="col-3">
                <Card bg="light">
                  <Card.Header>
                    <Card.Title>Stack</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {stack.map((tech) => {
                      return (
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="checkbox"
                            label={tech}
                            name={tech}
                            onChange={handleStack}
                            checked={user.stack.includes(tech)}
                          />
                        </Form.Group>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card bg="light">
                  <Card.Header>
                    <Card.Title>Task</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Insira a task que você está trabalhando"
                        name="task"
                        value={form.task}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Range
                        min="0"
                        max="100"
                        value={form.progresso}
                        name="progresso"
                        onChange={handleChange}
                      />
                      {form.progresso}
                    </Form.Group>
                    <Row>
                      <Col>
                        <Button
                          onClick={handleSubmit}
                          variant="outline-secondary"
                        >
                          Atualizar
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="outline-success"
                          onClick={handleTaskCompletada}
                        >
                          Concluir Task
                        </Button>
                      </Col>

                      <Col>
                        <Button
                          variant="outline-dark"
                          onClick={() => setShowTasks(true)}
                        >
                          Tasks Finalizadas{" "}
                          <Badge bg="secondary">
                            {user.tasksFinalizadas.length}
                          </Badge>
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Offcanvas
              show={showTasks}
              onHide={() => setShowTasks(false)}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Tasks Finalizadas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ListGroup>
                  {user.tasksFinalizadas
                    .map((task, index) => {
                      return (
                        <ListGroup.Item>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteTask(index)}
                          >
                            x
                          </Button>{" "}
                          {task}
                        </ListGroup.Item>
                      );
                    })
                    .reverse()}
                </ListGroup>
              </Offcanvas.Body>
            </Offcanvas>
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

export default BaseModeloDetailsPage;
