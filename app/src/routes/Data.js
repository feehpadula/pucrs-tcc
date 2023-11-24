import { useParams } from "react-router";
import { useApi } from "../hooks/useApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../components/Card";
import HorizontalList from "../components/HorizontalList";
import VerticalList from "../components/VerticalList";
import Button from "../components/Button";
import Select from "../components/Select";
import Tags from "../components/Tags";
import Chart from "../components/Chart.tsx";
import { Plus, Share, Report } from "../assets/svg/icons";
import "./Data.scss";

function Data() {
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

  const params = useParams();

  /* eslint-disable */
  const {
    data: item,
    isLoading: itemIsLoading,
    error: itemError,
  } = useApi({
    method: "get",
    url: `/items/${params.id}`,
  });
  /* eslint-disable */

  /* eslint-disable */
  const {
    data: relatedItems,
    isLoading: relatedItemsIsLoading,
    error: relatedItemsError,
  } = useApi({
    method: "get",
    url: `/topics/${params.tid}/${params.id}/r`,
  });
  /* eslint-disable */

  /* eslint-disable */
  const {
    data: itemData,
    isLoading: itemDataIsLoading,
    error: itemDataError,
  } = useApi({
    method: "get",
    url: `/data/${params.id}`,
  });
  /* eslint-disable */

  return (
    <Container>
      <Row>
        <Col xxl={4} xl={4}>
          <Card title="Tópicos">
            {topics &&
              item &&
              topics.map((topic) => (
                <a
                  key={topic.id}
                  href={`/topic/${topic.id}`}
                  className={
                    parseInt(item[0].topicId) === parseInt(topic.id)
                      ? "selected"
                      : undefined
                  }
                >
                  {topic.name}
                </a>
              ))}
          </Card>
        </Col>
        <Col xxl={8} xl={8} className="pt-lg-30">
          <Row>
            <Col sm={12}>
              <HorizontalList>
                <div className="item-data-view">
                  <span>Local</span>
                  <Select></Select>
                </div>
                <div className="item-actions">
                  <Button title="Contribuir" icon={<Plus />}></Button>
                  <Button title="Compartilhar" icon={<Share />}></Button>
                  <Button title="Reportar" icon={<Report />}></Button>
                </div>
              </HorizontalList>
            </Col>
            <Col sm={12} className="pt-30">
              <Card title="Contribuir"></Card>
            </Col>
            <Col sm={12} className="pt-30">
              <Card title={item && item[0].name}>
                {itemData && <Chart itemData={itemData[0]} />}
                <Row className="pt-30">
                  <Col sm={12} className="pb-15">
                    {item && itemData && (
                      <h3>
                        {item[0].name} ({itemData[0][itemData.length - 1].date}):{" "}
                        {itemData[0][itemData.length - 1].total}
                      </h3>
                    )}
                  </Col>
                  <Col md={6}>
                    <VerticalList>
                      {item && itemData && (
                        <>
                          <span>Contribuições: {item[0].contributions}</span>
                          <span>
                            Contribuições ({itemData[0][itemData.length - 1].date}):{" "}
                            {itemData[0][itemData.length - 1].contributions}
                          </span>
                        </>
                      )}
                    </VerticalList>
                  </Col>
                  <Col md={6}>
                    <VerticalList>
                      <span style={{ color: "red" }}>Data 01:</span>
                      <span style={{ color: "red" }}>Data 02:</span>
                    </VerticalList>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm={12} className="pt-30">
              <Card title="Relacionados">
                {relatedItems &&
                  relatedItems.map((item) => (
                    <HorizontalList key={item.id}>
                      <a href={`/items/${params.tid}/${item.id}`}>{item.name}</a>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Data;
