import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "./context";
const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

function Gallery() {
  const { searchTerm } = useGlobalContext();
  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h3>Loading...</h3>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h3>There was an error...</h3>
      </section>
    );
  }
  const result = response.data.results;
  if (result.length < 1) {
    return (
      <section className="image-container">
        <h3>No result Founds...</h3>
      </section>
    );
  }
  return (
    <section className="image-container">
      {result.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            alt={item.alt_description}
            key={item.id}
            className="img"
          />
        );
      })}
    </section>
  );
}

export default Gallery;
