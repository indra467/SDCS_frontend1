import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewMentoMutation } from "./mentosApiSlice";
import { Form, Input, Button, Row, Col, Checkbox } from "antd";
import { Container } from "react-bootstrap";
import TextArea from "antd/es/input/TextArea";
import Styles from "./Mento.module.css";

const NewMentoForm2 = ({ users }) => {
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
      overall,
    ].every(Boolean) && !isLoading;
  
  const onSaveMentoClicked = async (e) => {
    console.log({user: userId,
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
      central_greasing2});
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
        central_greasing2,
      });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validFleet_numberClass = !fleet_number ? "form__input--incomplete" : "";

  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Details",
      fields: [
        { name: "operator_name", label: "Operator Name",value: operator_name },
        { name: "fleet_number", label: "Fleet Number", value: fleet_number },
        { name: "date", label: "Date", value: date },
        { name: "week", label: "Week", value: week },
        { name: "location", label: "Location", value: location },
        { name: "country", label: "Country", value: country },
        { name: "hr_up", label: "Hour Ups", value: hr_up },
        { name: "hr_uns", label: "Hour Uns", value: hr_uns },
      ],
    },
    {
      title: "Inspection",
      fields: [
        { name: "tt_1", label: "Check Track Tension", type: "checkbox", checked: tt_1 },
        { name: "tt_2", label: "Check Track Tension", type: "checkbox", checked: tt_2 },
        { name: "tt_3", label: "Check Track Tension", type: "checkbox", checked: tt_3 },
        { name: "tt_4", label: "Check Track Tension", type: "checkbox", checked: tt_4 },
        { name: "tyre_p", label: "Check Tyre Pressure", type: "checkbox", checked: tyre_p },
        { name: "tyre_c", label: "Check Tyre Condition", type: "checkbox", checked: tyre_c },
        {
          name: "centarl_greasing",
          label: "Check level of Central Greasing System",
          type: "checkbox",
          checked: centarl_greasing,
        },
        {
          name: "lower_oil",
          label: "Check coolant of Lower Engine",
          type: "checkbox",
          checked: lower_oil,
        },
        {
          name: "lower_coolant",
          label: "Check coolant of Lower Engine",
          type: "checkbox",
          checked: lower_coolant,
        },
      ],
    },
    {
      title: "Crane Superstructure",
      fields: [
        {
          name: "design_oil1",
          label: "Check Design Oil Level",
          type: "checkbox",
          checked: design_oil1,
        },
        {
          name: "design_oil2",
          label: "Check Design Oil Level",
          type: "checkbox",
          checked: design_oil2,
        },
        {
          name: "pump_oil",
          label: "Pump distributer gearbox oil level check",
          type: "checkbox",
          checked: pump_oil,
        },
        {
          name: "winches_oil",
          label: "Winches oil level check",
          type: "checkbox",
          checked: winches_oil,
        },
        {
          name: "winches_grease",
          label: "Winches greased well check",
          type: "checkbox",
          checked: winches_grease,
        },
        {
          name: "hydraulic_oil",
          label: "Hydraulic system oil level check",
          type: "checkbox",
          checked: hydraulic_oil,
        },
      ],
    },
    {
      title: "General",
      fields: [
        { name: "leakage", label: "Check for leakage", type: "checkbox", checked: leakage },
        {
          name: "centarl_greasing2",
          label: "Check level of Central Greasing System",
          type: "checkbox",
          checked: central_greasing2,
        },
      ],
    },
    {
      title: "Maintenance",
      fields: [
        { name: "last_done", label: "Last Maintenance Done" , value: last_done},
        { name: "type1", label: "Type-A-B-C", value: type1},
        { name: "date2", label: "Date", value: date2 },
        { name: "hour2", label: "Hour", value: hour2 },
        { name: "next_done", label: "Next Maintenance", value: next_done },
        { name: "type2", label: "Type-A-B-C", value: type2 },
        { name: "date3", label: "Date", value: date3 },
        { name: "hour3", label: "Hour", value: hour3 },
        { name: "overall", label: "Overall Remarks", type: "textarea", value: overall },
      ],
    },
  ];

  const handleChange = (e) => {
    switch (e.target.name) {
      case "operator_name":
        setOperator_name(e.target.value);
        break;
      case "fleet_number":
        setFleet_number(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "week":
        setWeek(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      case "country":
        setCountry(e.target.value);
        break;
      case "hr_up":
        setHr_up(e.target.value);
        break;
      case "hr_uns":
        setHr_uns(e.target.value);
        break;
        case "last_done":
            setLast_done(e.target.value);
            break;
        case "next_done":
            setNext_done(e.target.value);
            break;
        case "type1":
            setType1(e.target.value);
            break;
        case "type2":
            setType2(e.target.value);
            break;
        case "date2":
            setDate2(e.target.value);
            break;
        case "date3":
            setDate3(e.target.value);
            break;
        case "hour2":
            setHour2(e.target.value);
            break;
        case "hour3":
            setHour3(e.target.value);
            break;
        case "overall":
            setOverall(e.target.value);
            break;
        default:
            break;
    }
  };
    const handleCheck = (e) => {
        switch (e.target.name) {
            case "tt_1":
                setTt_1(!tt_1);
                break;
            case "tt_2":
                setTt_2(!tt_2);
                break;
            case "tt_3":
                setTt_3(!tt_3);
                break;
            case "tt_4":
                setTt_4(!tt_4);
                break;
            case "tyre_p":
                setTyre_p(!tyre_p);
                break;
            case "tyre_c":
                setTyre_c(!tyre_c);
                break;
            case "centarl_greasing":
                setCentarl_greasing(!centarl_greasing);
                break;
            case "lower_oil":
                setLower_oil(!lower_oil);
                break;
            case "lower_coolant":
                setLower_coolant(!lower_coolant);
                break;
            case "design_oil1":
                setDesign_oil1(!design_oil1);
                break;
            case "design_oil2":
                setDesign_oil2(!design_oil2);
                break;
            case "pump_oil":
                setPump_oil(!pump_oil);
                break;
            case "winches_oil":
                setWinches_oil(!winches_oil);
                break;
            case "winches_grease":
                setWinches_grease(!winches_grease);
                break;
            case "hydraulic_oil":
                setHydraulic_oil(!hydraulic_oil);
                break;
            case "leakage":
                setLeakage(!leakage);
                break;
            case "central_greasing2":
                setCentral_greasing2(!central_greasing2);
                break;
        }
    };

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className={`${Styles.cont_parent}`}>
      <Container className={`${Styles.cont} bg-light text-dark rounded `}>
        <h2 className="text-center p-5">
          Add New Machine for Maintenance
        </h2>
        <p className={errClass}>{error?.data?.message}</p>
        <div className={`w-75 mx-auto ${Styles.step_dots}`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`${Styles.step_dot} ${
                index + 1 <= step ? Styles.active : ""
              } ${index === step ? Styles.working : ""}`}
              onClick={() => setStep(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <Form
          form={form}
          layout="vertical"
          name="newMentoForm"
          onFinish={onSaveMentoClicked}
          className={`${Styles.form_menta} mx-auto w-75 align-self-center rounded border p-4`}
        >
          <h3 className="pl-3">{steps[step].title}</h3>
          <p className="pl-3 text-muted">Step {step + 1} of 5</p>
          {steps[step].fields.map((field) =>
            field.type === "textarea" ? (
              <Form.Item
                key={field.name}
                className={`${Styles.inline} pl-2 col-12`}
                label={field.label}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 22 }}
                rules={[{ required: true }]}
              >
                <TextArea
                  className={`form__input rounded ${Styles.inline}`}
                  name={field.name}
                  onChange={handleChange}
                  value={field.value}
                />
              </Form.Item>
            ) : field.type === `checkbox` ? (
              <Form.Item
              key={field.name}
              className={`${Styles.inline} d-flex align-items-center col-6`}  
              htmlFor={field.name}
              >
                <Checkbox
                  id="lower_coolant"
                  name={field.name}
                  checked={field.checked}
                  onChange={handleCheck}
                />
                <span className="ml-3">{field.label}</span>
              </Form.Item>
            ) : (
              <Form.Item
                key={field.name}
                className={`${Styles.inline} col-6`}
                label={field.label}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 20 }}
                rules={[{ required: true }]}
              >
                <Input
                  className={`form__input rounded ${Styles.inline}`}
                  name={field.name}
                  onChange={handleChange}
                  value={field.value}
                />
              </Form.Item>
            )
            )}
            {step > 0 && (
              <Button
                type="secondary"
                onClick={()=> setStep(step-1)}
                id="button_save"
                className="ml-3 px-5 py-1 h5 text-light bg-dark"
              >
                Previous
              </Button>
            )}
          {step < 4 && (
            <Button
              type="secondary"
              onClick={handleNext}
              id="button_save"
              className="ml-3 px-5 py-1 h5 text-light bg-dark"
            >
              Next
            </Button>
          )}
          {step >= 4 && (
            <Button
              type="primary"
              htmlType="submit"
              disabled={!canSave}
              className="ml-3 mt-4 px-5 py-1 h5 text-light bg-dark"
            >
              Submit
            </Button>
          )}
        </Form>
      </Container>
    </div>
  );
};
export default NewMentoForm2;
