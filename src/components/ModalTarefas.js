import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { periodicity, week, handleMultiple } from "../const.js";
import CheckboxList from "./CheckboxList";

const members = [
  { name: "Arash", id: 1 },
  { name: "Anderson", id: 2 },
  { name: "Michela", id: 3 },
  { name: "Gabriel", id: 4 },
];

function ModalCreateUser({ show, setShow }) {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    priority: "1",
    periodicity: "",
    periodicityDetails: [],
    description: "",
    members: [],
  });

  function handleClose() {
    setShow(false);
  }

  function handleSubmit() {}

  function handleChange({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  function handleCheckbox(name, value) {
    handleChange({ target: { name, value } });
  }

  function handleMember(member) {
    let exists = form.members.find((item) => item === member);
    let result;

    if (exists) {
      result = form.members.filter((item) => item !== member);
    } else {
      result = [...form.members, member];
    }

    handleChange({ target: { name: "members", value: result } });
  }

  function removeMember(member) {
    handleChange({
      target: {
        name: "members",
        value: form.members.filter((item) => item !== member),
      },
    });
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Formulário de criação de tarefas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* FORMULÁRIO */}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="priority">Prioridade</Form.Label>
                  <Form.Select
                    id="priority"
                    name="priority"
                    aria-label="prioridade"
                    value={form.priority}
                    onChange={handleChange}>
                    <option value="0">Baixo</option>
                    <option value="1">Médio</option>
                    <option value="2">Alto</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Periodicidade</Form.Label>
                  <Row>
                    <Col>
                      <CheckboxList
                        updateParent={handleCheckbox}
                        options={{
                          name: "periodicity",
                          type: "radio",
                          list: periodicity,
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {form.periodicity === "weekly" && (
                      <Col>
                        <CheckboxList
                          updateParent={handleCheckbox}
                          options={{
                            name: "periodicityDetails",
                            type: "checkbox",
                            list: week,
                          }}
                        />
                      </Col>
                    )}
                    {form.periodicity === "monthly" && (
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="nome">Dia</Form.Label>
                          <Form.Control
                            type="number"
                            name="periodicityDetails"
                            placeholder="Dia do mês"
                            value={
                              typeof form.periodicityDetails === "string"
                                ? form.periodicityDetails
                                : "1"
                            }
                            min="1"
                            max="31"
                            onChange={handleChange}
                            autoFocus
                          />
                        </Form.Group>
                      </Col>
                    )}
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nome">Nome da Tarefa</Form.Label>
                  <Form.Control
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Insira o nome da tarefa"
                    value={form.nome}
                    required
                    onChange={handleChange}
                    autoFocus
                  />
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Dropdown>
                      <Dropdown.Toggle>Membros</Dropdown.Toggle>
                      <Dropdown.Menu>
                        {members.map((member) => (
                          <Dropdown.Item
                            value={member.id}
                            key={member.id}
                            onClick={() => handleMember(member)}>
                            {member.name} - {member.id}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <p>Selecionados:</p>
                  </Col>
                  <Col>
                    <h6>
                      {form.members.map((member) => (
                        <Badge key={member.id}>
                          {member.name} - {member.id}
                          <Badge onClick={() => removeMember(member)}>x</Badge>
                        </Badge>
                      ))}
                    </h6>
                  </Col>
                </Row>

                {/* <Form.Group as={Col} controlId="members_multiselect">
                  <Form.Label>Membros</Form.Label>

                  <Form.Control
                    as="select"
                    name="member"
                    multiple
                    value={form.member}
                    onChange={handleMultipleOptions}>
                    {members.map((member) => (
                      <option value={member.id} key={member.id}>
                        {member.name} - {member.id}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group> */}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="description">Descrição</Form.Label>
                  <Form.Control
                    id="description"
                    as="textarea"
                    name="description"
                    placeholder="Descreva a tarefa"
                    value={form.description}
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
                    min="0"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="departamento">Departamento</Form.Label>
                  <Form.Select
                    id="departamento"
                    name="departamento"
                    onChange={handleChange}>
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
                  <Form.Select
                    id="status"
                    name="status"
                    onChange={handleChange}>
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
                  <Form.Label htmlFor="dataAdmissao">
                    Data de Admissão
                  </Form.Label>
                  <Form.Control
                    id="dataAdmissao"
                    type="date"
                    name="dataAdmissao"
                    required
                    value={form.dataAdmissao}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    A data de admissão só pode ser cadastrada no maximo 30 dias
                    antes.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="foto">Adicione sua foto</Form.Label>
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
