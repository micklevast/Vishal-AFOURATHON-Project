import axios from "axios";

export async function handleEditSkill(
  token,
  skill_to_edit,
  chunks,
  setchunks,
  changeColor,
  changeOverlay,
  changAlert,
  toggleOverlay
) {
  console.log("edit skill");

  const name = skill_to_edit.skill_name;
  const id = skill_to_edit.skill_id;
  // console.log(name,id)
  // axios call
  axios
    .post(`${import.meta.env.VITE_APP_API_URL}/editSkill`, {
      skill_id: id,
      skill_name: name,
      token,
    })
    .then(async (d) => {
      const jss = d.data;
      console.log(d);
      if (jss.Success) {
        changeOverlay(false);
        toggleOverlay(false);
        // update chunks
        const arr = [...chunks];
        arr.filter((ele, i) => {
          if (ele.skill_id === id) {
            arr[i].skill_name = name;
          }
        });
        //   console.log("ARRR",arr);
        setchunks(arr);

        window.location.reload();
        changeColor(jss.message);
        changAlert(true);
      } else {
        console.log("success false:", jss);
        // changAlert(false)
        // history("/")
      }
    })
    .catch((err) => {
      changeOverlay(false);
      toggleOverlay(false);
      console.log(err);
      //  changeColor(err)
      //  changAlert(true)
    });
}
