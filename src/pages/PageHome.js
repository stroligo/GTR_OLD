import { Container, Card, Row, Col } from "react-bootstrap";
import img1 from "../assets/image1.png";

function PageHome() {
  return (
    <div>
      <section className="mb-4">
        <h1 className="text-4xl font-bold underline">TailWind Instalado</h1>

        <h4 className="mb-4">
          A cada dia o trabalho remoto se torna mais comum, graças aos avanços
          da tecnologia.
        </h4>
        <p className="mb-4">
          <img src={img1} alt="Img1" className="img-home" />
          Porém, embora a opção de trabalhar a partir de casa seja um grande
          benefício, é importante que você e a sua equipe tenham a ferramenta de
          software adequada para assegurar que os objetivos da empresa serão
          atingidos. Isto se faz especialmente necessário quando nós falamos do
          trabalho em múltiplos projetos, que envolvem diferentes partes
          interessadas. Trabalhar a partir de casa pode fazer com que seja mais
          difícil manter todos cientes, organizados e engajados no que precisa
          ser feito.
        </p>
        <h5 className="mb-4">
          Com o GTR você poderá realizar tudo isso e ter toda a gestão dos seus
          projetos em desenvolvimento à distancia de alguns cliques!
        </h5>
        <p className="mb-4">
          Isto significa que mesmo que esteja gerenciando suas equipes de forma
          remota, você poderá saber quais tarefas estão sendo atribuídas a quem,
          qual tempo está sendo gasto para serem iniciadas e finalizadas, entre
          muitas outras informações que vão facilitar a sua vida e garantir a
          saúde da sua empresa.
        </p>
      </section>
      <section>
        <h4 className="mb-4">
          5 razões para gerenciar funcionários que trabalham em casa{" "}
        </h4>
        <h6 className="mb-4">
          Se você confia em seus funcionários, pode relutar em monitorar suas
          atividades. Mas o gerenciamento do trabalho remoto tem uma variedade
          de efeitos positivos!
        </h6>
        <Container className="area-cards">
          <Card className="" bg="light">
            <Card.Header>
              <Row>
                <Col xs={12} className="left">
                  <h6>1. Manter os funcionários na tarefa</h6>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <Card.Text className="mb-2 text-muted">
                    Quando os funcionários sabem que estão sendo monitorados,
                    eles tendem a ser mais produtivos! Isso acontece devido à um
                    componente psicológico chamado de Efeito Hawthorne, que diz
                    que as pessoas modificam seu comportamento em resposta à
                    consciência de serem observadas.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="" bg="light">
            <Card.Header>
              <Row>
                <Col xs={12} className="left">
                  <h6>2. Manter os funcionários responsáveis</h6>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <Card.Text className="mb-2 text-muted">
                    Essa é uma forma de responsabilizar os funcionários por suas
                    ações. Se eles alegarem que não tiveram tempo suficiente
                    para terminar um projeto, você pode verificar qual era sua
                    carga de trabalho e demandas no momento.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="" bg="light">
            <Card.Header>
              <Row>
                <Col xs={12} className="left">
                  <h6>3. Premiar desempenhos excepcionais </h6>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <Card.Text className="mb-2 text-muted">
                    O gerenciamento de funcionários não se resume a punir as
                    pessoas por não fazerem seu trabalho de maneira eficiente ou
                    produtiva. Trata-se também de recompensar os funcionários
                    que oferecem desempenhos excepcionais!
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="" bg="light">
            <Card.Header>
              <Row>
                <Col xs={12} className="left">
                  <h6>4. Balanceamento de cargas de trabalho </h6>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <Card.Text className="mb-2 text-muted">
                    Não importa o quanto você tente evitar, muitas vezes as
                    equipes podem acabar com incumbências sendo distribuídos de
                    forma desigual. O gerenciamento de funcionários ajuda a
                    identificar as fontes de desequilíbrio e redistribuir as
                    cargas de trabalho de forma justa e adequada.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="" bg="light">
            <Card.Header>
              <Row>
                <Col xs={12} className="left">
                  <h6>5. Planejamento estratégico </h6>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <Card.Text className="mb-2 text-muted">
                    O monitoramento de desempenho também é bom para calcular o
                    retorno sobre o investimento para vários projetos e fornecer
                    insights para outros modos de planejamento estratégico. Por
                    exemplo, você pode calcular com precisão os custos reais de
                    um determinado projeto com base no tempo gasto pela sua
                    equipe para executá-lo.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );
}

export default PageHome;
