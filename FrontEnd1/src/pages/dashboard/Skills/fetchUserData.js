import axios from "axios";

export async function fetchUserData(
  token,
  setUserdata,
  setchunks,
  setData,
  setDomainData,
  setdomain,
  setLoading
) {
  let dt = [];

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
    .then((d) => {
      // console.log("out",d)
      const dd = d.data.data[0].Skills;

      dt = dd;

      setUserdata(dd);
      let t = [];
      dd.map((ele, idx) => {
        if (ele.skill_id) {
          t.push({
            skill_id: ele.skill_id._id,
            skill_name: ele.skill_id.skill_name,
            YOE: ele.YOE,
            level: ele.level,
          });
        }
      });
      // console.log("thk",t)
      setchunks(t);
    })
    .catch((err) => {
      console.log("dfghj", err);
    });
  //Api for getting skills from the database
  await axios
    .get(`${import.meta.env.VITE_APP_API_URL}/getSkills`, {
      withCredentials: true,
    })
    .then((d) => {
      console.log(d.data);
      const dd = d.data.data;
      const res = {};
      dd.forEach((ele) => {
        ele.checked = false;
        ele.YOE = 0;
        ele.level = "Beginner";
        if (res[ele.domain]) {
          res[ele.domain].push(ele);
        } else {
          res[ele.domain] = [ele];
        }

        // console.log(ele)
      });
      setData(res);

      const dom = Object.keys(res);

      console.log("userdata", dt);
      // console.log("",res)
      dom.map((dom) => {
        // console.log(dom)
        res[dom].map((ele) => {
          const n = dt.find((newSkill) => {
            if (newSkill.skill_id) return ele._id === newSkill.skill_id._id;
          });
          if (n) {
            ele.checked = true;
            ele.level = n.level;
            ele.YOE = n.YOE;
          }
        });
      });
      console.log(res);
      setLoading(false);
      setDomainData(Object.keys(res));
      setdomain(dom[0]);
    })
    .catch((err) => {
      console.log("dfghj", err);
    });
}

export const handleCheck = (e, setSkills, setdomain, data) => {
  setdomain(e.target.name);

  // console.log(":")
  for (const ele in data) {
    if (ele === e.target.name) {
      const d = data[ele];
      console.log(d);
      setSkills(d);
      return;
    }
  }
};
