import loadingGif from "./lion.gif";
import "./App.css";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";


import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/users";

const App = () => {
  const [text, set_Text] = useState("");
  const toastRef = useRef();
  const onButtonClick = () => {
    axios_patch(text);
  };

  const axios_patch = (text) => {
    console.log("HI", `${API_URL}/resetPassword`);
    axios
      .patch(`${API_URL}/resetPassword`, {
        email:`${text}`,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toastRef.current.show({
            severity: "info",
            summary: "Success",
            detail: "New password has been sent to your email",
          });
        } else
          toastRef.current.show({
            severity: "error",
            summary: "Error",
            detail: "Please enter a valid email",
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Toast ref={toastRef} />
      <header className="App-header">
        <img src={loadingGif} alt="wait until the page loads" />
        <p className="welcome">WELCOME TO THE LION'S TERRITORY</p>

        <Card className="Main-Card">
          <p class="title">Enter email to reset password</p>
          <InputText
            className="inputtext p-invalid block"
            value={text}
            onChange={(e) => set_Text(e.target.value)}
          />
          <br />
          <span className="p-buttonset">
            <Button
              label="Reset Password"
              icon="pi pi-check"
              onClick={onButtonClick}
            />
          </span>
        </Card>
      </header>
    </div>
  );
};

export default App;
