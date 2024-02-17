import { useEffect } from "react";
import ReturnAndExchange from "../../../components/frontend/ui/returnAndExchange/ReturnAndExchange";

const ReturnExchangePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <ReturnAndExchange />
    </>
  );
};

export default ReturnExchangePage;
