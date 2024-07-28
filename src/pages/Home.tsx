import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getCharacters } from "../store/character/charactereSlice";
import { AutoComplete } from "../components/autoComplete";

const options = ["The Godfather", "Pulp Fiction"];

function Home() {
  const { data } = useSelector(
    (state: string[]) => ({
      data: state.character,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacters());
  },[]);

  console.log('data', data);
  
  return (
    <div className=" bg-slate-100">
      <h1 className="text-3xl text-black">HELLO</h1>
      <AutoComplete options={options} />
    </div>
  );
}

export default Home;
