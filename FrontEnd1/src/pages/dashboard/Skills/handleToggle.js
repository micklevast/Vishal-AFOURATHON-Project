export //Handling the toggle selection fo the skills in domain
const handleToggle = (
  idx,
  index,
  dom,
  setData,
  setchunks,
  chunks,
  data,
  domain
) => {
  const chkbox = document.getElementById(idx + "checkbox");
  const slct = document.getElementById(idx + "select");
  const num = document.getElementById(idx + "number");
  const flex = document.getElementById(idx + "flex");

  const grid = document.getElementById(idx + "grid");
  const name = chkbox.name;
  console.log(chkbox.checked);
  if (chkbox.checked) {
    console.log(chkbox);

    flex.classList.remove("bg-white");
    flex.classList.remove("text-blue-600");
    grid.classList.remove("hidden");
    flex.classList.add("bg-blue-600");
    flex.classList.add("text-white");

    const arr = [...chunks];
    const fData = arr.filter((ele) => ele.skill_id === name);
    if (fData.length) {
      for (const ele of arr) {
        if (ele.skill_id === name) {
          ele.level = slct.value || 1;
          ele.YOE = num.value;
        }
      }

      console.log(data);
      console.log(arr);
    } else {
      arr.push({
        skill_id: name,
        domain: domain,
        level: slct.value,
        YOE: num.value || 1,
      });
    }
    const temp = data;
    temp[dom][index].checked = true;
    temp[dom][index].YOE = num.value;
    temp[dom][index].level = slct.value;
    setData(temp);

    setchunks(arr);
    console.log(arr);
  } else {
    grid.classList.add("hidden");
    flex.classList.remove("bg-blue-600");
    flex.classList.remove("text-white");
    flex.classList.add("bg-white");
    flex.classList.add("text-blue-600");
    // console.log("Unchecked",name)

    const arr = [...chunks];
    const temp = data;
    temp[dom][index].checked = false;
    temp[dom][index].YOE = 0;
    temp[dom][index].level = "Beginner";
    setData(temp);
    arr.filter((ele, i) => {
      if (ele.skill_id === name) {
        arr.splice(i, 1);
      }
    });
    setchunks(arr);
    console.log("arr", arr);
  }

  // console.log(chunks)
};
