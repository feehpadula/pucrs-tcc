import { useApi } from "../hooks/useApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../components/Card";
import "./Home.scss";

function Home() {
  /* eslint-disable */
  const {
    data: topics,
    isLoading: topicsIsLoading,
    error: topicsError,
  } = useApi({
    method: "get",
    url: "/topics",
  });
  /* eslint-disable */

  /* eslint-disable */
  const {
    data: latest,
    isLoading: latestIsLoading,
    error: latestError,
  } = useApi({
    method: "get",
    url: "/items/latest",
  });
  /* eslint-disable */

  return (
    <Container>
      <Row>
        <Col xxl={4} xl={4}>
          <Card title="Tópicos">
            {topics &&
              topics.map((topic) => (
                <a key={topic.id} href={`/topic/${topic.id}`}>
                  {topic.name}
                </a>
              ))}
          </Card>
        </Col>
        <Col xxl={8} xl={8} className="pt-lg-30">
          <Row>
            <Col>
              <Card title="Tendências">
                <br />
              </Card>
              <Row className="pt-30">
                <Col md={7}>
                  <Card title="Novos">
                    {latest &&
                      latest.map((item) => (
                        <a key={item.id} href={`/data/${item.topicId}/${item.id}`}>
                          {item.name}
                        </a>
                      ))}
                  </Card>
                </Col>
                <Col md={5} className="pt-sm-30">
                  <Card title="Tags">
                    <br />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
