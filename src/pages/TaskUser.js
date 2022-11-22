import TasksList from "../components/TasksList";
import TasksListHtml from "../components/TasksListHtml";
import { useParams } from "react-router-dom";
import { Col, Row, Container, Table } from "react-bootstrap";


export default function TaskUser() {
  const { matricula } = useParams(); //mesmo nome do parametro de ROTA (app.js)

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h3>Tarefas atribuídas</h3>
          </Col>
        </Row>
        <Table striped bordered hover>

          <TasksListHtml />
            <TasksList/>
        </Table>
      </Container>

    </div >

  );
}
