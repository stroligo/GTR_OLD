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
import MembersCheckbox from "./MembersCheckbox.js";
import Tags from "./Tags.js";
import { taskObject } from "./globalfns";

function ModalTarefasUsers({
  show,
  setShow,
  formObj,
  reload,
  setReload,
  currentMembers,
  allMembers,
  edit,
  atribuir,
}) {
  const [members, setMembers] = useState(currentMembers);
  const [form, setForm] = useState({ ...taskObject, ...formObj });
  const [validated] = useState(false);

  function handleClose() {
    setShow(false);
  }

  /* CRUD */
  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if (formObj && Object.keys(formObj).length) handlePut();
    else handlePost();
    handleClose();
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

  function handleChange({ target }) {
    setForm({ ...form, [target.name]: target.value });
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
      );
    else
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
              />
            </Form.Group>
          </Col>
        </Row>
      );
  }

  function selecionar() {
    if (atribuir) {
      return [allMembers.find((element) => element.matricula === atribuir)];
    }

    return allMembers;
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <FloatingLabel
              htmlFor="nome"
              label="Nome da tarefa"
              className="flex-grow-1">
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
                <MembersCheckbox
                  update={updateMember}
                  allMembers={selecionar()}
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
                <Form.Label htmlFor="tags">Tags</Form.Label>
                <Tags update={updateTags} selected={form.tags} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
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
                    placeholder="Tempo estimado para concluir a tarefa"></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
        </Form>

        <Modal.Footer>
          {Object.keys(formObj).length ? (
            <>
              <Button variant="primary" onClick={handleSubmit}>
                Salvar
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Concluir Tarefa
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Adicionar tarefa
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalTarefasUsers;
