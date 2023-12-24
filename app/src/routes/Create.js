import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
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
  const navigate = useNavigate();
  /* eslint-disable */
  const { postData, data, isLoading, error } = usePost();
  /* eslint-disable */
  const [field2HasName, setField2HasName] = useState(false);
  const [inputs, setInputs] = useState({});

  const topicOptions = [{ value: "", name: "" }];

  const singleFieldRelationalOptions = [{ value: "0", label: "Nenhuma" }];

  const doubleFieldRelationalOptions = [
    { value: "1", label: "Maior" },
    { value: "2", label: "Maior ou igual" },
  ];

  const [relationalOptions, setRelationalOptions] = useState(
    singleFieldRelationalOptions
  );

  const singleFieldPresentationOptions = [
    { value: "0", label: "Inteiro" },
    { value: "1", label: "Porcentagem" },
  ];

  const doubleFieldPresentationOptions = [{ value: "2", label: "Combinado (%)" }];

  const outliersOptions = [
    { value: "0", label: "Não remover" },
    { value: "1", label: "1.4 * IQR" },
    { value: "2", label: "1.5 * IQR (Padrão)" },
    { value: "3", label: "1.6 * IQR" },
  ];

  const [dataPresentationOptions, setDataPresentationOptions] = useState(
    singleFieldPresentationOptions
  );

  const handleChange = (e, isField2 = false) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

    if (isField2 && e.target.value === "") {
      delete inputs.dataRelation;
      if (inputs.dataPresentation === "2") {
        delete inputs.dataPresentation;
      }
    }
  };

  const handleField2Change = (e) => {
    if (e.target.value !== "") {
      setRelationalOptions([
        ...singleFieldRelationalOptions,
        ...doubleFieldRelationalOptions,
      ]);
      setDataPresentationOptions(doubleFieldPresentationOptions);
      setField2HasName(true);

      inputs.dataPresentation = "2";
    } else {
      setRelationalOptions(singleFieldRelationalOptions);
      setDataPresentationOptions(singleFieldPresentationOptions);
      setField2HasName(false);

      inputs.dataPresentation = "0";
    }

    handleChange(e, true);
  };

  function handleCancelClick() {
    navigate("/");
  }

  const handleSendClick = async (e) => {
    e.preventDefault();

    await postData({
      method: "post",
      url: "/items",
      data: {
        topicId: inputs.topicId,
        name: inputs.name,
        field01name: inputs.field01name,
        field02name: inputs.field02name ? inputs.field02name : null,
        dataRelation: inputs.dataRelation ? inputs.dataRelation : 0,
        dataPresentation: inputs.dataPresentation ? inputs.dataPresentation : 0,
        dataOutliers: inputs.dataOutliers ? inputs.dataOutliers : 0,
      },
    });
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

  topics &&
    topics.map((topic) => topicOptions.push({ value: topic.id, label: topic.name }));

  console.log(inputs);

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
              <form onSubmit={handleSendClick} autoComplete="off">
                <Card title="Criar">
                  <Row>
                    <Col sm={12}>
                      <Input
                        label="Título"
                        placeholder="Título da pesquisa"
                        id="title"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        required={true}
                      />
                      <Select
                        className="pt-15"
                        label="Tópico"
                        id="topicId"
                        name="topicId"
                        data={topicOptions.length && topicOptions}
                        onChange={handleChange}
                        required={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className="mt-15">
                      <h2>Campos</h2>

                      <Input
                        id="data-field1"
                        type="text"
                        name="field01name"
                        label="Campo 1"
                        placeholder="Nome do campo"
                        editableLabel={true}
                        className="pt-15"
                        onChange={handleChange}
                        required={true}
                      />
                      <Input
                        id="data-field2"
                        type="text"
                        name="field02name"
                        label="Campo 2 (Opcional)"
                        placeholder="Nome do campo"
                        editableLabel={true}
                        className="pt-15"
                        onChange={(e) => handleField2Change(e)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className="mt-15">
                      <h2>Opções</h2>

                      {field2HasName && (
                        <Select
                          className="pt-15"
                          label="Relação Campo 1 - Campo 2"
                          id="relational-options"
                          name="dataRelation"
                          data={relationalOptions}
                          onChange={handleChange}
                        />
                      )}
                      <Select
                        className="pt-15"
                        label="Apresentação de dados"
                        id="data-presentation-options"
                        name="dataPresentation"
                        data={dataPresentationOptions}
                        onChange={handleChange}
                        required={true}
                      />
                      <Select
                        className="pt-15"
                        label="Remover outliers"
                        id="data-outliers-options"
                        name="dataOutliers"
                        data={outliersOptions}
                        onChange={handleChange}
                        required={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <HorizontalList>
                        <div></div>
                        <div className="create-actions">
                          <Button
                            type="button"
                            title="Cancelar"
                            onClick={handleCancelClick}
                          />
                          <Button type="submit" title="Enviar" />
                        </div>
                      </HorizontalList>
                    </Col>
                  </Row>
                </Card>
              </form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Create;
