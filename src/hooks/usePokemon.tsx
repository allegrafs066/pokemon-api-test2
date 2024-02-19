import { useEffect, useState } from "react";
import { fetchAllPokemons } from "../helpers/fetchAllPokemons";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";

export const usePokemonData = (): { isLoading: boolean, pokemons: Pokemon[] } => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPokemons = await fetchAllPokemons();
        setPokemons(fetchedPokemons);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isLoading,
    pokemons
  };
};
