import Details from "./Details";
import SIGNUP from "./SIGNUP";

export default function Switch(step, signup, setSignup, state) {
  // setdetail(detail);
  switch (step) {
    case 0:
      return <SIGNUP signup={signup} setSignup={setSignup} state={state} />;

    case 1:
      return <Details signup={signup} setSignup={setSignup} state={state} />;

    default:
      return null;
  }
}
