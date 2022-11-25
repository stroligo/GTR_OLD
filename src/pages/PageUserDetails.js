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
import Tags from "../components/Tags";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

function PageUserDetails() {
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
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/gtr_user/${userID}`
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

  function handleChange({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  function updateTags(tags) {
    handleChange({ target: { name: "habilidades", value: tags } });
  }

  /* 
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

  console.log(form);

  return (
    <section>
      <Container className="my-4">
        {isLoading === false && (
          <>
            <Button variant="voltar" onClick={() => navigate("/user")}>
              <BsFillArrowLeftSquareFill /> <span>voltar</span>
            </Button>
            {/* Card User */}
            {showEdit === false && (
              <Card className="text-center" bg="light">
                <Card.Header>
                  <Row>
                    <Col xs={10} className="left">
                      <h3>{user.nome}</h3>
                    </Col>
                    <Col xs={2} className="right">
                      <Button
                        variant="primary"
                        onClick={() => setShowEdit(true)}
                      >
                        Editar
                      </Button>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col xs={2}>
                      <Card.Text>
                        <Card.Img src={user.foto} alt={user.nome} />
                      </Card.Text>
                    </Col>
                    <Col xs={3}>
                      <Card.Text className="mb-2 text-muted">
                        <div>
                          <b>Matricula:</b> {user.matricula}
                        </div>
                        <div>
                          <b>Cargo:</b> {user.cargo}
                        </div>
                        <div>
                          <b>Setor:</b> {user.departamento}
                        </div>
                        <div>
                          <b>Horas: </b>
                          {user.jornada} hrs / mês
                        </div>
                      </Card.Text>
                    </Col>
                    <Col xs={3}>
                      <Card.Text className="mb-2 text-muted">
                        <div>
                          <b>Email:</b> {user.email}
                        </div>
                        <div>
                          <b>Telefone:</b> {user.telefone}
                        </div>
                      </Card.Text>
                    </Col>
                    <Col xs={3}>
                      <Card.Text className="mb-2 text-muted">
                        <div>
                          <b>Status:</b> {user.status}
                        </div>
                        <div>
                          <b>Habilidades:</b>
                          {user.habilidades}
                        </div>
                      </Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2}></Col>
                    <Col xs={10}></Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Row>
                    <Col></Col>
                    {/* <Col>
                      <Button variant="outline-danger" onClick={handleDelete}>
                        Excluir Funcionário
                      </Button>
                    </Col> */}
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
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="jornada">
                            Departamento
                          </Form.Label>
                          <Form.Control
                            id="departamento"
                            type="text"
                            placeholder="Insira departamento do servidor"
                            name="departamento"
                            value={form.departamento}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
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
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="tags">Habilidades</Form.Label>
                          <Tags
                            update={updateTags}
                            selected={form.habilidades}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Row>
                    <Col>
                      <Button variant="primary" onClick={handleSubmit}>
                        Salvar Alterações
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
    </section>
  );
}

export default PageUserDetails;
