import { useState } from "react";

function Home() {
  const [value, setValue] = useState(0);

  const count = () => {
    setValue(prev => prev + 1);
  };

  return (
    <>
      <h1>{value}</h1>
      <button onClick={count}>Increment</button>
    </>
  );
}

export default Home;