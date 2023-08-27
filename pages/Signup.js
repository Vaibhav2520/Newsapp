import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputControl from "./InputControl";
import { auth } from "../firebase";

import "../styles/Signup.css";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

function Signup() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        // navigate("/");
        window.location.href="/landing"
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="container-signup">
      <div className="innerBox-signup">
        <h1 className="heading-signup">Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className="footer-signup">
          <b className="error-signup">{errorMsg}</b>
          <Button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </Button>
          <p>
            Already have an account?{" "}
            <span>
              <Button onClick={() => router.push("/Login")}>Login</Button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
