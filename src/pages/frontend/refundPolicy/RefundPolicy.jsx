import { useEffect } from "react";
import RefundPolicy from "../../../components/frontend/ui/refundPolicy/RefundPolicy";

const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <RefundPolicy />
    </>
  );
};

export default RefundPolicyPage;
