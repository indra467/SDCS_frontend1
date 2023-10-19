import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewMentoMutation } from "./mentosApiSlice";
import { Form, Input, Button, Row, Col, Checkbox } from "antd";
import { Container } from "react-bootstrap";
import TextArea from "antd/es/input/TextArea";

const NewMentoForm = ({ users }) => {
  const [form] = Form.useForm();

  const [addNewMento, { isLoading, isSuccess, isError, error }] =
    useAddNewMentoMutation();

  const navigate = useNavigate();
  const [userId, setUserId] = useState(users[0].id);
  const [operator_name, setOperator_name] = useState("");
  const [fleet_number, setFleet_number] = useState("");
  const [date, setDate] = useState("");
  const [week, setWeek] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [hr_up, setHr_up] = useState("");
  const [hr_uns, setHr_uns] = useState("");
  const [last_done, setLast_done] = useState("");
  const [next_done, setNext_done] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [date2, setDate2] = useState("");
  const [date3, setDate3] = useState("");
  const [hour2, setHour2] = useState("");
  const [hour3, setHour3] = useState("");
  const [overall, setOverall] = useState("");
  const [tt_1, setTt_1] = useState(false);
  const [tt_2, setTt_2] = useState(false);
  const [tt_3, setTt_3] = useState(false);
  const [tt_4, setTt_4] = useState(false);
  const [tyre_p, setTyre_p] = useState(false);
  const [tyre_c, setTyre_c] = useState(false);
  const [centarl_greasing, setCentarl_greasing] = useState(false);
  const [lower_oil, setLower_oil] = useState(false);
  const [lower_coolant, setLower_coolant] = useState(false);
  const [design_oil1, setDesign_oil1] = useState(false);
  const [design_oil2, setDesign_oil2] = useState(false);
  const [pump_oil, setPump_oil] = useState(false);
  const [winches_oil, setWinches_oil] = useState(false);
  const [winches_grease, setWinches_grease] = useState(false);
  const [hydraulic_oil, setHydraulic_oil] = useState(false);
  const [leakage, setLeakage] = useState(false);
  const [central_greasing2, setCentral_greasing2] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setOperator_name("");
      setUserId("");
      setFleet_number("");
      setDate("");
      setWeek("");
      setLocation("");
      setCountry("");
      setHr_up("");
      setHr_uns("");
      setLast_done("");
      setNext_done("");
      setType1("");
      setType2("");
      setDate2("");
      setDate3("");
      setHour2("");
      setHour3("");
      setOverall("");
      setTt_1(false);
      setTt_2(false);
      setTt_3(false);
      setTt_4(false);
      setTyre_p(false);
      setTyre_c(false);
      setCentarl_greasing(false);
      setLower_oil(false);
      setLower_coolant(false);
      setDesign_oil1(false);
      setDesign_oil2(false);
      setPump_oil(false);
      setWinches_oil(false);
      setWinches_grease(false);
      setHydraulic_oil(false);
      setLeakage(false);
      setCentral_greasing2(false);
      // navigate("/dash/drafts");
    }
  }, [isSuccess, navigate]);

  const onOperator_nameChanged = (e) => setOperator_name(e.target.value);
  const onFleet_numberChanged = (e) => setFleet_number(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);
  const onWeekChanged = (e) => setWeek(e.target.value);
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onCountryChanged = (e) => setCountry(e.target.value);
  const onHr_upChanged = (e) => setHr_up(e.target.value);
  const onHr_unsChanged = (e) => setHr_uns(e.target.value);
  const onLast_doneChanged = (e) => setLast_done(e.target.value);
  const onNext_doneChanged = (e) => setNext_done(e.target.value);
  const onType1Changed = (e) => setType1(e.target.value);
  const onType2Changed = (e) => setType2(e.target.value);
  const onDate2Changed = (e) => setDate2(e.target.value);
  const onDate3Changed = (e) => setDate3(e.target.value);
  const onHour2Changed = (e) => setHour2(e.target.value);
  const onHour3Changed = (e) => setHour3(e.target.value);
  const onOverallChanged = (e) => setOverall(e.target.value);

  const canSave =
    [
      operator_name,
      fleet_number,
      date,
      week,
      location,
      country,
      hr_up,
      hr_uns,
      last_done,
      next_done,
      type1,
      type2,
      date2,
      date3,
      hour2,
      hour3,
      overall
    ].every(Boolean) && !isLoading;

  const onSaveMentoClicked = async (e) => {

    if (canSave) {
      await addNewMento({
        user: userId,
        operator_name,
        fleet_number,
        date,
        week,
        location,
        country,
        hr_up,
        hr_uns,
        last_done,
        next_done,
        type1,
        type2,
        date2,
        date3,
        hour2,
        hour3,
        overall,
        tt_1,
        tt_2,
        tt_3,
        tt_4,
        tyre_p,
        tyre_c,
        centarl_greasing,
        lower_oil,
        lower_coolant,
        design_oil1,
        design_oil2,
        pump_oil,
        winches_oil,
        winches_grease,
        hydraulic_oil,
        leakage,
        central_greasing2
      });
    }
  };


  const errClass = isError ? "errmsg" : "offscreen";
  const validFleet_numberClass = !fleet_number ? "form__input--incomplete" : "";

  const content = (
    <Container className="bg-light text-dark rounded">
      <h2 className="px-5 pt-5 pb-3 text-decoration-underline">Add New Machine for Maintenance</h2>
      <p className={errClass}>{error?.data?.message}</p>
      <h4 className="px-5 text-decoration-underline">
        Crane Inspection Report
      </h4>
      <Form
        form={form}
        className="px-5"
        onFinish={onSaveMentoClicked}
        layout="vertical"
      >
        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Operator Name: "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="operator_name"
                value={operator_name}
                onChange={onOperator_nameChanged}
              />
            </Form.Item>
          </Col>

          <Col span={11} className="px-2">
            <Form.Item
              label="Fleet Number: "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="fleet_number"
                value={fleet_number}
                onChange={onFleet_numberChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Date: "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="date"
                value={date}
                onChange={onDateChanged}
              />
            </Form.Item>
          </Col>

          <Col span={11} className="px-2">
            <Form.Item
              label="Week"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="week"
                value={week}
                onChange={onWeekChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Location "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="location"
                value={location}
                onChange={onLocationChanged}
              />
            </Form.Item>
          </Col>

          <Col span={11} className="px-2">
            <Form.Item
              label="Country"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="country"
                value={country}
                onChange={onCountryChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Hour ups "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="hr_up"
                value={hr_up}
                onChange={onHr_upChanged}
              />
            </Form.Item>
          </Col>

          <Col span={11} className="px-2">
            <Form.Item
              label="Hour uns "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="hr_uns"
                value={hr_uns}
                onChange={onHr_unsChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item htmlFor="tt_1" className="px-2 d-flex align-items-center">
          <Checkbox
            id="tt_1"
            name="tt_1"
            checked={tt_1}
            onChange={() => setTt_1(!tt_1)}
          />
          <span className="ml-3">Check Track Tension</span>
        </Form.Item>
        <Form.Item htmlFor="tt_2" className="px-2 d-flex align-items-center">
          <Checkbox
            id="tt_2"
            name="tt_2"
            checked={tt_2}
            onChange={() => setTt_2(!tt_2)}
          />
          <span className="ml-3">Check Track Tension</span>
        </Form.Item>
        <Form.Item htmlFor="tt_3" className="px-2 d-flex align-items-center">
          <Checkbox
            id="tt_3"
            name="tt_3"
            checked={tt_3}
            onChange={() => setTt_3(!tt_3)}
          />
          <span className="ml-3">Check Track Tension</span>
        </Form.Item>
        <Form.Item htmlFor="tt_4" className="px-2 d-flex align-items-center">
          <Checkbox
            id="tt_4"
            name="tt_4"
            checked={tt_4}
            onChange={() => setTt_4(!tt_4)}
          />
          <span className="ml-3">Check Track Tension</span>
        </Form.Item>
        <Form.Item htmlFor="tyre_p" className="d-flex align-items-center">
          <Checkbox
            id="tyre_p"
            name="tyre_p"
            checked={tyre_p}
            onChange={() => setTyre_p(!tyre_p)}
          />
          <span className="ml-3">Check Tyre Pressure</span>
        </Form.Item>
        <Form.Item htmlFor="tyre_c" className="d-flex align-items-center">
          <Checkbox
            id="tyre_c"
            name="tyre_c"
            checked={tyre_c}
            onChange={() => setTyre_c(!tyre_c)}
          />
          <span className="ml-3">Check Tyre Condition</span>
        </Form.Item>
        <Form.Item
          htmlFor="centarl_greasing"
          className="d-flex align-items-center"
        >
          <Checkbox
            id="centarl_greasing"
            name="centarl_greasing"
            checked={centarl_greasing}
            onChange={() => setCentarl_greasing(!centarl_greasing)}
          />
          <span className="ml-3">Check level of Central Greasing System</span>
        </Form.Item>
        <Form.Item htmlFor="lower_oil" className="d-flex align-items-center">
          <Checkbox
            id="lower_oil"
            name="lower_oil"
            checked={lower_oil}
            onChange={() => setLower_oil(!lower_oil)}
          />
          <span className="ml-3">Check coolant lower engine</span>
        </Form.Item>
        <Form.Item
          htmlFor="lower_coolant"
          className="d-flex align-items-center"
        >
          <Checkbox
            id="lower_coolant"
            name="lower_coolant"
            checked={lower_coolant}
            onChange={() => setLower_coolant(!lower_coolant)}
          />
          <span className="ml-3">Check coolant lower engine</span>
        </Form.Item>
        <hr />
        <h4 className="text-decoration-underline">Crane Superstructure</h4>
        <Form.Item htmlFor="design_oil1" className="d-flex align-items-center">
          <Checkbox
            id="design_oil1"
            name="design_oil1"
            checked={design_oil1}
            onChange={() => setDesign_oil1(!design_oil1)}
          />
          <span className="ml-3">Design engines oil level check</span>
        </Form.Item>
        <Form.Item htmlFor="design_oil2" className="d-flex align-items-center">
          <Checkbox
            id="design_oil2"
            name="design_oil2"
            checked={design_oil2}
            onChange={() => setDesign_oil2(!design_oil2)}
          />
          <span className="ml-3">Design engines oil level check</span>
        </Form.Item>
        <Form.Item htmlFor="pump_oil" className="d-flex align-items-center">
          <Checkbox
            id="pump_oil"
            name="pump_oil"
            checked={pump_oil}
            onChange={() => setPump_oil(!pump_oil)}
          />
          <span className="ml-3">Pump distributer gearbox oil level check</span>
        </Form.Item>
        <Form.Item htmlFor="winches_oil" className="d-flex align-items-center">
          <Checkbox
            id="winches_oil"
            name="winches_oil"
            checked={winches_oil}
            onChange={() => setWinches_oil(!winches_oil)}
          />
          <span className="ml-3">Winches oil level check</span>
        </Form.Item>
        <Form.Item
          htmlFor="winches_grease"
          className="d-flex align-items-center"
        >
          <Checkbox
            id="winches_grease"
            name="winches_grease"
            checked={winches_grease}
            onChange={() => setWinches_grease(!winches_grease)}
          />
          <span className="ml-3">Winches greased well check</span>
        </Form.Item>
        <Form.Item
          htmlFor="hydraulic_oil"
          className="d-flex align-items-center"
        >
          <Checkbox
            id="hydraulic_oil"
            name="hydraulic_oil"
            checked={hydraulic_oil}
            onChange={() => setHydraulic_oil(!hydraulic_oil)}
          />
          <span className="ml-3">Hydraulic system oil level check</span>
        </Form.Item>
        <hr />
        <h4 className="text-decoration-underline">General</h4>
        <Form.Item htmlFor="leakage" className="d-flex align-items-center">
          <Checkbox
            id="leakage"
            name="leakage"
            checked={leakage}
            onChange={() => setLeakage(!leakage)}
          />
          <span className="ml-3">Check for leakage</span>
        </Form.Item>
        <Form.Item
          htmlFor="centarl_greasing2"
          className="d-flex align-items-center"
        >
          <Checkbox
            id="centarl_greasing2"
            name="centarl_greasing2"
            checked={central_greasing2}
            onChange={() => setCentral_greasing2(!central_greasing2)}
          />
          <span className="ml-3">Check level of Central Greasing</span>
        </Form.Item>
        <hr />
        <h4 className="text-decoration-underline">Maintenance</h4>
        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Last maintenance done "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="last_done"
                value={last_done}
                onChange={onLast_doneChanged}
              />
            </Form.Item>
          </Col>
          <Col span={11} className="px-2">
            <Form.Item
              label="Type A-B-C"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="type1"
                value={type1}
                onChange={onType1Changed}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Date "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="date2"
                value={date2}
                onChange={onDate2Changed}
              />
            </Form.Item>
          </Col>
          <Col span={11} className="px-2">
            <Form.Item
              label="Hours "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="hour2"
                value={hour2}
                onChange={onHour2Changed}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Next maintenance "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="next_done"
                value={next_done}
                onChange={onNext_doneChanged}
              />
            </Form.Item>
          </Col>
          <Col span={11} className="px-2">
            <Form.Item
              label="Type A-B-C "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="type2"
                value={type2}
                onChange={onType2Changed}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Date "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="date3"
                value={date3}
                onChange={onDate3Changed}
              />
            </Form.Item>
          </Col>
          <Col span={11} className="px-2">
            <Form.Item
              label="Hours "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validFleet_numberClass} rounded`}
                name="hour3"
                value={hour3}
                onChange={onHour3Changed}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Overall Remarks: "
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 22 }}
          rules={[{ required: true }]}
          className="pl-2"
        >
          <TextArea
            className={`form__input ${validFleet_numberClass} rounded`}
            name="overall"
            value={overall}
            onChange={onOverallChanged}
          />
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} className="d-flex align-items-center justify-content-center">
          <Button type="primary" disabled={!canSave} htmlType="submit" className="px-5 py-1 h5 text-light">
            Save
          </Button>
        </Form.Item>

      </Form>
    </Container>
  );

  return content;
};

export default NewMentoForm;