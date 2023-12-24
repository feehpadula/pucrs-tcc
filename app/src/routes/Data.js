import { useState } from "react";
import { useParams } from "react-router";
import { useGet } from "../hooks/useGet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../components/Card";
import Contribute from "../components/Contribute";
import Report from "../components/Report";
import HorizontalList from "../components/HorizontalList";
import VerticalList from "../components/VerticalList";
import Button from "../components/Button";
import Select from "../components/Select";
import Tags from "../components/Tags";
import Chart from "../components/Chart.tsx";
import { PlusIcon, ShareIcon, ReportIcon } from "../assets/svg/icons";
import "./Data.scss";

function Data() {
  const [showContribute, setShowContribute] = useState(false);
  const [shareText, setShareText] = useState("Compartilhar");
  const [showReport, setShowReport] = useState(false);

  const countries = [
    {
      value: "brasil",
      label: "Brasil",
    },
    {
      value: "canada",
      label: "Canada",
    },
    {
      value: "estadosunidos",
      label: "Estados Unidos",
    },
  ];

  const handleContribute = () => {
    setShowContribute(true);
    setShowReport(false);
  };

  const handleCancelContribute = () => {
    setShowContribute(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(item && item[0].name + ": " + window.location.href);
    setShareText("Link copiado!");
    setTimeout(() => setShareText("Compartilhar"), 3000);
  };

  const handleReport = () => {
    setShowReport(true);
    setShowContribute(false);
  };

  const handleCancelReport = () => {
    setShowReport(false);
  };

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
    data: item,
    isLoading: itemIsLoading,
    error: itemError,
  } = useGet({
    method: "get",
    url: `/items/${params.id}`,
  });
  /* eslint-disable */

  /* eslint-disable */
  const {
    data: relatedItems,
    isLoading: relatedItemsIsLoading,
    error: relatedItemsError,
  } = useGet({
    method: "get",
    url: `/topics/${params.tid}/${params.id}/r`,
  });
  /* eslint-disable */

  /* eslint-disable */
  const {
    data: itemData,
    isLoading: itemDataIsLoading,
    error: itemDataError,
  } = useGet({
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
                  <Select label="Local" id="country" name="country" data={countries} />
                </div>
                <div className="item-actions">
                  <Button
                    title="Contribuir"
                    icon={<PlusIcon />}
                    onClick={handleContribute}
                  ></Button>
                  <Button
                    title={shareText}
                    icon={<ShareIcon />}
                    onClick={handleShare}
                  ></Button>
                  <Button
                    title="Reportar"
                    icon={<ReportIcon />}
                    onClick={handleReport}
                  ></Button>
                </div>
              </HorizontalList>
            </Col>
            {showContribute && (
              <Col sm={12} className="pt-30">
                <Card title="Contribuir">
                  <Contribute
                    item={item && item}
                    onHandleCancelContribute={handleCancelContribute}
                  />
                </Card>
              </Col>
            )}
            {showReport && (
              <Col sm={12} className="pt-30">
                <Card title="Reportar">
                  <Report item={item && item} onHandleCancelReport={handleCancelReport} />
                </Card>
              </Col>
            )}
            <Col sm={12} className="pt-30">
              {item && itemData && itemData[0].length ? (
                <Card title={item && item[0].name}>
                  <Chart item={item[0]} itemData={itemData[0]} />
                  <Row className="pt-30">
                    <Col sm={12} className="pb-15">
                      <h3>
                        {item[0].name} ({itemData[0][itemData[0].length - 1].date})
                        (Média): {itemData[0][itemData[0].length - 1].field01data}
                      </h3>
                    </Col>
                    <Col md={6}>
                      <VerticalList>
                        <span>Total de contribuições: {item[0].contributions}</span>

                        <span>
                          Contribuições ({itemData[0][itemData[0].length - 1].date}
                          ): {itemData[0][itemData[0].length - 1].contributions}
                        </span>
                      </VerticalList>
                    </Col>
                    <Col md={6}>
                      <VerticalList>
                        <span>
                          Média total:{" "}
                          {Math.round(
                            itemData[0].reduce((accumulator, item) => {
                              return item.field01data
                                ? accumulator + item.field01data
                                : accumulator + item.combined;
                            }, 0) / itemData[0].length
                          )}
                          {item[0].dataPresentation !== 0 && "%"}
                        </span>
                        {item[0].field02name !== null && (
                          <span>{item[0].field02name}:</span>
                        )}
                      </VerticalList>
                    </Col>
                  </Row>
                </Card>
              ) : (
                <Card title={item && item[0].name}>
                  <span>Nenhuma contribuição encontrada</span>
                </Card>
              )}
            </Col>
            <Col sm={12} className="pt-30">
              <Card title="Relacionados">
                {relatedItems &&
                  relatedItems.map((item) => (
                    <HorizontalList key={item.id}>
                      <a href={`/data/${params.tid}/${item.id}`}>{item.name}</a>
                      <Tags
                        tags={[
                          item.contributions,
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

export default Data;
