import React, { useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Label,
} from "reactstrap";

import { AuthContext } from "..";
import { useForm } from "../../UI";
import { useAuthLogin } from "../hooks/useAuth";
import { NavBarUI } from "../../UI";
import { Alert } from "react-bootstrap";
import { CardWithShadow } from "../../UI/components/CardWithShadow";

export const PageAuthRegister = () => {
  const { logged: isLogged = false } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password, password2, handleInputChange } = useForm({
    email: "",
    password: "",
    password2: ""
  });

  const { authRegister, isValidPassword, passwordError, error, message } = useAuthLogin();

  const hadleOnSubmit = async (e) => {
    e.preventDefault();
    authRegister({ email, password})
    //authLogin({ userLogin: username, password });
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        footer: "Error al ingresar al sistema.",
      });
    }
  }, [error]);

  useEffect(() => {
    if (isLogged) navigate("/dashboard");
  }, [isLogged]);

  useEffect(() => {
    isValidPassword(password)
  }, [password])

  return (
    <>
      <NavBarUI />
      <Card>
        <CardBody>

          <Row>
            <Col md="7">
              <Row className="p-5 animate__animated animate__swing">
                <img
                  src="/imgRestaurantLogin.webp"
                  alt=""
                  className="rounded-3"
                />
              </Row>
            </Col>

            <CardWithShadow md={4} className="mb-5 p-5 mt-5 animate__animated animate__fadeInRight">
            <Form className="login-form m-0 " onSubmit={hadleOnSubmit}>
                <h1> Register </h1>
                <FormGroup tag={Col} md="11">
                  <Label> Introduce email </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />

                  {/* <Label> username: </Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    value={username}
                    onChange={handleInputChange}
                    required
                  /> */}

                  <Label> Introduce password </Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password/Contraseña"
                    value={password}
                    onChange={handleInputChange}
                    required
                  />

                  <Label> Introduce password again</Label>
                  <Input
                    disabled={passwordError || password ===""}
                    type="password"
                    name="password2"
                    id="password2"
                    placeholder="Password/Contraseña"
                    value={password2}
                    onChange={handleInputChange}
                    required
                  />

                  {passwordError &&
                    <Alert variant={"warning"} className="mt-2">
                      {passwordError}
                    </Alert>
                  }

                  <Button
                    type="submit"
                    className="mt-2"
                    color="primary"
                    size="lg"
                    block
                  >
                    Register{" "}
                  </Button>

                </FormGroup>
              </Form>
            </CardWithShadow>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
