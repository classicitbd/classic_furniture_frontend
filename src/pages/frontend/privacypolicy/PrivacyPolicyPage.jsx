import { useEffect } from "react";
import PrivacyPolicy from "../../../components/frontend/ui/privacypolicy/PrivacyPolicy";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyPage;
