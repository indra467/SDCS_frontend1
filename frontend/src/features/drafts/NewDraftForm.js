import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewDraftMutation } from "./draftsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { STATUS } from "../../config/status";
import { PERIOD } from "../../config/period";
import { Form, Input, Button, Select, Row, Col, Checkbox } from "antd";
import { Container } from "react-bootstrap";

const NewDraftForm = ({ users }) => {
  const [form] = Form.useForm();

  const [addNewDraft, { isLoading, isSuccess, isError, error }] =
    useAddNewDraftMutation();

  const navigate = useNavigate();

  const [machine_no, setMachine_No] = useState("");
  const [current_location, setCurrent_location] = useState("");
  const [c_name, setC_name] = useState("");
  const [site_location, setSite_location] = useState("");
  const [userId, setUserId] = useState(users[0].id);
  const [order_duration, setOrder_duration] = useState("");
  const [configuration, setConfiguration] = useState("");
  const [rental_charges, setRental_charges] = useState("");
  const [number_of_shifts, setNumber_of_shifts] = useState("");
  const [mobilization_charges, setMobilization_charges] = useState("");
  const [demobilization_charges, setDemobilization_charges] = useState("");
  const [SDCS_poc, setSDCS_poc] = useState("");
  const [delivery_deadline, setDelivery_deadline] = useState("");
  const [customer_poc, setCustomer_poc] = useState("");
  const [urgency, setUrgency] = useState(false);
  const [myfile, setpostImage] = useState("")

  useEffect(() => {
    if (isSuccess) {
      setMachine_No("");
      setCurrent_location("");
      setC_name("");
      setSite_location("");
      setUserId("");
      setOrder_duration("");
      setConfiguration("");
      setRental_charges("");
      setNumber_of_shifts("");
      setMobilization_charges("");
      setDemobilization_charges("");
      setSDCS_poc("");
      setDelivery_deadline("");
      setCustomer_poc("");
      setUrgency(false);
      setpostImage("");
      navigate("/dash/drafts");
    }
  }, [isSuccess, navigate]);

  const onMachine_No = (e) => setMachine_No(e.target.value);
  const onCurrent_location = (e) => setCurrent_location(e.target.value);
  const onC_nameChanged = (e) => setC_name(e.target.value);
  const onSite_locationChanged = (e) => setSite_location(e.target.value);
  // const onUserIdChanged = e => setUserId(e.target.value)
  const onOrder_durationChanged = (e) => setOrder_duration(e.target.value);
  const onConfigurationChanged = (e) => setConfiguration(e.target.value);
  const onRental_chargesChanged = (e) => setRental_charges(e.target.value);
  const onNumber_of_shiftsChanged = (e) => setNumber_of_shifts(e.target.value);
  const onMobilization_chargesChanged = (e) =>
    setMobilization_charges(e.target.value);
  const onDemobilization_chargesChanged = (e) =>
    setDemobilization_charges(e.target.value);
  const onSDCS_pocChanged = (e) => setSDCS_poc(e.target.value);
  const onDelivery_deadlineChanged = (e) =>
    setDelivery_deadline(e.target.value);
  const onUrgencyChanged = (e) => setUrgency(e.target.value);
  const onCustomer_pocChanged = (e) => setCustomer_poc(e.target.value);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    const base64 = await convertToBase64(file);
    console.log(base64)
    setpostImage(base64)

  }

  const canSave =
    [
      machine_no,
      current_location,
      c_name,
      site_location,
      order_duration,
      configuration,
      rental_charges,
      number_of_shifts,
      mobilization_charges,
      demobilization_charges,
      SDCS_poc,
      delivery_deadline,
      customer_poc,
      urgency,
      userId,
    myfile
    ].every(Boolean) && !isLoading;

  const onSaveDraftClicked = async (e) => {
    
    if (canSave) {
      await addNewDraft({
        user: userId,
        machine_no,
        current_location,
        c_name,
        site_location,
        order_duration,
        configuration,
        rental_charges,
        number_of_shifts,
        mobilization_charges,
        demobilization_charges,
        SDCS_poc,
        delivery_deadline,
        customer_poc,
        urgency,
        myfile
      });
    }
  };
  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload =() => {
        resolve(fileReader.result)
      };
      fileReader.onerror =(error) => {
        reject(error)
      }
    })
  }

  const errClass = isError ? "errmsg" : "offscreen";
  const validMachine_NoClass = !machine_no ? "form__input--incomplete" : "";
  const validCurrent_locationClass = !current_location
    ? "form__input--incomplete"
    : "";
  const validC_nameClass = !c_name ? "form__input--incomplete" : "";
  const validSite_locationClass = !site_location
    ? "form__input--incomplete"
    : "";
  const validOrder_durationClass = !order_duration
    ? "form__input--incomplete"
    : "";
  const validConfigurationClass = !configuration
    ? "form__input--incomplete"
    : "";
  const validRental_chargesClass = !rental_charges
    ? "form__input--incomplete"
    : "";
  const validNumber_of_shiftsClass = !number_of_shifts
    ? "form__input--incomplete"
    : "";
  const validMobilization_chargesClass = !mobilization_charges
    ? "form__input--incomplete"
    : "";
  const validDemobilization_chargesClass = !demobilization_charges
    ? "form__input--incomplete"
    : "";
  const validSDCS_pocClass = !SDCS_poc ? "form__input--incomplete" : "";
  const validDelivery_deadlineClass = !delivery_deadline
    ? "form__input--incomplete"
    : "";
  const validCustomer_pocClass = !customer_poc ? "form__input--incomplete" : "";
  const validUrgencyClass = !urgency ? "form__input--incomplete" : "";

  const content = (
    <Container className="bg-light h-100 text-dark rounded">
      <p className={errClass}>{error?.data?.message}</p>
      <h2>Add New Draft</h2>
      <Form form={form} className="" onFinish={onSaveDraftClicked}>
        <label htmlFor="file-upload" className='custom-file-upload'>Upload pdf</label>
        <input
        type="file"
        label="image"
        name="myfile"
        id="file-upload"
        accept=".pdf, .jpeg, .png, .jpg"
        onChange={(e)=> handleFileUpload(e)}/>
        <Row className="d-flex justify-content-between">
          <Col span={12} className="px-2">
            <Form.Item
              label="Machine No.: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validMachine_NoClass} rounded`}
                name="machine_no"
                value={machine_no}
                onChange={onMachine_No}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="px-2">
            <Form.Item
              label="Current Location: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validCurrent_locationClass} rounded`}
                name="current_location"
                value={current_location}
                onChange={onCurrent_location}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={12} className="px-2">
            <Form.Item
              label="Customer Name: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validC_nameClass} rounded`}
                name="c_name"
                value={c_name}
                onChange={onC_nameChanged}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="px-2">
            <Form.Item
              label="Site Location: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validSite_locationClass} rounded`}
                name="site_location"
                value={site_location}
                onChange={onSite_locationChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={12} className="px-2">
            <Form.Item
              label="Order Duration: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validOrder_durationClass} rounded`}
                name="order_duration"
                value={order_duration}
                onChange={onOrder_durationChanged}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="px-2">
            <Form.Item
              label="Configuration: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validConfigurationClass} rounded`}
                name="configuration"
                value={configuration}
                onChange={onConfigurationChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={12} className="px-2">
            <Form.Item
              label="Rental Charges: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validRental_chargesClass} rounded`}
                name="rental_charges"
                value={rental_charges}
                onChange={onRental_chargesChanged}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="px-2">
            <Form.Item
              label="Number Of Shifts: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validNumber_of_shiftsClass} rounded`}
                name="number_of_shifts"
                value={number_of_shifts}
                onChange={onNumber_of_shiftsChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={12} className="px-2">
            <Form.Item
              label="Mobilization Charges: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validMobilization_chargesClass} rounded`}
                name="mobilization_charges"
                value={mobilization_charges}
                onChange={onMobilization_chargesChanged}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="px-2">
            <Form.Item
              label="Demobilization Charges: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validDemobilization_chargesClass} rounded`}
                name="demobilization_charges"
                value={demobilization_charges}
                onChange={onDemobilization_chargesChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={12} className="px-2">
            <Form.Item
              label="SDCS POC: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validSDCS_pocClass} rounded`}
                name="SDCS_poc"
                value={SDCS_poc}
                onChange={onSDCS_pocChanged}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="px-2">
            <Form.Item
              label="Delivery deadline: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validDelivery_deadlineClass} rounded`}
                name="delivery_deadline"
                value={delivery_deadline}
                onChange={onDelivery_deadlineChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col span={12} className="px-2">
            <Form.Item
              label="Customer POC: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validCustomer_pocClass} rounded`}
                name="customer_poc"
                value={customer_poc}
                onChange={onCustomer_pocChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Col span={12} className="px-2">
          <Form.Item
            label="Mark as urgent"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 14 }}
          >
            <Checkbox
              className={`form__input ${validUrgencyClass} rounded`}
              name="urgency"
              checked={urgency}
              onChange={() => setUrgency(!urgency)}
            />
          </Form.Item>
        </Col>
        <Form.Item labelCol={{span: 7 }} wrapperCol={{ span: 14}} className="d-flex align-items-center justify-content-center">
          <Button type="primary" disabled={!canSave} htmlType="submit" className="px-5 py-1 h5">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );

  return content;
};

export default NewDraftForm;
