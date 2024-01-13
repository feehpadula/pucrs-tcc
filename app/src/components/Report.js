import { useState, useEffect } from "react";
import { GetToken } from "../services/Auth";
import { usePost } from "../hooks/usePost";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HorizontalList from "../components/HorizontalList";
import Button from "../components/Button";
import Radio from "../components/Radio";
import "./Report.scss";

const Report = (props) => {
  const token = GetToken();

  const item = props.item && props.item[0];

  const [inputs, setInputs] = useState({
    itemsId: item.id,
    reportType: 0,
  });

  /* eslint-disable */
  const { postData, data, isLoading, error } = usePost();
  /* eslint-disable */

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else {
      if (data && data.status === 200 && data.data.insertId) {
        toast.success("Reportado com sucesso");
        props.onHandleCancelReport();
      }
    }
  }, [data, error]);

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
      url: "/reports",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        itemsId: inputs.itemsId,
        reportType: parseInt(inputs.reportType),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Radio
        name="reportType"
        legend="Motivo:"
        required={true}
        data={reasons}
        onChange={handleChange}
        required={true}
      />

      <Row>
        <Col sm={12} className="pt-lg-30">
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
