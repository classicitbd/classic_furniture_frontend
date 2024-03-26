import { useEffect } from "react";
import Aboutus from "../../../components/frontend/ui/aboutus/Aboutus";

const AboutusPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Aboutus />
    </>
  );
};

export default AboutusPage;
