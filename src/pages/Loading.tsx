import { LoadingTemp } from "components";
import { useEffect, useState } from "react";

const Loading = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }, []);
  return (
    <div className={`overflow ${loading ? "" : "hidden"}`}>
        <LoadingTemp/>
      </div>
  )
}

export default Loading