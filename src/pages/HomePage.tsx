import React, { useState, ChangeEvent } from "react";
import { Loading } from "../components/Loading";
import { usePokemon } from "../hooks/usePokemon";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";

export const HomePage = () => {
  // Custom Hook to get all Pokemon with their useEffect
  const { isLoading, pokemons } = usePokemon();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const filteredPokemos = (): Pokemon[] => {
    if (search.length === 0)
      return pokemons.slice(currentPage, currentPage + 5);

    //Search Input with data
    const filtered = pokemons.filter((poke) => poke.name.includes(search));
    return filtered.slice(currentPage, currentPage + 5);
  };

  const nextPage = () => {
    if (
      pokemons.filter((poke) => poke.name.includes(search)).length >
      currentPage + 5
    )
      setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 5);
  };

  const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  return (
    <div className="mt-5">
      <h1>Pokémon List</h1>
      <hr />
      <input
        className="mb-2 form-control"
        type="text"
        placeholder="Pokémon Search"
        value={search}
        onChange={onSearchChange}
      />
      <button className="btn btn-primary" onClick={prevPage}>
        Previous
      </button>
      &nbsp;
      <button className="btn btn-primary" onClick={nextPage}>
        Next
      </button>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 100 }}>ID</th>
            <th style={{ width: 150 }}>Name</th>
            <th>Image</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Abilities</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemos().map(({ id, name, pic, height, weight, abilities }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>
                <img src={pic} alt={name} style={{ height: 75 }} />
              </td>
              <td>{height}</td>
              <td>{weight}</td>
              <td>{abilities}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <Loading />}
    </div>
  );
};
