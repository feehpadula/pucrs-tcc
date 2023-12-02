import { useParams } from "react-router";
import { useGet } from "../hooks/useGet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../components/Card";
import HorizontalList from "../components/HorizontalList";
import Tags from "../components/Tags";
import Pagination from "../components/Pagination";
import "./Search.scss";

function Search() {
  let [hasPrevPage, hasNextPage] = [false, false];

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
    url: `/items/search/${params.name}/${params.page ? params.page : 0}`,
  });
  /* eslint-disable */

  hasPrevPage = params.page && params.page > 0 ? true : false;
  hasNextPage = !itemsIsLoading && items.length > 10 ? true : false;

  const mapItems = items && items.slice(0, 10);

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
          <Row>
            <Col>
              <Card title={`Pesquisa: ${params.name}`}>
                {mapItems && mapItems.length ? (
                  mapItems.map((item) => (
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
                  ))
                ) : (
                  <span>Nenhum resultado encontrado</span>
                )}
              </Card>
            </Col>
          </Row>
          <Row className="pt-30">
            <Col>
              <Pagination
                hasPrevPage={hasPrevPage}
                hasNextPage={hasNextPage}
                curPageNumber={params.page}
                curPageUrl={`/search/${params.name}/`}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
