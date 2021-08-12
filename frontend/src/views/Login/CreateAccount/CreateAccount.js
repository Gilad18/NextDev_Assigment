import React, { useState } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import auth from "../auth";
import Button from "../../../components/CustomButtons/Button";
import { useDispatch } from "react-redux";
import { newUser } from "Redux/actions";
import API from "API/api";
import { toast } from "react-toastify";
import { notification } from "../../Toastify/toastify";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  pageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
    top: "15vh",
    left: "25vw",
  },
};

const useStyles = makeStyles(styles);

export default function CreateAccount({ props }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userInputs, setUserInputs] = useState({
    userName: null,
    email: null,
    firstName: null,
    lastName: null,
    city: "",
    country: "",
    password: null,
    passwordConfirm: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  toast.configure();

  const handleInputChange = (property, value) => {
    setErrorMessage("");
    setUserInputs({
      ...userInputs,
      [property]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !userInputs.userName ||
      !userInputs.email ||
      !userInputs.firstName ||
      !userInputs.password
    )
      return setErrorMessage("some detials are missing");
    if (userInputs.password !== userInputs.passwordConfirm)
      return setErrorMessage("Passwords are not matched");
    try {
      setLoading(true);
      const newAccount = await API("/newUser", {
        method: "post",
        data: { ...userInputs },
      });
      if (newAccount.data) {
        setLoading(false);
        notification(
          `Welcome aboard ${newAccount.data.newUser.firstName}, We so happy to have you here!`,
          toast.POSITION.TOP_CENTER
        );
        dispatch(newUser(newAccount.data.newUser));
        localStorage.setItem("token", newAccount.data.token);
        auth.login(() => {
          props.history.push("/admin");
        });
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className={classes.pageContainer}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <CardHeader color="primary">
            <h4>Create Your Account</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="User Name"
                  id="userName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                    required: true,
                  }}
                  onChange={(e) =>
                    handleInputChange("userName", e.target.value)
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Email Adress"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    type: "email",
                  }}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="First Name"
                  id="firstName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                  }}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Last Name"
                  id="lastName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                  }}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
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
              <GridItem xs={12} sm={12} md={6}>
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
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    type: "password",
                  }}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Confirm Password"
                  id="confirmPassword"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
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
          {loading && <CircularProgress />}
        </GridItem>
      </GridContainer>
    </div>
  );
}
