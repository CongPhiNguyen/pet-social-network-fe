import React, { useState, useEffect } from "react"
import { Col, Row, Button, Form, Input, Typography } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { register } from "../redux/actions/authAction"

const { Title } = Typography

const Register = () => {
  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male"
  }

  const { auth, alert } = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const [userData, setUserData] = useState(initialState)
  const { fullname, username, email, password, cf_password } = userData
  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (auth.token) history.push("/")
  }, [auth.token, history])

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register(userData))
  }

  // const onFinish = (values) => {
  //   const { email, password } = values
  //   dispatch(login({ email, password }))
  // }

  return (
    // <Row style={{ width: "100vw" }}>
    //   <Col style={{ height: "100vh" }} xs={0} md={16}>
    //     <div className="login-background"></div>
    //   </Col>
    //   <Col
    //     className="login-form-warpper"
    //     style={{ height: "100vh" }}
    //     xs={24}
    //     md={8}
    //   >
    //     <Form
    //       form={form}
    //       layout="vertical"
    //       name="basic"
    //       initialValues={{
    //         remember: true
    //       }}
    //       style={{ width: "100%" }}
    //       onFinish={onFinish}
    //       autoComplete="off"
    //       size="large"
    //     >
    //       <Title level={2}>Login to Pet Love</Title>
    //       <Form.Item
    //         label="Email address"
    //         name="email"
    //         style={{
    //           width: "100%"
    //         }}
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please input your mail!"
    //           },
    //           {
    //             // eslint-disable-next-line
    //             pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //             message: "Malformed!"
    //           }
    //         ]}
    //       >
    //         <Input />
    //       </Form.Item>
    //       <Form.Item
    //         label="Password"
    //         name="password"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please input your password!"
    //           },
    //           {
    //             min: 6,
    //             message: "Password at least 6 characters!"
    //           }
    //         ]}
    //       >
    //         <Input.Password />
    //       </Form.Item>
    //       <p style={{ marginBottom: "20px" }}>
    //         <Link to="/register" className="forgot-password">
    //           Forgot your password?
    //         </Link>
    //       </p>
    //       <Form.Item>
    //         <Button style={{ width: "100%" }} type="primary" htmlType="submit">
    //           Login
    //         </Button>
    //       </Form.Item>
    //       <p style={{ textAlign: "center" }} className="my-2">
    //         You don't have an account?{" "}
    //         <Link
    //           to="/register"
    //           style={{ color: "crimson", fontWeight: "700" }}
    //         >
    //           Register Now
    //         </Link>
    //       </p>
    //     </Form>
    //   </Col>
    // </Row>
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3
          className="text-uppercase text-center mb-4"
          style={{ color: "red" }}
        >
          V-Network
        </h3>

        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            onChange={handleChangeInput}
            value={fullname}
            style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
          />

          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChangeInput}
            value={username.toLowerCase().replace(/ /g, "")}
            style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
          />

          <small className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={handleChangeInput}
            value={email}
            style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
          />

          <small className="form-text text-danger">
            {alert.email ? alert.email : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
              style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>

          <small className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="cf_password">Confirm Password</label>

          <div className="pass">
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="cf_password"
              onChange={handleChangeInput}
              value={cf_password}
              name="cf_password"
              style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }}
            />

            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>

          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ""}
          </small>
        </div>

        <div className="row justify-content-between mx-0 mb-1">
          <label htmlFor="male">
            Male:{" "}
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor="female">
            Female:{" "}
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor="other">
            Other:{" "}
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Register
        </button>

        <p className="my-2">
          Already have an account?{" "}
          <Link to="/" style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
