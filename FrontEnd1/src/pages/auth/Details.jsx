import { useState } from "react";
const Details = ({ signup, setSignup }) => {
  const [about, setabout] = useState(signup["about"]);
  const [profile_photo, setprofile_photo] = useState(signup["profile_photo"]);
  const [github, setgithub] = useState(signup["github"]);
  const [linkedIn, setlinkedIn] = useState(signup["linkedIn"]);
  const [portfolio, setportfolio] = useState(signup["portfolio"]);
  // console.log("xcvbnkl")
  const handleChange = (val, s) => {
    // console.log("val")
    // console.log(e.target.value,s)
    const delt = signup;
    if (s === "about") {
      delt["about"] = val;

      setabout(val);
    }

    if (s === "github") {
      delt["github"] = val;

      setgithub(val);
    }
    if (s === "profile_photo") {
      delt["profile_photo"] = val;

      setprofile_photo(val);
    }
    if (s === "linkedIn") {
      delt["linkedIn"] = val;

      setlinkedIn(val);
    }
    if (s === "portfolio") {
      delt["portfolio"] = val;
      setportfolio(val);
    }
    setSignup(delt);
    // console.log("",detail)
  };
  return (
    <div>
      <div className="mb-3 flex">
        <label className="w-1/2 py-2 pl-2">Profile Photo</label>
        <input
          type="text"
          id="JD"
          placeholder="URL"
          className="black mb-3 block w-1/2 border  border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
          value={profile_photo}
          onChange={(e) => handleChange(e.target.value, "profile_photo")}
          required
        />
      </div>

      <div className="mb-5 md:mb-6">
        <textarea
          id="password"
          className="black mb-3 block w-full border border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
          placeholder="About (optional)"
          value={about}
          onChange={(e) => handleChange(e.target.value, "about")}
          required
        />
      </div>
      
      <div className="mb-5 md:mb-6">
        <input
          type="text"
          id="password"
          className="black mb-3 block w-full border border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
          placeholder="Add portfolio(optional)"
          value={portfolio}
          onChange={(e) => handleChange(e.target.value, "portfolio")}
          required
        />
      </div>
      <div className="mb-5 md:mb-6">
        <input
          type="text"
          id="password"
          className="black mb-3 block w-full border border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
          placeholder="Add github url(optional)"
          value={github}
          onChange={(e) => handleChange(e.target.value, "github")}
          required
        />
      </div>
      <div className="mb-5 md:mb-6">
        <input
          type="text"
          id="password"
          className="black mb-3 block w-full border border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
          placeholder="Add linkedIn(optional)"
          value={linkedIn}
          onChange={(e) => handleChange(e.target.value, "linkedIn")}
          required
        />
      </div>
    </div>
  );
};

export default Details;
