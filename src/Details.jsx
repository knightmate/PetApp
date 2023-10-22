import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./FetchPets";
import ErrorBoundary from "./ErrorBoundary";

const Details = () => {
 
  const { id } = useParams();
  const { isPending, error, data} = useQuery({
    queryKey: ['details',id],
    queryFn: fetchPet
  })
   
     console.log(pets);
  
  if (isPending || !data) {
    return (
      <div className="loading-pane">
        <h2 className="loader"> ___🌀___</h2>
      </div>
    );
  }
   
  const pet =  data.pets[0];
 
  console.log("petsME",pet);

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(){
  return(
    <ErrorBoundary>
      <Details/>
    </ErrorBoundary>
  )
}
export default DetailsErrorBoundary;