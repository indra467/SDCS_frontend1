import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { Container } from "react-bootstrap";
import { Row, Col, Form, Input, Button, Checkbox, Image } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const Login = () => {
  useTitle("Employee Login");

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  // const content = (
  //   <section className="public">
  //     <header>
  //       <h1>Employee Login</h1>
  //     </header>

  //     <main className="login">
  //       <p ref={errRef} className={errClass} aria-live="assertive">
  //         {errMsg}
  //       </p>

  //       <form className="form" onSubmit={handleSubmit}>
  //         <label htmlFor="username">Employee Id:</label>
  //         <input
  //           className="form__input"
  //           type="text"
  //           id="username"
  //           ref={userRef}
  //           value={username}
  //           onChange={handleUserInput}
  //           autoComplete="off"
  //           required
  //         />

  //         <label htmlFor="password">Password:</label>
  //         <input
  //           className="form__input"
  //           type="password"
  //           id="password"
  //           onChange={handlePwdInput}
  //           value={password}
  //           required
  //         />
  //         <button className="form__submit-button">Sign In</button>

  //         <label htmlFor="persist" className="form__persist">
  //           <input
  //             type="checkbox"
  //             className="form__checkbox"
  //             id="persist"
  //             onChange={handleToggle}
  //             checked={persist}
  //           />
  //           Save login details
  //         </label>
  //       </form>
  //     </main>
  //     <footer>
  //       <Link to="/">Back to Home</Link>
  //     </footer>
  //   </section>
  // );

  // return content
  return (
    <Container className="w-100 h-100 m-0 p-0">
      <Row className="vw-100 vh-100">
        <Col className="p-3 w-50 h-100 bg-light d-flex flex-column justify-content-center">
          <h1 className="text-center text-dark">Login</h1>
          <p className="text-dark text-center">Please enter your employee ID</p>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p ref={errRef} className={errClass} aria-live="assertive">
              {errMsg}
            </p>
            <Form className="login-form" onFinish={handleSubmit} labelAlign="vertical">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your employee id!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  className="form__input"
                  placeholder="Employee ID"
                  ref={userRef}
                  value={username}
                  onChange={handleUserInput}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className="form__input"
                  placeholder="Password"
                  value={password}
                  onChange={handlePwdInput}
                />
              </Form.Item>
              <Form.Item>
                <Checkbox onChange={handleToggle} checked={persist}>
                    Save Login Details
                </Checkbox>
              </Form.Item>
              <Form.Item className="d-flex justify-content-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="align-self-center form__submit-button"
                  onClick={handleSubmit}
                >
                  Log in now
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col className="d-flex w-50 h-100 flex-column justify-content-center align-items-center login_2ndcol">
            <Image preview={false} src="./img/clogo.png" className="login_2ndcol_img" width={`50%`} height={`95%`} />
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
