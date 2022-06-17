// This function just make sure frontend can get data from backend, so the axios and typescript didn't be used.
// This check only for nest back end.
import { useState } from "react";

const Check = () => {
  const [data, setData] = useState({ data });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_HEALTH_CHECK, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {err && <h2>{err}</h2>}

      <button onClick={handleClick}>Fetch data</button>

      {isLoading && <h2>Loading...</h2>}
      {data.status && <h2>Sever and DB connection is {data.status}</h2>}
    </div>
  );
};

export default Check;
