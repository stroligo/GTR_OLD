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
  Offcanvas,
  ListGroup,
} from "react-bootstrap";

function BaseModeloDetailsPage() {
  const [validated, setValidated] = useState();
  const { userID } = useParams(); //mesmo nome do parametro de ROTA (app.js)
  const navigate = useNavigate(); // instanciar o useNavigate()

  const [user, setUser] = useState({}); //informações do user que veio da minha API
  const [showEdit, setShowEdit] = useState(false); //controlar a visualização form // true -> form aparece

  const [form, setForm] = useState({
    matricula: "",
    nome: "",
    foto: "",
    email: "",
    telefone: "",
    fusoHorario: "",
    departamento: "",
    cargo: "",
    status: "",
    jornada: "",
    habilidades: [],
  });

  const habilidade = [
    "Relatórios",
    "Planilhas",
    "Dashboards",
    "Comunicação",
    "Programação",
    "Planejamento",
    "Indicadores",
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  console.log("pagdetalhe");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/findOne/gtr_user?_id=${userID}`
        );
        console.log(response);
        setUser(response.data);
        setForm(response.data);
        setValidated(false);
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
      await axios.delete(`https://ironrest.cyclic.app/gtr_user/${userID}`);
      //agora que o usuário está deletado
      //redirecionaremos ele para modelo
      navigate("/modelo");
      toast.success("Funcionário deletado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado ao deletar esse usuário.");
    }
  }

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
          `https://ironrest.cyclic.app/gtr_user/${userID}`,
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

  async function handlehabilidade(e) {
    //console.log(e.target.checked); -> está clicado ou não
    //console.log(e.target.name); -> qual o nome da tech
    // toda vez que o checkbox é alterado, enviamos essa alteração pra API
    try {
      const clone = { ...user };
      delete clone._id;

      // let newuser = filter: clone = clone.filter( el => el !== e.target.name);

      if (e.target.checked === true) {
        clone.habilidade.push(e.target.name);
      }

      if (e.target.checked === false) {
        const index = clone.habilidade.indexOf(e.target.name); //acho o index do elemento que eu cliquei
        clone.habilidade.splice(index, 1); //retiro o elemento da array
      }

      await axios.put(`https://ironrest.cyclic.app/gtr_user/${userID}`, clone);
      setReload(!reload);
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
            {/* Card User */}
            {showEdit === false && (
              <Card className="text-center" bg="light">
                <Card.Header>
                  <Card.Title>{user.nome}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Matrícula: {user.matricula}
                  </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>Email</Card.Title>
                      <Card.Text>{user.email}</Card.Text>

                      <Card.Title>Cargo</Card.Title>
                      <Card.Text>{user.cargo}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Title>Telefone</Card.Title>
                      <Card.Text>{user.telefone}</Card.Text>

                      <Card.Title>Departamento</Card.Title>
                      <Card.Text>{user.departamento}</Card.Text>
                    </Col>
                    <Col className="col-3">
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
                  {/* FORMULÁRIO */}
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="nome">
                            Nome do Servidor
                          </Form.Label>
                          <Form.Control
                            id="nome"
                            type="text"
                            placeholder="Insira o nome completo do servidor"
                            name="nome"
                            value={form.nome}
                            required
                            onChange={handleChange}
                            autoFocus
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="matricula">Matrícula</Form.Label>
                          <Form.Control
                            id="matricula"
                            type="text"
                            placeholder="Insira matrícula do servidor"
                            name="matricula"
                            value={form.matricula}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="telefone">
                            Número de Telefone
                          </Form.Label>
                          <Form.Control
                            id="telefone"
                            type="telefone"
                            placeholder="Insira o telefone do servidor"
                            name="telefone"
                            value={form.telefone}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="email">Email</Form.Label>
                          <Form.Control
                            id="email"
                            type="email"
                            placeholder="Insira o email do servidor"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="cargo">Cargo</Form.Label>
                          <Form.Control
                            id="cargo"
                            type="text"
                            placeholder="Insira o cargo do servidor"
                            name="cargo"
                            value={form.cargo}
                            required
                            onChange={handleChange}
                            autoFocus
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="departamento">
                            Departamento
                          </Form.Label>
                          <Form.Select
                            id="departamento"
                            name="departamento"
                            onChange={handleChange}
                          >
                            <option>Selecione uma opção</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="RecurosHumanos">
                              Recursos Humanos
                            </option>
                            <option value="Ouvidoria">Ouvidoria</option>
                            <option value="informática">
                              Tecnologia da Informação
                            </option>
                            <option value="licitações">Licitações</option>
                            <option value="comunicacao">Comunicação</option>
                            <option value="areaTecnica">Área Técnica</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="status">Status</Form.Label>
                          <Form.Select
                            id="status"
                            name="status"
                            onChange={handleChange}
                          >
                            <option>Selecione uma opção</option>
                            <option value="Ativo">Ativo</option>
                            <option value="Férias">Férias</option>
                            <option value="Licença">Licença</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="jornada">Jornada</Form.Label>
                          <Form.Control
                            id="jornada"
                            type="number"
                            placeholder="Insira jornada do servidor"
                            name="jornada"
                            value={form.jornada}
                            min="0"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="fusoHorario">
                            Fuso Horário
                          </Form.Label>
                          <Form.Control
                            id="fusoHorario"
                            type="number"
                            placeholder="Insira fuso horário"
                            name="fusoHorario"
                            value={form.fusoHorario}
                            min="0"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label htmlFor="foto">Adicione foto</Form.Label>
                          <Form.Control
                            id="foto"
                            type="url"
                            placeholder="Insira a url da foto de perfil"
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
                  </Row>
                </Card.Footer>
              </Card>
            )}

            <Row className="mt-3">
              <Col className="col-md-3">
                <Card bg="light">
                  <Card.Header>
                    <Card.Title>Habilidades</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {habilidade.map((tech, index) => {
                      return (
                        <Form.Group
                          htmlFor={tech}
                          className="mb-3"
                          key={`${index} - ${tech}`}
                        >
                          <Form.Check
                            id={tech}
                            type="checkbox"
                            label={tech}
                            name={tech}
                            onChange={handlehabilidade}
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
                    <Card.Title>Disponibilidade</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group htmlFor="jornada" className="mb-3">
                      <Form.Label htmlFor="jornada">Jornada</Form.Label>
                      <Form.Control
                        id="jornada"
                        type="number"
                        placeholder="Insira jornada do servidor"
                        name="jornada"
                        value={form.jornada}
                        min="0"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="fusoHorario">
                        Fuso Horário
                      </Form.Label>
                      <Form.Control
                        id="fusoHorario"
                        type="number"
                        placeholder="Insira fuso horário"
                        name="fusoHorario"
                        value={form.fusoHorario}
                        min="0"
                        onChange={handleChange}
                      />
                    </Form.Group>
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
                <ListGroup></ListGroup>
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
