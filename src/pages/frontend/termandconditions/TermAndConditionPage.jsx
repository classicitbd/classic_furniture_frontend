import { useEffect } from "react";
import TermAndCondition from "../../../components/frontend/ui/termandcondition/TermAndCondition";

const TermAndConditionPage = () => {
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
      <TermAndCondition />
    </>
  );
};

export default TermAndConditionPage;
