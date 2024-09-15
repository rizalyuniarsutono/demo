import React, { useEffect,useState } from "react";

function Home() {
  useEffect(() => {
    // document.querySelector("#BarChart canvas").classList.add("lineChart");
  });
	const [session, setSession] = useState('Monthly');
  return (
    <>
      <div className="row">
        Dashboard
      </div>
    </>
  );
}

export default Home;
