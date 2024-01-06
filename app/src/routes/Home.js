import { useGet } from "../hooks/useGet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../components/Card";
import HorizontalList from "../components/HorizontalList";
import Tags from "../components/Tags";
import "./Home.scss";

function Home() {
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

  /* eslint-disable */
  const {
    data: trending,
    isLoading: trendingIsLoading,
    error: trendingError,
  } = useGet({
    method: "get",
    url: "/items/trending",
  });
  /* eslint-disable */

  /* eslint-disable */
  const {
    data: latest,
    isLoading: latestIsLoading,
    error: latestError,
  } = useGet({
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
                {trending &&
                  trending.map((item) => (
                    <HorizontalList key={item.id}>
                      <a href={`/data/${item.topicId}/${item.id}`}>{item.name}</a>
                      <Tags tags={[item.totalContributions, item.lastUpdate]} />
                    </HorizontalList>
                  ))}
              </Card>
            </Col>
          </Row>
          <Row className="pt-30">
            <Col>
              <Card title="Novos">
                {latest &&
                  latest.map((item) => (
                    <HorizontalList key={item.id}>
                      <a href={`/data/${item.topicId}/${item.id}`}>{item.name}</a>
                      <Tags
                        tags={[
                          item.totalContributions,
                          item.lastUpdate !== null && item.lastUpdate,
                        ]}
                      />
                    </HorizontalList>
                  ))}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
