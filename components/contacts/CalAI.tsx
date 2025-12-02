/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button } from "../ui/button";

export default function CalBooker() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
      });
    })();
  }, []);
  return (
    <Button
      data-cal-namespace="15min"
      data-cal-link="mohammad-mamun/15min"
      data-cal-config='{"layout":"month_view"}'
      className="px-6 py-5 rounded-full cursor-pointer bg-[#000000] dark:text-white dark:bg-[#fafafa]/20 backdrop-blur-lg"
    >
      Book a call
    </Button>
  );
}
