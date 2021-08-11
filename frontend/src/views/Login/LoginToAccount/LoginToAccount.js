import React, { useState } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import auth from "../auth";
import Button from "../../../components/CustomButtons/Button";
import { useDispatch } from "react-redux";
import { newUser } from "Redux/actions";
import API from "API/api";
import { toast } from "react-toastify";
import { notification } from "../../Toastify/toastify";

export default function LoginToAccount({ props }) {
  const dispatch = useDispatch();
  const [userInputs, setUserInputs] = useState({ userName: "", password: "" });
  toast.configure();

  const handleInputChange = (property, value) => {
    setUserInputs({
      ...userInputs,
      [property]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const attempLogin = await API("/login", {
        method: "post",
        data: { ...userInputs },
      });
      if (attempLogin.data) {
        notification(
          `Hey ${attempLogin.data.user.firstName}, great to see you again`,
          toast.POSITION.TOP_CENTER
        );
        dispatch(newUser(attempLogin.data.user));
        localStorage.setItem("token", attempLogin.data.token);
        auth.login(() => {
          props.history.push("/admin");
        });
      }
    } catch (err) {
      console.log(err);
      //error message
    }
  };

  return (
    <>
      <GridContainer alignItems="center">
        <GridItem xs={12} sm={12} md={8}>
          <CardHeader color="primary">
            <h4>Login To Your Account</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="User Name"
                  id="userName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                  }}
                  onChange={(e) =>
                    handleInputChange("userName", e.target.value)
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                    type: "password",
                  }}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <Button color="primary" round onClick={handleSubmit}>
            Log In
          </Button>
        </GridItem>
      </GridContainer>
    </>
  );
}
