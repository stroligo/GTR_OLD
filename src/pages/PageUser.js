import {
  Table,
  Container,
  FloatingLabel,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCreateUser from "../components/ModalCreateUser";
import { Link } from "react-router-dom";

function PageUser() {
  const [users, setUsers] = useState([]);

  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get("https://ironrest.cyclic.app/gtr_user");
      setUsers(response.data);
    }

    fetchUsers();
    console.log("Dentro do useEffect da home!!");
  }, [reload]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <section>
      <Container>
        <Row>
          <Col xs={8} className="left">
            <h4>Cadastro de Usuários</h4>
          </Col>
          <Col xs={4} className="right">
            <ModalCreateUser reload={reload} setReload={setReload} />
          </Col>
        </Row>

        <FloatingLabel
          controlId="floatingInput"
          label="Pesquise por nome ou setor "
          className="my-3"
        >
          <Form.Control
            type="text"
            placeholder="pesquise"
            value={search}
            onChange={handleSearch}
          />
        </FloatingLabel>
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>Usuario cadastrado</th>
              <th>Setor</th>
              <th>Status</th>
              <th colSpan={4}></th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => {
                return (
                  user.nome.toLowerCase().includes(search.toLowerCase()) ||
                  user.departamento
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  user.cargo.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((user) => {
                return (
                  <tr key={user._id}>
                    <td>
                      <b> {user.nome}</b> ({user.matricula})
                    </td>
                    <td>{user.departamento}</td>
                    <td>{user.status}</td>
                    <td className="center">
                      <Link to={`/user/${user._id}`}>Ver detalhes</Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </section>
  );
}

export default PageUser;
