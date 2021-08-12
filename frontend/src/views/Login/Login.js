import React, { useState } from "react";
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
  textBold: {
    fontWeight: "bold",
    color: "#9c27b0",
  },
};

const useStyles = makeStyles(styles);

export const Login = (props) => {
  const classes = useStyles();
  console.log(props);

  const [hasAnAccount, setHasAnAccount] = useState(false);
  return (
    <div className={classes.container}>
      <GridItem>
        {hasAnAccount ? (
          <>
            <p>
              Alreday have an account? Click{" "}
              <span
                className={classes.textBold}
                onClick={() => setHasAnAccount(!hasAnAccount)}
              >
                HERE
              </span>
            </p>
            <CreateAccount props={props} />
          </>
        ) : (
          <>
            <p onClick={() => setHasAnAccount(!hasAnAccount)}>
              Don't have an account yet? Click{" "}
              <span
                className={classes.textBold}
                onClick={() => setHasAnAccount(!hasAnAccount)}
              >
                HERE
              </span>
            </p>
            <LoginToAccount props={props} />
          </>
        )}
      </GridItem>
    </div>
  );
};
