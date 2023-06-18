import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  Alert,
  showAlerts,
} from "@material-tailwind/react";
import React from "react";
import Switch from "./Switch";
import { useEffect } from "react";
export function EditProfile() {
  let { state } = useLocation();
  let history = useNavigate();
  const [alert, changAlert] = useState(false);
  const [text, changeColor] = useState("");
  const [step, setstep] = useState(0);
  const [detail, setdetail] = useState({
    about: "",
    profile_photo: "",
    github: "",
    linkedIn: "",
    portfolio: "",
  });
  const [signup, setSignup] = useState({
    first: "",
    last: "",
    dept: "",
    pos: "",
    gen: "female",
    jod: "",
    location: "",
    email: "",
    pass: "",
    about: "",
    profile_photo: "",
    github: "",
    linkedIn: "",
    portfolio: "",
  });
  const laststep = 1;
  let c;
  let ismanager = 0;
  useEffect(() => {
    // console.log("..")
    if (state) {
      let d = {};

      d.first = state.FirstName ? state.FirstName : "";
      d.last = state.LastName ? state.LastName : "";
      d.dept = state.Department ? state.Department : "";
      d.pos = state.Position ? state.Position : "";
      d.gen = state.Gender ? state.Gender : "";
      d.jod = state.JoinDate ? state.JoinDate : "";
      d.location = state.Location ? state.Location : "";
      d.email = state.Email ? state.Email : "";
      d.pass = state.Password ? state.Password : "";
      d.about = state.about ? state.about : "";
      d.profile_photo = state.profile_photo ? state.profile_photo : "";
      d.portfolio = state.portfolio ? state.portfolio : "";
      d.github = state.github ? state.github : "";
      d.linkedIn = state.linkedIn ? state.linkedIn : "";

      setSignup(d);
    }
    // console.log(d)
  }, []);

  const handleClick = async (e) => {
    // console.log(e.target.value)
    let flag = 0;
    if (step == 0) {
      e.preventDefault();

      setstep(1);
    } else {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const key = Object.keys(signup);
      key.forEach((e) => {
        if (
          flag == 1 ||
          e === "about" ||
          e === "profile_photo" ||
          e === "portfolio" ||
          (e === "linkedIn") | (e === "github")
        )
          return;
        if (!signup[e]) {
          changeColor(e, " can't be empty");
          flag = 1;
          changAlert(true);
          return;
        }
        if (e === "email") {
          if (!signup[e].match(validRegex)) {
            changeColor("Enter valid email");
            changAlert(true);
            flag = 1;
            return;
          }
        }
        if (e === "pass") {
          if (signup[e].length < 6) {
            flag = 1;
            changeColor("Min lentgh of password is 6 characters");
            changAlert(true);
            return;
          }
        }
      });
      console.log(flag);
      if (flag === 0) {
        e.preventDefault();
        const d = await fetch(`${import.meta.env.VITE_APP_API_URL}/edit`, {
          method: "POST",
          body: JSON.stringify({
            id: state._id,
            FirstName: signup["first"],
            LastName: signup["last"],
            Gender: signup["gen"],
            JoinDate: signup["jod"],
            Location: signup["location"],
            Department: signup["dept"],
            Position: signup["pos"],
            Email: signup["email"],
            Password: signup["pass"],
            about: signup["about"],
            profile_photo: signup["profile_photo"],
            portfolio: signup["portfolio"],
            github: signup["github"],
            linkedIn: signup["linkedIn"],
          }),
          headers: { "Content-type": "application/json" },
        });
        try {
          const jss = await d.json();
          // console.log(jss)
          if (jss.Success) {
            changAlert(false);
            console.log(jss);
            history("/");
          } else {
            changeColor(jss.message);
            changAlert(true);
            console.log(jss);
          }
        } catch (err) {
          console.log("ghjkl", err);
        }
      }

      //  console.log("Clicked the submit")
    }
  };

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full overflow-visible bg-[url('https://www.bwfund.org/wp-content/uploads/2022/05/Copy-of-Untitled.png')] bg-cover" />

      <Alert
        show={alert}
        color={"red"}
        dismissible={{
          onClose: () => changAlert(false),
        }}
      >
        {text}
      </Alert>
      <div className="absolute  grid h-screen w-screen place-items-center ">
        <div className="absolute -ml-6 block w-29 border bg-white p-6 shadow-lg md:w-28">
          <Typography variant="h3" color="black" className="xl font-bold">
            {state ? "Edit Profile" : "Signup"}
          </Typography>
          <Typography variant="paragraph" color="black" className="text-xs">
            Please fill the from to edit the profile
          </Typography>
          <hr className="my-2 h-2 w-full border-black" />

          {state && signup.first && Switch(step, signup, setSignup, state)}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outlined"
              onClick={(e) => setstep(step - 1)}
              className={`${step === 0 ? "hiden" : ""}`}
            >
              Prev
            </Button>
            <Button variant="gradient" onClick={(e) => handleClick(e)}>
              {step === laststep ? "submit" : "next"}
            </Button>
          </div>
          {!state && (
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign In
                </Typography>
              </Link>
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default EditProfile;
