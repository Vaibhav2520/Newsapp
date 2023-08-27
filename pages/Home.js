import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/base";
import { auth } from "@/firebase";

const Home = (props) => {
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/Login")}>
        <h1>Login</h1>
      </Button>
      <br />
      <Button onClick={() => router.push("/Signup")}>
        <h1>Signup</h1>
      </Button>
      <br />
      <br />
      <br />

      <h2>{userName ? `Welcome - ${userName}` : "Login please"}</h2>
    </div>
  );
};

export default Home;
