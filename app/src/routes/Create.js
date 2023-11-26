import { useState } from "react";
import { useApi } from "../hooks/useApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../components/Card";
import HorizontalList from "../components/HorizontalList";
import Select from "../components/Select";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Create.scss";

function Create() {
  const singleFieldOptions = [
    { value: "integer", label: "Inteiro" },
    { value: "percent", label: "Porcentagem" },
  ];

  const doubleFieldOptions = { value: "combined", label: "Combinado (%)" };

  const relationalOptions = [
    { value: "none", label: "Nenhum" },
    { value: "more", label: "Maior que" },
    { value: "moreeq", label: "Maior ou igual a" },
  ];

  const [dataPresentationOptions, setDataPresentationOptions] =
    useState(singleFieldOptions);

  const handleChange = (e) => {
    e.target.value !== ""
      ? setDataPresentationOptions([...singleFieldOptions, doubleFieldOptions])
      : setDataPresentationOptions(singleFieldOptions);
  };

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
            <Col sm={12}>
              <Card title="Criar">
                <Row>
                  <Col sm={12}>
                    <Input
                      label="Título"
                      placeholder="Título da pesquisa"
                      id="title"
                      type="text"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} className="mt-15">
                    <h2>Campos</h2>
                    <Input
                      id="data-field1"
                      type="text"
                      label="Campo 1"
                      placeholder="Nome do campo"
                      editableLabel={true}
                      className="pt-15"
                    />
                    <Select
                      className="pt-15"
                      label="Relação"
                      id="relational-options"
                      name="relational-options"
                      data={relationalOptions}
                    />
                    <Input
                      id="data-field2"
                      type="text"
                      label="Campo 2 (Opcional)"
                      placeholder="Nome do campo"
                      editableLabel={true}
                      className="pt-15"
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} className="mt-15">
                    <h2>Opções</h2>

                    <Select
                      className="pt-15"
                      label="Apresentação de dados"
                      id="data-presentation-options"
                      name="data-presentation-options"
                      data={dataPresentationOptions}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <HorizontalList>
                      <div></div>
                      <div className="create-actions">
                        <Button title="Cancelar" />
                        <Button title="Enviar" />
                      </div>
                    </HorizontalList>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Create;
