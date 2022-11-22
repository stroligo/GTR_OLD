import TasksList from "../components/TasksList";
import TasksListHtml from "../components/TasksListHtml";
import { Col, Row, Container, Table } from "react-bootstrap";

export default function TaskUser() {

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
            <TasksList id={1}/>
        </Table>
        
      </Container>

      <Container>
        <Row>
          <Col>
            <h3>Tarefas do grupo</h3>
          </Col>
        </Row>
        <Table striped bordered hover>

          <TasksListHtml />
            <TasksList id={2}/>
        </Table>

        
      </Container>

    </div >

  );
}
