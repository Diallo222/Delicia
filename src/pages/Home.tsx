import React from "react";
import { AutoComplete } from "../components/autoComplete";

const options = ['The Godfather', 'Pulp Fiction'];
function Home() {
  return (
    <div className=" bg-slate-100">
      <h1 className="text-3xl text-black">HELLO</h1>
      <AutoComplete options={options} />
    </div>
  );
}

export default Home;
