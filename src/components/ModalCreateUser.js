import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ModalCreateUser({ reload, setReload }) {
  const [validated, setValidated] = useState(false);
  const current = new Date();
  const min = new Date();
  const max = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  min.setFullYear(min.getFullYear() - 80); //so podem ser cadastrado servidores com menos de 80 anos
  max.setDate(current.getDate() + 30); //só podem se cadastrados servidores com no maximo 30 dias de antecedencia
  const dateMin = `${min.getFullYear()}-${min.getMonth() + 1}-${min.getDate()}`;
  const dateMax = `${max.getFullYear()}-${max.getMonth() + 1}-${max.getDate()}`;
  const [show, setShow] = useState(false);
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        await axios.post("https://ironrest.cyclic.app/gtr_user", form);
        handleClose(); // fechar o modal
        setForm({
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
        toast.success("Funcionário criado com sucesso! :D");
        setReload(!reload);
        setValidated(false);
      } catch (error) {
        console.log(error);
        toast.error("Algo deu errado. Tente novamente.");
      }
  }

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        + Inserir Novo Servidor
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Formulário de criação - Hoje é {date}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* FORMULÁRIO */}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="admissao">Admissão</Form.Label>
                  <Form.Control
                    id="admissao"
                    type="date"
                    min={dateMin}
                    max={dateMax}
                    name="admissao"
                    required
                    value={form.admissao}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    A data de admissão só pode ser cadastrada no maximo 30 dias
                    antes.
                  </Form.Control.Feedback>
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
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nome">Nome do Servidor</Form.Label>
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
                  <Form.Label htmlFor="telefone">Número de Telefone</Form.Label>
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
                  <Form.Label htmlFor="departamento">Departamento</Form.Label>
                  <Form.Select
                    id="departamento"
                    name="departamento"
                    onChange={handleChange}
                  >
                    <option>Selecione uma opção</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="RecurosHumanos">Recursos Humanos</option>
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
                  <Form.Label htmlFor="habilidades">Habilidades</Form.Label>
                  <Form.Select
                    id="habilidades"
                    name="habilidades"
                    onChange={handleChange}
                  >
                    <option>Selecione uma opção</option>
                    <option value="relatorios">Relatórios</option>
                    <option value="planilhas">Planilhas</option>
                    <option value="dashboards">Dashboards</option>
                    <option value="comunicacao">Comunicação</option>
                    <option value="programacao">Programação</option>
                    <option value="planejamento">Planejamento</option>
                    <option value="indicadores">Indicadores</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar Servidor
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCreateUser;
