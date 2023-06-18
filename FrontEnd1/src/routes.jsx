import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
// import { Home, Profile, Tables, Notifications,Skills,Filter} from "@/pages/dashboard";
import { Home, Profile, Tables, Skills} from "@/pages/dashboard";
import { EditProfile, SignIn, SignUp } from "@/pages/auth";
import { PlusSmallIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import Logoutted from "./widgets/layout/Logoutted";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
     
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <PlusCircleIcon {...icon} />,
        name: "Add Skills",
        path: "/skills",
        element: <Skills />,
      },
      
   
      
     
      // 
      
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Logout",
        path: "/Logout",
        element: <SignIn state={true} />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Edit profile",
        path: "/edit-profile",
        element: <EditProfile />,
      },
    ],
  },
];

export default routes;
