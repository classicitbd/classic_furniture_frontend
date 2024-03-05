import { useEffect } from "react";
import CancellationPolicy from "../../../components/frontend/ui/cancellationPolicy/CancellationPolicy";

const CancellationPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <CancellationPolicy />
    </>
  );
};

export default CancellationPolicyPage;
