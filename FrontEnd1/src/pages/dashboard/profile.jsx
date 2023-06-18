import { useEffect } from "react";
import { useCookies } from "react-cookie";
// import icon from '../public/img/location-icon.png';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  IconButton,
  TabsHeader,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tab,
  Switch,
  Tooltip,
  Button,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  ExclamationCircleIcon,
  DocumentTextIcon,
  MapIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import axios from "axios";
import { useState } from "react";
import Info from "./Profile/Info";
import Skill_card from "./Profile/Skill_card";
import { fetchData } from "./Profile/fetchData";
import Contact from "./Profile/Contact";
export function Profile() {
  const [date, setDate] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  let history = useNavigate();
  useEffect(() => {
    async function fetchData(token) {
      //  console.log(token)
      await axios
        .post(
          `${import.meta.env.VITE_APP_API_URL}/employee/123`,
          {
            cookie: token,
          },
          {
            withCredentials: true,
          } // could also try 'same-origin'
        )
        .then(async (d) => {
          // console.log(await d.data)

          const dd = await d.data;
          setLoading(false);
          if (dd.Success) {
            dd.data[0]["JoinDate"] = dd.data[0]["JoinDate"].split("T")[0];
            setData(dd.data[0]);
          } else {
            console.log("Errorooo");
            history("/auth/sign-in");
          }
        })
        .catch((e) => {
          history("/auth/sign-in");
        });

      //  return data
    }
    // console.log("stat",state)
    if (!state) {
      if (cookies && cookies.jwt) fetchData(cookies.jwt);
      else history("/auth/sign-in");
    } else {
      setLoading(false);
      state["JoinDate"] = state["JoinDate"].split("T")[0];
      setData(state);
      // console.log(state)
    }

    // console.log("data: ",data)
  }, []);

  const handleClick = (e) => {
    history("/auth/edit-profile", { state: data });
  };
  return (
    <div className="md:my-15 min-w-sm relative mx-auto my-8 flex min-h-screen flex-col gap-8">
      <div className="flex justify-between ">
        <Typography variant="h3">Profile</Typography>
      </div>
     
      {loading && (
        <div className="flex bg-gray ml-2 justify-center items-center">
          <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <span>Loading</span>
          </div>
        </div>
      )}
      {!loading && (
        <Info data={data} handleClick={handleClick} state={state}></Info>
      )}
      {/* <div className="flex flex-col justify-center">
        {data && (
          <Info data={data} handleClick={handleClick} state={state}></Info>
        )}
        <div className="my-3 flex flex-col ">
          {data && <Contact></Contact>}
          <div className="my-4">
            {data && <Skill_card data={data} state={state} />}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Profile;
