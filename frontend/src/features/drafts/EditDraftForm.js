import { useState, useEffect } from "react";
import {
  useUpdateDraftMutation,
  useDeleteDraftMutation,
} from "./draftsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import Styles from "./Draft.module.css";
import { Form, Input, Button, Row, Col, Checkbox } from "antd";
import { Container } from "react-bootstrap";
const EditDraftForm = ({ draft, users }) => {
  const [form] = Form.useForm();
  const { isManager, isAdmin, isOperation_Employee, isBilling_Employee } =
    useAuth();

  const [updateDraft, { isLoading, isSuccess, isError, error }] =
    useUpdateDraftMutation();

  const [
    deleteDraft,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteDraftMutation();

  const navigate = useNavigate();

  const [machine_no, setMachine_No] = useState(draft.machine_no);
  const [current_location, setCurrent_location] = useState(
    draft.current_location
  );
  const [c_name, setC_name] = useState(draft.c_name);
  const [site_location, setSite_location] = useState(draft.site_location);
  const [userId, setUserId] = useState(users[0].id);
  const [order_duration, setOrder_duration] = useState(draft.order_duration);
  const [configuration, setConfiguration] = useState(draft.configuration);
  const [rental_charges, setRental_charges] = useState(draft.rental_charges);
  const [number_of_shifts, setNumber_of_shifts] = useState(
    draft.number_of_shifts
  );
  const [mobilization_charges, setMobilization_charges] = useState(
    draft.mobilization_charges
  );
  const [demobilization_charges, setDemobilization_charges] = useState(
    draft.demobilization_charges
  );
  const [SDCS_poc, setSDCS_poc] = useState(draft.SDCS_poc);
  const [delivery_deadline, setDelivery_deadline] = useState(
    draft.delivery_deadline
  );
  const [customer_poc, setCustomer_poc] = useState(draft.customer_poc);
  const [urgency, setUrgency] = useState(draft.urgency);
  const [SDG_id, setSDG_id] = useState(draft.SDG_id);
  const [client, setClient] = useState(draft.client);
  const [current_location2, setCurrent_location2] = useState(
    draft.current_location2
  );
  const [invoice_description, setInvoice_description] = useState(
    draft.invoice_description
  );
  const [billing_period, setBilling_period] = useState(draft.billing_period);
  const [remarks, setRemarks] = useState(draft.remarks);
  const [myfile2, setpostImage] = useState("");
  const [myfile3, setpostImage2] = useState("");
  //const [myfile, setpostImage] = useState(draft.myfile);
  /*const temp = `${draft.myfile}`
  const blob = new Blob([window.atob(temp)], {
    type: "application/pdf"
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob)*/

  function downloadPDF(pdf) {
    const linksource = draft.myfile;

    const link = document.createElement("a");
    const filename = `${draft.machine_no}.pdf`;
    link.href = linksource;
    link.download = filename;
    link.click();
  }

  function downloadPDF2(pdf) {
    const linksource = draft.myfile2;

    const link = document.createElement("a");
    const filename = `${draft.machine_no}.pdf`;
    link.href = linksource;
    link.download = filename;
    link.click();
  }
  function downloadPDF3(pdf) {
    const linksource = draft.myfile3;

    const link = document.createElement("a");
    const filename = `${draft.machine_no}.pdf`;
    link.href = linksource;
    link.download = filename;
    link.click();
  }

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
      setSDG_id("");
      setClient("");
      setCurrent_location2("");
      setInvoice_description("");
      setBilling_period("");
      setRemarks("");
      setpostImage("");
      setpostImage2("");
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
  const onSDG_idChanged = (e) => setSDG_id(e.target.value);
  const onClientChanged = (e) => setClient(e.target.value);
  const onCurrent_location2Changed = (e) =>
    setCurrent_location2(e.target.value);
  const onInvoice_descriptionChanged = (e) =>
    setInvoice_description(e.target.value);
  const onBilling_periodChanged = (e) => setBilling_period(e.target.value);
  const onRemarksChanged = (e) => setRemarks(e.target.value);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    console.log(base64);
    setpostImage(base64);
  };
  const handleFileUpload3 = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    console.log(base64);
    setpostImage2(base64);
  };

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
      // urgency,
      userId,
      SDG_id,
      client,
      current_location2,
      invoice_description,
      billing_period,
      remarks,
    ].every(Boolean) && !isLoading;

  const onSaveDraftClicked = async (e) => {
    if (canSave) {
      await updateDraft({
        id: draft.id,
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
        SDG_id,
        client,
        current_location2,
        invoice_description,
        billing_period,
        remarks,
        myfile2,
        myfile3,
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
  const onDeleteDraftClicked = async () => {
    await deleteDraft({ id: draft.id });
  };

  const created = new Date(draft.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(draft.updatedAt).toLocaleString("en-US", {
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

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className={`${Styles.icon_button}`}
        title="Delete"
        onClick={onDeleteDraftClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  const content = (
    <Container className="bg-light text-dark rounded">
      <h2 className="px-5 pt-5 pb-3 text-decoration-underline">
        Add New Draft
      </h2>
      <p className={errClass}>{error?.data?.message}</p>

      <Form form={form} className="" onFinish={onSaveDraftClicked}>
        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Machine No.: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Current Location: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Customer Name: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Site Location: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Order Duration: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Configuration: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Rental Charges: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Number Of Shifts: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Mobilization Charges: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Demobilization Charges: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="SDCS POC: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Delivery deadline: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
          <Col span={11} className="px-2">
            <Form.Item
              label="Customer POC: "
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
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
        <Col span={11} className="px-2">
          <Form.Item
            label="Urgency"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
          >
            <Checkbox
              className={`form__input ${validUrgencyClass} rounded`}
              name="urgency"
              checked={urgency}
              onChange={() => setUrgency(!urgency)}
            />
          </Form.Item>
        </Col>

        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="SDG ID"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validSDCS_pocClass} rounded`}
                name="SDG_id"
                value={SDG_id}
                onChange={onSDG_idChanged}
              />
            </Form.Item>
          </Col>
          <Col span={11} className="px-2">
            <Form.Item
              label="Client"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validDelivery_deadlineClass} rounded`}
                name="Client"
                value={client}
                onChange={onClientChanged}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Current Location"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validSDCS_pocClass} rounded`}
                name="current_location2"
                value={current_location2}
                onChange={onCurrent_location2Changed}
              />
            </Form.Item>
          </Col>
          <Col span={11} className="px-2">
            <Form.Item
              label="Invoice Description"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validDelivery_deadlineClass} rounded`}
                name="invoice_description"
                value={invoice_description}
                onChange={onInvoice_descriptionChanged}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className="d-flex justify-content-between">
          <Col span={11} className="px-2">
            <Form.Item
              label="Billing Period"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validSDCS_pocClass} rounded`}
                name="billing_period"
                value={billing_period}
                onChange={onBilling_periodChanged}
              />
            </Form.Item>
          </Col>
          <Col span={11} className="px-2">
            <Form.Item
              label="Remarks"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true }]}
            >
              <Input
                className={`form__input ${validDelivery_deadlineClass} rounded`}
                name="remarks"
                value={remarks}
                onChange={onRemarksChanged}
              />
            </Form.Item>
          </Col>
        </Row>

        {isOperation_Employee && (
          <Row className="d-flex justify-content-between">
            <Col span={11} className="px-2">
              {/* <label htmlFor="file-upload" className='custom-file-upload'>Upload pdf</label>
               */}
              <Form.Item
                label="Upload Doc from operation section"
                htmlFor="file-upload"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                rules={[{ required: true }]}
              >
                <input
                  type="file"
                  label="image"
                  name="myfile2"
                  id="file-upload"
                  accept=".pdf, .jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload(e)}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        {isBilling_Employee && (
          <Row className="d-flex justify-content-between">
            <Col span={11}>
                
            </Col>
            <Col span={12} className="px-2">
              {/* <label htmlFor="file-upload" className='custom-file-upload'>Upload pdf</label>
               */}
              <Form.Item
                label="Upload Doc from billing section"
                htmlFor="file-upload"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                rules={[{ required: true }]}
              >
                <input
                  type="file"
                  label="image"
                  name="myfile3"
                  id="file-upload"
                  accept=".pdf, .jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload3(e)}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <iframe src={draft.myfile} title="=MYFile1"></iframe>
        <button onClick={downloadPDF}>Download</button>
        {(isBilling_Employee || isAdmin) && (
          <iframe src={draft.myfile2} title="Myfile2"></iframe>
        )}
        {(isBilling_Employee || isAdmin) && (
          <button onClick={downloadPDF2}>Download</button>
        )}
        {isAdmin && <iframe src={draft.myfile3} title="Myfile3"></iframe>}
        {isAdmin && <button onClick={downloadPDF3}>Download</button>}

        <Form.Item
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
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

export default EditDraftForm;
