import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewDraftMutation } from "./draftsApiSlice";
import { Form, Input, Button, Row, Col, Checkbox, Select } from "antd";
import { Container } from "react-bootstrap";

const MaintenanceForm = ({ users }) => {
  const [form] = Form.useForm();

  const [addNewDraft, { isLoading, isSuccess, isError, error }] =
    useAddNewDraftMutation();

  const navigate = useNavigate();

  const [sl_no, setSl_No] = useState("");
  const [type, setType] = useState("");
  const [equipment, setEquipment] = useState("");
  const [chEngineOil, setChEngineOil] = useState("");
  const [chFuelFilter, setChFuelFilter] = useState("");
  const [chPreFuelFilter, setChPreFuelFilter] = useState("");
  const [userId, setUserId] = useState(users[0].id);
  const [myfile, setpostImage] = useState("")

  useEffect(() => {
    if (isSuccess) {
      setSl_No("");
      setType("");
      setEquipment("");
      setChEngineOil("");
      setChFuelFilter("");
      setChPreFuelFilter("");
      navigate("/dash/drafts");
    }
  }, [isSuccess, navigate]);

  const onSl_no = (e) => setSl_No(e.target.value);
  const onType = (e) => setType(e);
  const onEquipment = (e) => setEquipment(e);
  
   const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    const base64 = await convertToBase64(file);
    console.log(base64)
    setpostImage(base64)

  }

  const canSave =
    [
      sl_no,
      type,
      equipment,
      chEngineOil,
    ].every(Boolean) && !isLoading;

  const onSaveDraftClicked = async (e) => {
    
    if (canSave) {
      await addNewDraft({
        user: userId,
        sl_no,
        type,
        equipment,
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
  const validSl_NoClass = !sl_no ? "form__input--incomplete" : "";
  const validTypeClass = !type
    ? "form__input--incomplete"
    : "";const validEquipmentClass = !equipment ? "form__input--incomplete" : "";

  const options=[{
    key: "1",
    label: "Tyre Mounted",
    value: "Tyre Mounted"
    }]

  const content = (
    <Container className="bg-light text-dark rounded">
      <h2 className="px-5 pt-5 pb-3 text-decoration-underline">Maintenance Form</h2>
      <p className={errClass}>{error?.data?.message}</p>
      <Form form={form} className="" onFinish={onSaveDraftClicked}>
        
        <Row className="d-flex justify-content-between">
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
        </Row>
        <Form.Item labelCol={{span: 7 }} wrapperCol={{ span: 14}} className="d-flex align-items-center justify-content-center">
          <Button type="primary" disabled={!canSave} htmlType="submit" className="px-5 py-1 h5 text-light">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );

  return content;
};

export default MaintenanceForm;
