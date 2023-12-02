import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HorizontalList from "../components/HorizontalList";
import Button from "../components/Button";
import Input from "../components/Input";
import "./Contribute.scss";

const Contribute = (props) => {
  const navigate = useNavigate();

  const item = props.item && props.item[0];

  const [inputs, setInputs] = useState({
    itemsId: item.id,
    field01name: "1",
    field02name: item.field02name ? "0" : null,
  });
  /* eslint-disable */
  const { postData, data, isLoading, error } = usePost();
  /* eslint-disable */

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleCancelContribute = () => {
    props.onHandleCancelContribute();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await postData({
      method: "post",
      url: "http://localhost:4000/data",
      data: {
        itemsId: inputs.itemsId,
        field01name: parseInt(inputs.field01name),
        field02name: inputs.field02name ? parseInt(inputs.field02name) : null,
      },
    });

    navigate(0);
  };

  useEffect(() => {
    if (item) {
      if (item.dataRelation === 2) {
        parseInt(inputs.field02name) > parseInt(inputs.field01name) &&
          setInputs((values) => ({ ...values, field02name: inputs.field01name }));
      } else if (item.dataRelation === 1) {
        parseInt(inputs.field02name) >= parseInt(inputs.field01name) &&
          setInputs((values) => ({
            ...values,
            field02name: inputs.field01name > 0 && inputs.field01name - 1,
          }));
      }

      if (inputs.field01name < 1) {
        setInputs((values) => ({ ...values, field01name: 1 }));
      }

      if (inputs.field02name < 0) {
        setInputs((values) => ({ ...values, field02name: 0 }));
      }
    }
  }, [inputs]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {item && (
        <Input
          id="data-field1"
          type="number"
          name="field01name"
          min={1}
          label={item.field01name}
          editableLabel={true}
          onChange={handleChange}
          required={true}
          value={inputs.field01name}
        />
      )}

      {item && item.field02name && (
        <Input
          id="data-field2"
          type="number"
          name="field02name"
          min={0}
          label={item.field02name}
          editableLabel={true}
          onChange={handleChange}
          required={true}
          value={inputs.field02name}
        />
      )}

      <Row>
        <Col sm={12}>
          <HorizontalList>
            <div></div>
            <div className="actions">
              <Button type="button" title="Cancelar" onClick={handleCancelContribute} />
              <Button type="submit" title="Enviar" />
            </div>
          </HorizontalList>
        </Col>
      </Row>
    </form>
  );
};

export default Contribute;
