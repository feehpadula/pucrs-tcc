import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HorizontalList from "../components/HorizontalList";
import Button from "../components/Button";
import Radio from "../components/Radio";
import "./Report.scss";

const Report = (props) => {
  const navigate = useNavigate();

  const item = props.item && props.item[0];

  const [inputs, setInputs] = useState({
    itemsId: item.id,
    reportType: 0,
  });

  /* eslint-disable */
  const { postData, data, isLoading, error } = usePost();
  /* eslint-disable */

  const reasons = [
    "Nome incorreto ou não reflete o resultado esperado",
    "Dados incorretos ou não refletem o resultado esperado",
    "Os dados não estão sendo apresentados conforme esperado",
    "As informações são indesejadas, falsas ou violam leis",
  ];

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleCancelReport = () => {
    props.onHandleCancelReport();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await postData({
      method: "post",
      url: "http://localhost:4000/reports/",
      data: {
        itemsId: inputs.itemsId,
        reportType: parseInt(inputs.reportType),
      },
    });

    navigate(0);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Radio
        name="reportType"
        label="Motivo:"
        required={true}
        data={reasons}
        onChange={handleChange}
        required={true}
      />

      <Row>
        <Col sm={12}>
          <HorizontalList>
            <div></div>
            <div className="actions">
              <Button type="button" title="Cancelar" onClick={handleCancelReport} />
              <Button type="submit" title="Enviar" />
            </div>
          </HorizontalList>
        </Col>
      </Row>
    </form>
  );
};

export default Report;
