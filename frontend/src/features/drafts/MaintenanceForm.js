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
  Select,
  DatePicker,
} from "antd";
import { Container } from "react-bootstrap";

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
  const [hrsUp, setHrsUp] =useState("");
  const [hrsUns, setHrsUns] =useState("");
  const [tension, setTension]=useState(false);

  const [equipment, setEquipment] = useState("");
  const [chEngineOil, setChEngineOil] = useState("");
  const [chFuelFilter, setChFuelFilter] = useState("");
  const [chPreFuelFilter, setChPreFuelFilter] = useState("");
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

      setEquipment("");
      setChEngineOil("");
      setChFuelFilter("");
      setChPreFuelFilter("");
      navigate("/dash/drafts");
    }
  }, [isSuccess, navigate]);

  const onOpName = (e) => setOpName(e.target.value);
  const onFleetNo = (e) => setFleetNo(e.target.value);
  const onDate = (e, s) => {
    console.log(s);
    setDate(e);
  };
  const onWeek = (e) => setWeek(e.target.value);
  const onLocation = (e) => setLocation(e.target.value);
  const onCountry = (e) => setCountry(e.target.value);
  const onCraneType = (e) => setCraneType(e.target.value);
  const onHrsUp = (e)=> setHrsUp(e.target.value);
  const onHrsUns = (e)=> setHrsUns(e.target.value);
  
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
      equipment,
      chEngineOil,
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
        {
          // (
          /* <Row className="d-flex justify-content-between">
          <Col span={6} className="px-2">
            <Form.Item
              label="Serial No: "
              labelCol={{ span: 11 }}
              wrapperCol={{ span: 7 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validSl_NoClass} rounded`}
                name="sl_no"
                value={sl_no}
                onChange={onSl_no}
              />
            </Form.Item>
          </Col>
          <Col span={8} className="px-2">
            <Form.Item
              label="Type: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true }]}
            >
              <Select options={options}
                className={`form__input ${validTypeClass} rounded`}
                name="type"
                value={type}
                onChange={onType}
              />
            </Form.Item>
          </Col>
          <Col span={10} className="px-2">
            <Form.Item
              label="Equipment No: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 10 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validEquipmentClass} rounded`}
                name="sl_no"
                value={sl_no}
                onChange={onEquipment}
              />
            </Form.Item>
          </Col>
        </Row>
        <h4 className="px-3 pb-2 text-dark">Engine</h4>
        <Row className="px-5 d-flex flex-row justify-content-between ">
          <Form.Item label="Change Oil Filter: ">
            <Input name="chEngineOil" value={chEngineOil} onChange={()=>setChEngineOil(!chEngineOil)}/>
          </Form.Item>
          <Form.Item label="Change Fuel Filter: ">
            <Checkbox name="chFuelFilter" checked={chFuelFilter} onChange={()=>setChFuelFilter(!chFuelFilter)}/>
          </Form.Item>
          <Form.Item label="Change pre-fuel Filter: ">
            <Checkbox name="chPreFuelFilter" checked={chPreFuelFilter} onChange={()=>setChPreFuelFilter(!chPreFuelFilter)}/>
          </Form.Item>
        </Row> */
          // )
        }
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
              <DatePicker
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
        <Form.Item htmlFor="tension" className="d-flex align-items-center gap-5"> 
          <Checkbox id="tension" name="tension" checked={tension} onChange={()=>setTension(!tension)}/>
          <span className="ml-3">Check Crane Tension</span>
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
