import React, { useEffect, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import Swal from "sweetalert2";

import { FcGoogle } from "react-icons/fc";
import { RiLoginBoxLine } from "react-icons/ri";
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

import { AuthContext } from "../../auth";
import { useForm } from "../../UI";
import { useAuthLogin } from "../hooks/useAuth";
import { NavBarUI } from "../../UI";
import { CardWithShadow } from "../../UI/components/CardWithShadow";

export const PageAuthLogin = () => {
  const { logged: isLogged = false } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const { authLogin, authGoogleLogin, error, message } = useAuthLogin();

  const hadleOnSubmit = async (e) => {
    e.preventDefault();
    authLogin({ email, password });
  };

  const loginWithGoogle = () => authGoogleLogin();

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        footer: "Error al registrarse en el sistema.",
      });
    }
  }, [error]);

  useEffect(() => {
    if (isLogged) navigate("/dashboard");
  }, [isLogged]);

  return (
    <>
      <NavBarUI />
      <Card>
        <CardBody>
          <Row>
            <Col md="7">
              <Row className="p-5 animate__animated animate__swing">
                <img
                  src="/imgReservationsLogin.webp"
                  alt=""
                  className="rounded-3 "
                />
              </Row>
            </Col>

            <CardWithShadow
              md={4}
              className="mb-5 p-5 mt-5 animate__animated animate__fadeInRight"
            >
              <Form className="login-form m-0 " onSubmit={hadleOnSubmit}>
                <h1> LoginAuth </h1>
                <FormGroup tag={Col} md="11">
                  <Label>Introduce your email </Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="User/username"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />

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

                  <Row className="mt-2">
                    <Col md="6">
                      <Button
                        type="submit"
                        className="mt-2"
                        color="primary"
                        size="lg"
                        block
                      >
                        {" "}
                        Login <RiLoginBoxLine size={27} />
                      </Button>
                    </Col>

                    <Col md="6">
                      <Button
                        onClick={loginWithGoogle}
                        className="mt-2"
                        color="primary"
                        outline
                        size="lg"
                        block
                      >
                        Login with <FcGoogle size={27} />
                      </Button>
                    </Col>

                    <span className="fs-5 mt-2">
                      You dont have account?{" "}
                      <Link to={"/auth/register"}>click here!</Link>
                    </span>
                  </Row>
                </FormGroup>
              </Form>
            </CardWithShadow>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
