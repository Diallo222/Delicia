import React, { useEffect , useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getCharacters } from "../store/meal/mealSlice";
import { AutoComplete } from "../components/autoComplete";
import { axiosInstance } from "../config";

const options = ["The Godfather", "Pulp Fiction"];

function Home() {
  const { data } = useSelector(
    (state: string[]) => ({
      data: state.meal,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [comics, setComics] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axiosInstance.get('/categories.php');
        setComics(response.data.data.results);
        setLoading(false);
      } catch (err) {
        console.log(err);
        
        setError('Error fetching comics');
        setLoading(false);
      }
    };

    fetchComics();
  }, []);

  console.log(comics);
  
  
  return (
    <div className=" bg-slate-100">
      <h1 className="text-3xl text-black">HELLO</h1>
      <AutoComplete options={options} />
    </div>
  );
}

export default Home;
