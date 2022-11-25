import axios from "axios";
import { useState } from "react";
import {
  Badge,
  Button,
  Modal,
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { toast } from "react-hot-toast";
import CheckboxList from "./CheckboxList";
import MembersCheckbox from "./MembersCheckbox.js";
import Tags from "./Tags.js";
import { periodicity, week, taskObject } from "./globalfns";

function ModalTarefas({
  show,
  setShow,
  formObj,
  reload,
  setReload,
  currentMembers,
  allMembers,
}) {
  const [members, setMembers] = useState(currentMembers);
  const [form, setForm] = useState({ ...taskObject, ...formObj });
  const [validated] = useState(false);
  const [showRepeticao, setShowRepeticao] = useState(false);

  function handleClose() {
    setShow(false);
  }

  function callRepeticao() {
    handleClose();
    setShowRepeticao(true);
  }

  function handleRepeticao() {
    setShowRepeticao(false);
  }

  /* CRUD */
  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowRepeticao(false);
    if (formObj && Object.keys(formObj).length) handlePut();
    else handlePost();
  }

  async function handlePost() {
    let clone = { ...form };
    try {
      await axios.post("https://ironrest.cyclic.app/gtr_task/", clone);
      toast.success("Tarega criada com sucesso! :D");
      setReload(!reload);
    } catch (error) {
      setShow(true);
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
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
    } catch (error) {
      setShow(true);
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

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <FloatingLabel
              controlId="nome"
              label="Nome da tarefa"
              className="flex-grow-1"
            >
              <Form.Control
                type="text"
                id="nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                autoFocus
              />
            </FloatingLabel>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group className="">
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
                <MembersCheckbox
                  update={updateMember}
                  allMembers={allMembers}
                  selected={members}
                />
                {members.map((member) => (
                  <Badge key={member._id} className="tags">
                    {member.nome}
                  </Badge>
                ))}
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <Form.Group className="">
                  <Form.Label htmlFor="prioridade">Prioridade</Form.Label>
                  <Form.Select
                    id="prioridade"
                    name="prioridade"
                    aria-label="prioridade"
                    value={form.prioridade}
                    onChange={handleChange}
                  >
                    <option value="Baixo">Baixo</option>
                    <option value="Médio">Médio</option>
                    <option value="Alto">Alto</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="">
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
              <Col xs={6}>
                <Form.Label htmlFor="tags">Tags</Form.Label>
                <Tags update={updateTags} selected={form.tags} />
              </Col>
            </Row>

            <Row>
              <Col xs={3}>
                <Form.Group className="">
                  <Form.Label htmlFor="tempoestimado">
                    Tempo estimado
                  </Form.Label>
                  <Form.Control
                    type="time"
                    id="tempoestimado"
                    name="tempoestimado"
                    value={form.tempoestimado}
                    onChange={handleChange}
                    min="00:00"
                    max="08:00"
                    placeholder="Tempo estimado para concluir a tarefa"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="">
                  <Form.Label htmlFor="prazoFinal">Prazo Final</Form.Label>
                  <Form.Control
                    type="date"
                    id="prazoFinal"
                    name="prazoFinal"
                    value={form.prazoFinal}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    A data do prazo final não pode uma pretérita.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6} className="modal-botoes">
                {Object.keys(formObj).length ? (
                  <>
                    <Button variant="outline-danger" onClick={handleDelete}>
                      Excluir tarefa
                    </Button>
                    <Button variant="primary" onClick={callRepeticao}>
                      Salvar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button variant="primary" onClick={callRepeticao}>
                      Adicionar tarefa
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Modal.Body>
        </Form>
      </Modal>

      {/* MODAL REPETIÇÕES */}
      <Modal show={showRepeticao} onHide={handleRepeticao} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Repetições</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Quantidade de vezes que essa tarefa será repetida.</p>
          <Form.Group className="">
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
                  <Form.Group as={Row} className="">
                    <Form.Label column sm="2" htmlFor="detalhesPeriodicidade">
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Concluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalTarefas;
