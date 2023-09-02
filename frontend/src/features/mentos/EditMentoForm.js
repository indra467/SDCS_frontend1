import { useState, useEffect } from "react";
import {
  useUpdateMentoMutation,
  useDeleteMentoMutation,
} from "./mentosApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import Styles from "./Mento.module.css";
import { Form, Input, Button, Row, Col, Checkbox } from "antd";
import { Container } from "react-bootstrap";
const EditMentoForm = ({ mento, users }) => {
  const [form] = Form.useForm();
  const { isManager, isAdmin, isOperation_Employee, isBilling_Employee } =
    useAuth();

  const [updateMento, { isLoading, isSuccess, isError, error }] =
    useUpdateMentoMutation();

  const [
    deleteMento,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteMentoMutation();

  const navigate = useNavigate();
  const [userId, setUserId] = useState(users[0].id);
  const [operator_name , setOperator_name] = useState(mento.operator_name);
const [fleet_number , setFleet_number] = useState(mento.fleet_number);
const [date , setDate] = useState(mento.date);
const [week , setWeek] = useState(mento.week);
const [location , setLocation] = useState(mento.location);
const [country , setCountry] = useState(mento.country);
const [hr_up , setHr_up] = useState(mento.hr_up);
const [hr_uns , setHr_uns] = useState(mento.hr_uns);
const [last_done , setLast_done] = useState(mento.last_done);
const [next_done , setNext_done] = useState(mento.next_done);
const [type1 , setType1] = useState(mento.type1);
const [type2 , setType2] = useState(mento.type2);
const [date2 , setDate2] = useState(mento.date2);
const [date3 , setDate3] = useState(mento.date3);
const [hour2 , setHour2] = useState(mento.hour2);
const [hour3 , setHour3] = useState(mento.hour3);
const [overall , setOverall] = useState(mento.overall);
const [tt_1 , setTt_1] = useState(mento.tt_1);
const [tt_2 , setTt_2] = useState(mento.tt_2);
const [tt_3 , setTt_3] = useState(mento.tt_3);
const [tt_4 , setTt_4] = useState(mento.tt_4);
const [tyre_p , setTyre_p] = useState(mento.tyre_p);
const [tyre_c , setTyre_c] = useState(mento.tyre_c);
const [centarl_greasing , setCentarl_greasing] = useState(mento.centarl_greasing);
const [lower_oil , setLower_oil] = useState(mento.lower_oil);
const [lower_coolant , setLower_coolant] = useState(mento.lower_coolant);
const [design_oil1 , setDesign_oil1] = useState(mento.design_oil1);
const [design_oil2 , setDesign_oil2] = useState(mento.design_oil2);
const [pump_oil , setPump_oil] = useState(mento.pump_oil);
const [winches_oil , setWinches_oil] = useState(mento.winches_oil);
const [winches_grease , setWinches_grease] = useState(mento.winches_grease);
const [hydraulic_oil , setHydraulic_oil] = useState(mento.hydraulic_oil);
const [leakage , setLeakage] = useState(mento.leakage);
const [central_greasing2 , setCentral_greasing2] = useState(mento.central_greasing2);
  //const [myfile, setpostImage] = useState(draft.myfile);
  /*const temp = `${draft.myfile}`
  const blob = new Blob([window.atob(temp)], {
    type: "application/pdf"
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob)*/

  

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
      navigate("/dash/drafts");
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
      await updateMento({
        id: mento.id,
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
  
  const onDeleteMentoClicked = async () => {
    await deleteMento({ id: mento.id });
  };

  const created = new Date(mento.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(mento.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  /*const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })*/

    const errClass = isError ? "errmsg" : "offscreen";
    const validFleet_numberClass = !fleet_number ? "form__input--incomplete" : "";

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className={`${Styles.icon_button}`}
        title="Delete"
        onClick={onDeleteMentoClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  const content = (
    <Container className="bg-light text-dark rounded">
      <h2 className="px-5 pt-5 pb-3 text-decoration-underline">
        Edit Mento
      </h2>
      <p className={errClass}>{error?.data?.message}</p>

      <Form form={form} className="" onFinish={onSaveMentoClicked}>
      <Row className="d-flex justify-content-between">
        <Col span={11} className="px-2">
            <Form.Item
              label="Operator Name: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
          <Row className="d-flex justify-content-between">
                <Col span={11} className="px-2">
                <Form.Item
                  label="Last maintenance done "
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
          </Row>
          <Row className="d-flex justify-content-between">
                <Col span={11} className="px-2">
                <Form.Item
                  label="Next maintenance "
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
                  label="Type A-B-C"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
                  label="Type A-B-C "
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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

                <Col span={11} className="px-2">
                <Form.Item
                  label="Date "
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
          </Row>
          <Row className="d-flex justify-content-between">
                <Col span={11} className="px-2">
                <Form.Item
                  label="Date "
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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
                  label="Hours "
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
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

                <Col span={11} className="px-2">
                <Form.Item
                  label="Oerall Remarks: "
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
                  rules={[{ required: true }]}
                >
                  <Input
                    className={`form__input ${validFleet_numberClass} rounded`} 
                    name="overall"
                value={overall}
                onChange={onOverallChanged}
              />
            </Form.Item>
          </Col>
          </Row>
          
       
      </Form>
    </Container>
  );

  return content;
};

export default EditMentoForm;
