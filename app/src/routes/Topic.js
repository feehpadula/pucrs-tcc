import { useParams } from "react-router";
import { useGet } from "../hooks/useGet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../components/Card";
import HorizontalList from "../components/HorizontalList";
import Tags from "../components/Tags";
import "./Topic.scss";

function Topic() {
  /* eslint-disable */
  const {
    data: topics,
    isLoading: topicsIsLoading,
    error: topicsError,
  } = useGet({
    method: "get",
    url: "/topics",
  });
  /* eslint-disable */

  const params = useParams();

  /* eslint-disable */
  const {
    data: items,
    isLoading: itemsIsLoading,
    error: itemsError,
  } = useGet({
    method: "get",
    url: `/topics/${params.id}`,
  });
  /* eslint-disable */

  return (
    <Container>
      <Row>
        <Col xxl={4} xl={4}>
          <Card title="Tópicos">
            {topics &&
              topics.map((topic) => (
                <a
                  key={topic.id}
                  href={`/topic/${topic.id}`}
                  className={
                    parseInt(params.id) === parseInt(topic.id) ? "selected" : undefined
                  }
                >
                  {topic.name}
                </a>
              ))}
          </Card>
        </Col>
        <Col xxl={8} xl={8} className="pt-lg-30">
          <Card
            title={
              topics &&
              topics
                .filter((topic) => parseInt(topic.id) === parseInt(params.id))
                .map((topic) => topic.name)
            }
          >
            {items &&
              items.map((item) => (
                <HorizontalList key={item.id}>
                  <a href={`/data/${params.id}/${item.id}`}>{item.name}</a>
                  <Tags
                    tags={[
                      item.contributions,
                      item.lastUpdate !== null &&
                        new Date(item.lastUpdate).toLocaleDateString("pt-br"),
                    ]}
                  />
                </HorizontalList>
              ))}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Topic;
