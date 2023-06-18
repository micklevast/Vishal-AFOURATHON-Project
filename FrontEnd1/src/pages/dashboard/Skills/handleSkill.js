import { platformSettingsData } from "@/data";
import axios from "axios";

export const handleSkill = async (
  e,
  slct_skill,
  select_v,
  changeOverlay,
  toggleOverlay,
  setData,
  setDomainData,
  data,
  other
) => {
  if (select_v == "Other") select_v = other;
  await axios
    .post(
      `${import.meta.env.VITE_APP_API_URL}/addSkill`,
      {
        skill: slct_skill,
        domain: select_v,
      },
      {
        withCredentials: true,
      } // could also try 'same-origin'
    )
    .then((d) => {
      const jss = d.data;

      if (jss.Success) {
        let tt = jss.data;

        tt["level"] = "Beginner";

        (tt["YOE"] = 0), (tt["checked"] = false);

        // console.log(tt)
        const dd = data;
        // console.log(dd)

        dd[select_v].push(tt);

        console.log(dd[select_v]);
        setData(dd);
        // setDomainData(dd[select_v])
        changeOverlay(false);
        toggleOverlay(false);

        window.location.reload();
      } else {
        console.log("success false:", jss);
      }
    })
    .catch((err) => {
      changeOverlay(false);
      toggleOverlay(false);
      console.log(err);
    });
};
