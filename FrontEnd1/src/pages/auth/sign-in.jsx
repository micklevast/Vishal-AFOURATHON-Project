import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
  showAlerts,
} from "@material-tailwind/react";
import { useCookies } from "react-cookie";

export function SignIn({ state }) {
  let axiosConfig = {
    withCredentials: true,
  };
  const [cookie, setCookie] = useCookies();
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [alert, changAlert] = useState(false);
  const [text, changeColor] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useNavigate();
  // const {state} = useLocation();

  useEffect(() => {
    if (state) {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      state = false;
    }
  }, []);
  const handleClick = async (e) => {
    // console.log(e)
    setLoading(true);
    if (!email.length) {
      changeColor("Email can't be empty");
      changAlert(true);
      return;
    } else {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email.match(validRegex)) {
        changeColor("Enter valid email");
        changAlert(true);
        return;
      }
    }
    if (!password.length) {
      changeColor("Password can't be empty");
      changAlert(true);
      return;
    }
    const data = { email, password };
    // console.log(data)
    await axios
      .post(
        `${import.meta.env.VITE_APP_API_URL}/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((d) => {
        setLoading(false);

        const jss = d.data;
        // console.log(jss)
        if (!jss.Success) {
          changeColor(jss.message);
          console.log(
            "gooted error in frontend:" + jss.message + " And email:" + email
          );
          changAlert(true);
        } else {
          setCookie("jwt", jss.jwt);
          setCookie("name", jss.name);
          changAlert(false);
          history("/");
        }
      })
      .catch((err) => {
        console.log("err", err);
        changeColor(err.message);
        console.log("catched block:" + err.message + " And email:" + email);
        changAlert(true);
      });
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
      {loading && (
        <>
          <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <span>Loading</span>
          </div>
        </>
      )}
      {!loading && (
        <div className="absolute  grid h-screen w-screen place-items-center ">
          <div className="md:w-22 absolute -mt-20 -ml-6 block w-29 border bg-white p-6 shadow-lg">
            <Typography variant="h3" color="black" className="xl font-bold">
              SignIn
            </Typography>
            <Typography variant="paragraph" color="black" className="text-xs">
              Please fill the from to login
            </Typography>
            <hr className="my-2 h-2 w-full border-black" />

            <div className="mb-3">
              {/* <input type="text" id="small-input" className="block w-full px-3 py-2 border border-gray-300  focus:outline-blue-500"  placeholder="Department"/> */}
              <input
                type="email"
                id="Email"
                className="black mb-3 block w-full border border-gray-300 px-3 py-2.5 text-base focus:outline-blue-500 sm:text-xs"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => changeEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-5 md:mb-6">
              {/* <input type="text" id="small-input" className="block w-full px-3 py-2 border border-gray-300  focus:outline-blue-500"  placeholder="Department"/> */}
              <input
                type="password"
                id="password"
                className="black mb-3 block w-full border border-gray-300 px-3 py-2.5 text-base capitalize focus:outline-blue-500 sm:text-xs"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => changePassword(e.target.value)}
                required
              />
            </div>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
            {/* <input type="submit" id="password" className="block w-full px-3 py-2.5 mb-3 black border bg-blue-500 text-white font-bold text-base focus:outline-blue-500" placeholder="Enter Password"/> */}
            <Button
              variant="gradient"
              className="text-sm"
              onClick={handleClick}
              fullWidth
            >
              Sign In
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign Up
                </Typography>
              </Link>
            </Typography>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
