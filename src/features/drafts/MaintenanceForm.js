import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewDraftMutation } from "./draftsApiSlice";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
} from "antd";
import { Container } from "react-bootstrap";
import { faL } from "@fortawesome/free-solid-svg-icons";
import TextArea from "antd/es/input/TextArea";

const MaintenanceForm = ({ users }) => {
  const [form] = Form.useForm();

  const [addNewDraft, { isLoading, isSuccess, isError, error }] =
    useAddNewDraftMutation();

  const navigate = useNavigate();

  const [opname, setOpName] = useState("");
  const [fleetNo, setFleetNo] = useState("");
  const [date, setDate] = useState("");
  const [week, setWeek] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [craneType, setCraneType] = useState("");
  const [hrsUp, setHrsUp] = useState("");
  const [hrsUns, setHrsUns] = useState("");
  const [tension, setTension] = useState(false);
  const [tyrePress, setTyrePress] = useState(false);
  const [tyreCond, setTyreCond] = useState(false);
  const [cgs, setCgs] = useState(false);
  const [equipment, setEquipment] = useState("");
  const [chEngineOil, setChEngineOil] = useState(false);
  const [chCoolant, setCoolant] = useState(false);
  const [desEngineOil, setDesEngineOil] = useState(false);
  const [pump, setPump] = useState(false);
  const [winchesOil, setWinchesOil] = useState(false);
  const [winchesRope, setWinchesRope] = useState(false);
  const [winchesGrease, setWinchesGrease] = useState(false);
  const [hydraulic, setHydraulic] = useState(false);
  const [leakage, setLeakage] = useState(false);
  const [centralGrease, setCentralGrease] = useState(false);
  const [lastMaint, setLastMaint] = useState("");
  const [type, setType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [gendate, setGenDate] = useState("");
  const [gentime, setGenTime] = useState("");
  const [userId, setUserId] = useState(users[0].id);
  const [myfile, setpostImage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setOpName("");
      setFleetNo("");
      setDate("");
      setWeek("");
      setLocation("");
      setCountry("");
      setCraneType("");
      setHrsUp("");
      setHrsUns("");
      setTension(false);
      setTyrePress(false);
      setTyreCond(false);
      setCgs(false);
      setEquipment("");
      setChEngineOil(false);
      setCoolant(false);
      setDesEngineOil(false);
      setPump(false);
      setWinchesOil(false);
      setWinchesRope(false);
      setWinchesGrease(false);
      setHydraulic(false);
      setLeakage(false);
      setCentralGrease(false);
      setLastMaint("");
      setType("");
      setRemarks("");
      setGenDate("");
      setGenTime("");
      navigate("/dash/drafts");
    }
  }, [isSuccess, navigate]);

  const onOpName = (e) => setOpName(e.target.value);
  const onFleetNo = (e) => setFleetNo(e.target.value);
  const onDate = (e)=> setDate(e.target.value);
  const onWeek = (e) => setWeek(e.target.value);
  const onLocation = (e) => setLocation(e.target.value);
  const onCountry = (e) => setCountry(e.target.value);
  const onCraneType = (e) => setCraneType(e.target.value);
  const onHrsUp = (e) => setHrsUp(e.target.value);
  const onHrsUns = (e) => setHrsUns(e.target.value);
  const onLastMaint = (e) => setLastMaint(e.target.value);
  const onType = (e) => setType(e.target.value);
  const onRemark = (e) => setRemarks(e.target.value);
  const onGenDate = (e) => setGenDate(e.target.value);
  const onGenTime = (e) => setGenTime(e.target.value);
  const onEquipment = (e) => setEquipment(e);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    console.log(base64);
    setpostImage(base64);
  };

  const canSave =
    [
      opname,
      fleetNo,
      date,
      week,
      location,
      country,
      craneType,
      hrsUp,
      hrsUns,
      tension,
      tyrePress,
      tyreCond,
      cgs,
      chCoolant,
      chEngineOil,
      desEngineOil,
      pump,
      winchesOil,
      winchesRope,
      winchesGrease,
      hydraulic,
      leakage,
      centralGrease,
      lastMaint,
      type,
      remarks,
      gendate,
      gentime,
      equipment,
    ].every(Boolean) && !isLoading;

  const onSaveDraftClicked = async (e) => {
    if (canSave) {
      await addNewDraft({
        user: userId,
        opname,
        fleetNo,
        date,
        week,
        location,
        country,
        craneType,
        hrsUp,
        hrsUns,
        tension,
        tyrePress,
        tyreCond,
        cgs,
        chEngineOil,
        chCoolant,
        desEngineOil,
        pump,
        winchesOil,
        winchesRope,
        winchesGrease,
        hydraulic,
        leakage,
        centralGrease,
        lastMaint,
        type,
        remarks,
        gendate,
        gentime,
        equipment,
      });
    }
  };
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const errClass = isError ? "errmsg" : "offscreen";
  const validOpNameClass = !opname ? "form__input--incomplete" : "";
  const validFleetNoClass = !fleetNo ? "form__input--incomplete" : "";
  const validDateClass = !date ? "form__input--incomplete" : "";
  const validWeekClass = !week ? "form__input--incomplete" : "";
  const validLocationClass = !location ? "form__input--incomplete" : "";
  const validCountryClass = !country ? "form__input--incomplete" : "";
  const validCraneTypeClass = !craneType ? "form__input--incomplete" : "";
  const validHrsUpClass = !hrsUp ? "form__input--incomplete" : "";
  const validHrsUnsClass = !hrsUns ? "form__input--incomplete" : "";
  const validEquipmentClass = !equipment ? "form__input--incomplete" : "";

  const options = [{}];

  const content = (
    <Container className="bg-light text-dark rounded">
      <h2 className="px-2 pt-5 pb-3 text-decoration-underline">
        Crane Inspection Report
      </h2>
      <hr style={{ border: "1px dashed black" }} />
      <p className={errClass}>{error?.data?.message}</p>

      <Form
        form={form}
        layout="vertical"
        className="px-5"
        onFinish={onSaveDraftClicked}
      >
        <Row className="d-flex justify-content-between">
          <Col span={12}>
            <Form.Item
              htmlFor="opname"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Operator's name: "
            >
              <Input
                className={`form__input ${validOpNameClass} rounded`}
                id="opname"
                name="opname"
                value={opname}
                onChange={onOpName}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              htmlFor="fleetNo"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Fleet Number: "
            >
              <Input
                className={`form__input ${validFleetNoClass} rounded`}
                id="fleetNo"
                name="fleetNo"
                value={fleetNo}
                onChange={onFleetNo}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex flex-row justify-content-between">
          <Col span={12}>
            <Form.Item
              htmlFor="date"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Date: "
            >
              <Input
                className={`form__input ${validDateClass} rounded`}
                id="date"
                name="date"
                value={date}
                onChange={onDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              htmlFor="week"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Week: "
            >
              <Input
                className={`form__input ${validWeekClass} rounded`}
                id="week"
                name="week"
                value={week}
                onChange={week}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              htmlFor="location"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Location: "
            >
              <Input
                className={`form__input ${validLocationClass} rounded`}
                id="location"
                name="location"
                value={location}
                onChange={onLocation}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              htmlFor="Country"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Country: "
            >
              <Input
                className={`form__input ${validCountryClass} rounded`}
                id="country"
                name="country"
                value={country}
                onChange={onCountry}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              htmlFor="craneType"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Crane Type: "
            >
              <Input
                className={`form__input ${validCraneTypeClass} rounded`}
                id="craneType"
                name="craneType"
                value={craneType}
                onChange={onCraneType}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              htmlFor="hrsUp"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Running Hours Ups: "
            >
              <Input
                className={`form__input ${validHrsUpClass} rounded`}
                id="hrsUp"
                name="hrsUp"
                value={hrsUp}
                onChange={onHrsUp}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              htmlFor="hrsUns"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Running Hours Uns: "
            >
              <Input
                className={`form__input ${validHrsUnsClass} rounded`}
                id="hrsUns"
                name="hrsUns"
                value={hrsUns}
                onChange={onHrsUns}
              />
            </Form.Item>
          </Col>
        </Row>
        <hr className="px-5" />
        <Form.Item htmlFor="tension" className="d-flex align-items-center">
          <Checkbox
            id="tension"
            name="tension"
            checked={tension}
            onChange={() => setTension(!tension)}
          />
          <span className="ml-3">Check Track Tension</span>
        </Form.Item>
        <Form.Item htmlFor="tension" className="d-flex align-items-center">
          <Checkbox
            id="tension"
            name="tension"
            checked={tension}
            onChange={() => setTension(!tension)}
          />
          <span className="ml-3">Check Crane Tension</span>
        </Form.Item>
        <Form.Item htmlFor="tension" className="d-flex align-items-center">
          <Checkbox
            id="tension"
            name="tension"
            checked={tension}
            onChange={() => setTension(!tension)}
          />
          <span className="ml-3">Check Crane Tension</span>
        </Form.Item>
        <Form.Item htmlFor="tension" className="d-flex align-items-center">
          <Checkbox
            id="tension"
            name="tension"
            checked={tension}
            onChange={() => setTension(!tension)}
          />
          <span className="ml-3">Check Crane Tension</span>
        </Form.Item>
        <Form.Item htmlFor="tyrePressure" className="d-flex align-items-center">
          <Checkbox
            id="tyrePressure"
            name="tyrePressure"
            checked={tyrePress}
            onChange={() => setTyrePress(!tyrePress)}
          />
          <span className="ml-3">Check Tyre Pressure</span>
        </Form.Item>
        <Form.Item htmlFor="tyreCond" className="d-flex align-items-center">
          <Checkbox
            id="tyreCond"
            name="tyreCond"
            checked={tyreCond}
            onChange={() => setTyreCond(!tyreCond)}
          />
          <span className="ml-3">Check Tyre Condition</span>
        </Form.Item>
        <Form.Item htmlFor="cgs" className="d-flex align-items-center">
          <Checkbox
            id="cgs"
            name="cgs"
            checked={cgs}
            onChange={() => setCgs(!cgs)}
          />
          <span className="ml-3">Check level of Central Greasing System</span>
        </Form.Item>
        <Form.Item htmlFor="chEngineOil" className="d-flex align-items-center">
          <Checkbox
            id="chEngineOil"
            name="chEngineOil"
            checked={chEngineOil}
            onChange={() => setChEngineOil(!chEngineOil)}
          />
          <span className="ml-3">Check oil level lower engine</span>
        </Form.Item>
        <Form.Item htmlFor="coolant" className="d-flex align-items-center">
          <Checkbox
            id="coolant"
            name="coolant"
            checked={chCoolant}
            onChange={() => setCoolant(!chCoolant)}
          />
          <span className="ml-3">Check coolant lower engine</span>
        </Form.Item>
        <hr className="px-5" />
        <h2>Crane Superstructure</h2>
        <Form.Item htmlFor="desEngineOil" className="d-flex align-items-center">
          <Checkbox
            id="desEngineOil"
            name="desEngineOil"
            checked={desEngineOil}
            onChange={() => setDesEngineOil(!desEngineOil)}
          />
          <span className="ml-3">Design engines oil level check</span>
        </Form.Item>
        <Form.Item htmlFor="desEngineOil" className="d-flex align-items-center">
          <Checkbox
            id="desEngineOil"
            name="desEngineOil"
            checked={desEngineOil}
            onChange={() => setDesEngineOil(!desEngineOil)}
          />
          <span className="ml-3">Design engines oil level check</span>
        </Form.Item>
        <Form.Item htmlFor="pump" className="d-flex align-items-center">
          <Checkbox
            id="pump"
            name="pump"
            checked={pump}
            onChange={() => setPump(!pump)}
          />
          <span className="ml-3">Pump distributer gearbox oil level check</span>
        </Form.Item>
        <Form.Item htmlFor="winchesOil" className="d-flex align-items-center">
          <Checkbox
            id="winchesOil"
            name="winchesOil"
            checked={winchesOil}
            onChange={() => setWinchesOil(!winchesOil)}
          />
          <span className="ml-3">Winches oil level check</span>
        </Form.Item>
        <Form.Item htmlFor="winchesRope" className="d-flex align-items-center">
          <Checkbox
            id="winchesRope"
            name="winchesRope"
            checked={winchesRope}
            onChange={() => setWinchesRope(!winchesRope)}
          />
          <span className="ml-3">Winches rope condition check</span>
        </Form.Item>
        <Form.Item
          htmlFor="winchesGrease"
          className="d-flex align-items-center"
        >
          <Checkbox
            id="winchesGrease"
            name="winchesGrease"
            checked={winchesGrease}
            onChange={() => setWinchesGrease(!winchesGrease)}
          />
          <span className="ml-3">Winches greased well check</span>
        </Form.Item>
        <Form.Item htmlFor="hydraulic" className="d-flex align-items-center">
          <Checkbox
            id="hydraulic"
            name="hydraulic"
            checked={hydraulic}
            onChange={() => setHydraulic(!hydraulic)}
          />
          <span className="ml-3">Hydraulic system oil level check</span>
        </Form.Item>
        <hr />
        <h2>General</h2>
        <Form.Item htmlFor="leakage" className="d-flex align-items-center">
          <Checkbox
            id="leakage"
            name="leakage"
            checked={leakage}
            onChange={() => setLeakage(!leakage)}
          />
          <span className="ml-3">Check for leakages</span>
        </Form.Item>
        <Form.Item
          htmlFor="centralGrease"
          className="d-flex align-items-center"
        >
          <Checkbox
            id="centralGrease"
            name="centralGrease"
            checked={centralGrease}
            onChange={() => setCentralGrease(!centralGrease)}
          />
          <span className="ml-3">Check level of central greasing </span>
        </Form.Item>
        <hr />
        <h2>Maintenance</h2>
        <Row>
          <Col span={12}>
            <Form.Item
              htmlFor="lastMaint"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Last Maintenance Done: "
            >
              <Input
                className={`form__input rounded`}
                id="lastMaint"
                name="lastMaint"
                value={lastMaint}
                onChange={onLastMaint}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              htmlFor="type"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Type A-B-C: "
            >
              <Input
                className={`form__input rounded`}
                id="type"
                name="type"
                value={type}
                onChange={onType}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              htmlFor="gendate"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Date: "
            >
              <Input
                className={`form__input rounded`}
                id="gendate"
                name="gendate"
                value={gendate} 
                onChange={onGenDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              htmlFor="gentime"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Time: "
            > 
              <Input
                className={`form__input rounded`}
                id="gentime"
                name="gentime"
                value={gentime}
                onChange={onGenTime}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              htmlFor="lastMaint"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Next Maintenance Done: "
            >
              <Input
                className={`form__input rounded`}
                id="lastMaint"
                name="lastMaint"
                value={lastMaint}
                onChange={onLastMaint}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              htmlFor="type"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Type A-B-C: "
            >
              <Input
                className={`form__input rounded`}
                id="type"
                name="type"
                value={type}
                onChange={onType}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              htmlFor="gendate"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Date: "
            >
              <Input
                className={`form__input rounded`}
                id="gendate"
                name="gendate"
                value={gendate} 
                onChange={onGenDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              htmlFor="gentime"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              label="Time: "
            > 
              <Input
                className={`form__input rounded`}
                id="gentime"
                name="gentime"
                value={gentime}
                onChange={onGenTime}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          htmlFor="remarks"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 22 }}
          label="Overall Remarks: "
        >
          <TextArea
            id="remarks"
            name="remarks"
            value={remarks}
            onChange={onRemark}
          />
        </Form.Item>
        
        <Form.Item
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 20 }}
          className="d-flex align-items-center justify-content-center"
        >
          <Button
            type="primary"
            disabled={!canSave}
            htmlType="submit"
            className="px-5 py-1 h5 text-light"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );

  return content;
};

export default MaintenanceForm;
