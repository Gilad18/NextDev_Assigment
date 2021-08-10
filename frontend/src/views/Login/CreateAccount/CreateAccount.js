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

export default function CreateAccount({ props }) {
  const dispatch = useDispatch();

  const [userInputs, setUserInputs] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    password: "",
    passwordConfirm: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (property, value) => {
    setUserInputs({
      ...userInputs,
      [property]: value,
    });
  };

  const handleSubmit = () => {
    if (userInputs.password !== userInputs.passwordConfirm)
      return setErrorMessage("Passwords are not matched");
    // server call API to create new user if success do the rest of the function, if not -> return after error message
    dispatch(newUser(userInputs));
    auth.login(() => {
      props.history.push("/admin");
    });
  };

  return (
    <>
      <GridContainer alignItems="center">
        <GridItem xs={12} sm={12} md={8}>
          <CardHeader color="primary">
            <h4>Create Your Account</h4>
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
                  labelText="Email Adress"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                    type: "email",
                  }}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="First Name"
                  id="firstName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                  }}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Last Name"
                  id="lastName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                  }}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="City"
                  id="city"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                  }}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Country"
                  id="country"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                  }}
                  onChange={(e) => handleInputChange("country", e.target.value)}
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
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Confirm Password"
                  id="confirmPassword"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                    type: "password",
                  }}
                  onChange={(e) =>
                    handleInputChange("passwordConfirm", e.target.value)
                  }
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <Button color="primary" round onClick={handleSubmit}>
            Create Account
          </Button>
          <p>{errorMessage}</p>
        </GridItem>
      </GridContainer>
    </>
  );
}
