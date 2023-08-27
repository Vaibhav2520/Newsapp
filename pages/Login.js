import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "./InputControl";
import { auth } from "../firebase";

import "../styles/Login.css";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

function Login() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        // router("/");
        window.location.href="/landing"
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className="container-login">
      <div className="innerBox-login">
        <h1 className="heading-login">Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className="footer -login">
          <b className="error-login">{errorMsg}</b>
          <Button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </Button>
          <p>
            Already have an account?{" "}
            <span>
              <Button onClick={() => router.push("/Signup")}>Signup</Button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
