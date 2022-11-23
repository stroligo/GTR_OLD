import axios from "axios";
import { useState } from "react";
import { Badge, Button, Modal, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import CheckboxList from "./CheckboxList";
import MembersCheckbox from "./MembersCheckbox.js";
import Tags from "./Tags.js";
import { periodicity, week, taskObject } from "../const.js";

function ModalTarefas({
  show,
  setShow,
  formObj,
  reload,
  setReload,
  currentMembers,
  allMembers,
  edit
}) {
  const [members, setMembers] = useState(currentMembers);
  const [form, setForm] = useState({ ...taskObject, ...formObj });
  const [validated] = useState(false);



  function handleClose() {
    setShow(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleChange({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  function handleCheckbox(name, value) {
    handleChange({ target: { name, value } });
  }

  function updateTags(tags) {
    handleChange({ target: { name: "tags", value: tags } });
  }

  function updateMember(selected) {
    setMembers(selected);
    handleChange({
      target: {
        name: "membros",
        value: selected.map((item) => "" + item.matricula),
      },
    });
  }

  async function handlePost() {
    let clone = { ...form };
    try {
      await axios.post("https://ironrest.cyclic.app/gtr_task/", clone);
      toast.success("Tarega criada com sucesso! :D");
      setReload(!reload);
      handleClose(); // fechar o modal
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  function obrigatorio() {
  
    if (edit === "rejeitada")
      return (
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="observacao">Observação</Form.Label>
              <Form.Control
                id="observacao"
                as="textarea"
                name="observacao"
                placeholder="Escreva a observação"
                value={form.observacao}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
      )
    else return (
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="observacao">Observação</Form.Label>
            <Form.Control
              id="observacao"
              as="textarea"
              name="observacao"
              placeholder="Escreva a observação"
              value={form.observacao}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
    )

  }


  async function handlePut() {
    try {
      const clone = { ...form };
      delete clone._id;

      await axios.put(
        `https://ironrest.cyclic.app/gtr_task/${form._id}`,
        clone
      );

      toast.success("Alterações salvas");
      setReload(!reload);
      setShow(false);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  async function handleDelete(e) {
    try {
      await axios.delete(`https://ironrest.cyclic.app/gtr_task/${form._id}`);
      toast.success("Tarefa deletada com sucesso");
      setReload(!reload);
      setShow(false);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado ao deletar essa tarefa.");
    }
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
                        selected={form.periodicidade}
                        options={{
                          name: "periodicidade",
                          type: "radio",
                          list: periodicity,
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {form.periodicidade === "semanal" && (
                      <Col>
                        <CheckboxList
                          updateParent={handleCheckbox}
                          selected={form.detalhesPeriodicidade}
                          options={{
                            name: "detalhesPeriodicidade",
                            type: "checkbox",
                            list: week,
                          }}
                        />
                      </Col>
                    )}
                    {form.periodicidade === "mensal" && (
                      <Col>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label
                            column
                            sm="2"
                            htmlFor="detalhesPeriodicidade">
                            Dia
                          </Form.Label>
                          <Col sm="10">
                            <Form.Control
                              type="number"
                              id="detalhesPeriodicidade"
                              name="detalhesPeriodicidade"
                              placeholder="Dia do mês"
                              value={
                                typeof form.detalhesPeriodicidade === "string"
                                  ? form.detalhesPeriodicidade
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
                <MembersCheckbox
                  update={updateMember}
                  allMembers={allMembers}
                  selected={members}
                />
                {members.map((member) => (
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
                <Tags update={updateTags} selected={form.tags} />
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
            {obrigatorio()}
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
          {!Object.keys(formObj).length ? (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handlePost}>
                Adicionar tarefa
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-danger" onClick={handleDelete}>
                Excluir tarefa
              </Button>
              <Button variant="primary" onClick={handlePut}>
                Salvar
              </Button>
            </>
          )}
        </Modal.Footer>

      </Modal>
    </div>
  );
}

export default ModalTarefas;