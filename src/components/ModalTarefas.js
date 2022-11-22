import { useState } from "react";

import { Button, Modal, Row, Col, Form, Badge } from "react-bootstrap";
import { periodicity, week, taskObject } from "../const.js";
import CheckboxList from "./CheckboxList";
import MembersCheckbox from "./MembersCheckbox.js";
import Tags from "./Tags.js";

// import toast from "react-hot-toast";

function ModalCreateUser({ show, setShow }) {
  const [form, setForm] = useState(taskObject);
  const [validated, setValidated] = useState(false);

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

  function updateTags(tags) {}

  function updateMember(selected) {
    handleChange({ target: { name: "membros", value: selected } });
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
                  <Form.Label htmlFor="prioridade">Prioridade</Form.Label>
                  <Form.Select
                    id="prioridade"
                    name="prioridade"
                    aria-label="prioridade"
                    value={form.prioridade}
                    onChange={handleChange}>
                    <option value="Baixo">Baixo</option>
                    <option value="Médio">Médio</option>
                    <option value="Alto">Alto</option>
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
                          name: "periodicidade",
                          type: "radio",
                          list: periodicity,
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {form.periodicidade === "weekly" && (
                      <Col>
                        <CheckboxList
                          updateParent={handleCheckbox}
                          options={{
                            name: "perioDetalhes",
                            type: "checkbox",
                            list: week,
                          }}
                        />
                      </Col>
                    )}
                    {form.periodicidade === "monthly" && (
                      <Col>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm="2" htmlFor="perioDetalhes">
                            Dia
                          </Form.Label>
                          <Col sm="10">
                            <Form.Control
                              type="number"
                              id="perioDetalhes"
                              name="perioDetalhes"
                              placeholder="Dia do mês"
                              value={
                                typeof form.perioDetalhes === "string"
                                  ? form.perioDetalhes
                                  : "1"
                              }
                              min="1"
                              max="31"
                              onChange={handleChange}
                              autoFocus
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    )}
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <MembersCheckbox update={updateMember} />
                {form.membros.map((member) => (
                  <Badge key={member._id} bg="secondary">
                    {member.nome}
                  </Badge>
                ))}
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
                <Form.Label htmlFor="tags">Tags</Form.Label>
                <Tags update={updateTags} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="descrição">Descrição</Form.Label>
                  <Form.Control
                    id="descrição"
                    as="textarea"
                    name="descrição"
                    placeholder="Descreva a tarefa"
                    value={form.descrição}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="referencia">Referências</Form.Label>
                  <Form.Control
                    type="text"
                    id="Referencia"
                    name="Referencia"
                    value={form.Referencia}
                    placeholder="Insira uma referência"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="inicio">Início</Form.Label>
                  <Form.Control
                    type="date"
                    id="inicio"
                    name="inicio"
                    value={form.inicio}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="tempoestimado">
                    Minutos Estimados
                  </Form.Label>
                  <Form.Control
                    type="number"
                    id="tempoestimado"
                    name="tempoestimado"
                    value={form.tempoestimado}
                    onChange={handleChange}
                    min="5"
                    placeholder="Tempo em minutos para concluir a tarefa"></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="prazoFinal">Prazo Final</Form.Label>
                  <Form.Control
                    type="date"
                    id="prazoFinal"
                    name="prazoFinal"
                    value={form.prazoFinal}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    A data do prazo final não pode uma pretérita.
                  </Form.Control.Feedback>
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
            Adicionar tarefa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCreateUser;
