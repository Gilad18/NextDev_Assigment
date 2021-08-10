import React, { useState } from "react";
import Button from "components/CustomButtons/Button.js";
import auth from "./auth";
import CreateAccount from "./CreateAccount/CreateAccount";
import LoginToAccount from "./LoginToAccount/LoginToAccount";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  container: {
    width: "100vw",
    hieght: "100vh",
    display: "flex",
    justifyContent: "center",
  },
};

const useStyles = makeStyles(styles);

export const Login = (props) => {
  const classes = useStyles();

  const [hasAnAccount, setHasAnAccount] = useState(false);
  return (
    <div className={classes.container}>
      <GridItem>
        {!hasAnAccount ? (
          <>
            <CreateAccount />
            <p>
              Alreday have an account? Click{" "}
              <a onClick={() => setHasAnAccount(!hasAnAccount)}>HERE</a>
            </p>
          </>
        ) : (
          <>
            <LoginToAccount />
            <p onClick={() => setHasAnAccount(!hasAnAccount)}>
              Don't have an account yet? Click{" "}
              <a onClick={() => setHasAnAccount(!hasAnAccount)}>HERE</a>
            </p>
          </>
        )}
        <Button
          color="primary"
          round
          onClick={() => {
            auth.login(() => {
              props.history.push("/admin");
            });
          }}
        >
          LOG IN
        </Button>
      </GridItem>
    </div>
  );
};
