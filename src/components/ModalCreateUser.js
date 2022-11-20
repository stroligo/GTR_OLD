import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function ModalCreateUser({ reload, setReload }) {
  const [validated, setValidated] = useState(false);
  const current = new Date();
  const min = new Date();
  const max = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  min.setFullYear(min.getFullYear()-80) //so podem ser cadastrado servidores com menos de 80 anos
  max.setDate(current.getDate()+30) //só podem se cadastrados servidores com no maximo 30 dias de antecedencia
  const dateMin = `${min.getFullYear()}-${min.getMonth() + 1}-${min.getDate()}`;
  const dateMax = `${max.getFullYear()}-${max.getMonth() + 1}-${max.getDate()}`;
  const [show, setShow] = useState(false);
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
    progresso: "0",
    foto: "",
    cargo: "",
    tasksFinalizadas: [],
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setValidated(true);
    if ([...document.querySelectorAll("input")].map(element =>  element.checkValidity()).reduce((result, element) => result * element))
    try {
      await axios.post("https://ironrest.herokuapp.com/enap92", form);
      handleClose(); // fechar o modal
      setForm({
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
        tasksFinalizadas: [],
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
        + Criar um novo Funcionário
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
                  <Form.Label htmlFor="nome">Nome do Funcionário</Form.Label>
                  <Form.Control
                    id="nome"
                    type="text"
                    placeholder="Insira o nome completo do funcionário"
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
                  <Form.Label htmlFor="cargo">Cargo</Form.Label>
                  <Form.Control
                    id="cargo"
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
                  <Form.Label htmlFor="tel">Numero de Telefone</Form.Label>
                  <Form.Control
                    id="tel"
                    type="tel"
                    placeholder="Insira o telefone do funcionário"
                    name="tel"
                    value={form.tel}
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
                    placeholder="Insira o email do funcionário"
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
                  <Form.Label htmlFor="salario">Salário</Form.Label>
                  <Form.Control
                    id="salario"
                    type="number"
                    placeholder="Insira o valor do salário R$"
                    name="salario"
                    value={form.salario}
                    min = "0"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="departamento">Departamento</Form.Label>
                  <Form.Select id="departamento" name="departamento" onChange={handleChange}>
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
                  <Form.Label htmlFor="status">Status</Form.Label>
                  <Form.Select id="status" name="status" onChange={handleChange}>
                    <option>Selecione uma opção</option>
                    <option value="Disponível">Disponível</option>
                    <option value="Alocado">Alocado</option>
                    <option value="De Férias">De Férias</option>
                    <option value="De Licença">De Licença</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="dataAdmissao">Data de Admissão</Form.Label>
                  <Form.Control
                    id="dataAdmissao"
                    type="date"
                    min={dateMin}
                    max={dateMax}
                    name="dataAdmissao"
                    required
                    value={form.dataAdmissao}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="foto" >Adicione sua foto</Form.Label>
                  <Form.Control
                    id="foto"
                    type="url"
                    placeholder="Insira a url da sua foto de perfil"
                    name="foto"
                    value={form.foto}
                    onChange={handleChange}
                  />
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
            Salvar Funcionário
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCreateUser;
