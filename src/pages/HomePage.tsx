import React, { useState, ChangeEvent } from "react";
import { Loading } from "../components/Loading";
import { usePokemonData } from "../hooks/usePokemon";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";

export const HomePage = () => {
  const { isLoading, pokemons } = usePokemonData();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const filteredPokemons = (): Pokemon[] => {
    const filteredList = search.length === 0 ?
      pokemons :
      pokemons.filter((poke) => poke.name.includes(search));

    return filteredList.slice(currentPage, currentPage + 5);
  };

  const nextPageDisabled = pokemons.filter((poke) => poke.name.includes(search)).length <= currentPage + 5;

  const nextPage = () => {
    if (!nextPageDisabled) setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 5);
  };

  const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  return (
    <div className="mt-5 p-4 lg:px-8 lg:py-12 rounded" style={{ backgroundColor: '#D04848' }}>
      <h1 className="text-3xl font-semibold text-center mb-4">Pokémon List</h1>
      <hr className="mb-4" />
      <input
        className="mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={onSearchChange}
      />
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
        <button
          className="btn btn-primary disabled:opacity-50 w-full lg:w-auto"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-primary disabled:opacity-50 w-full lg:w-auto"
          onClick={nextPage}
          disabled={nextPageDisabled}
        >
          Next
        </button>
      </div>
      <div className="overflow-x-auto rounded" style={{ backgroundColor: '#F3B95F'  }}>
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-20">ID</th>
              <th className="w-40">Name</th>
              <th>Image</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Abilities</th>
            </tr>
          </thead>
          <tbody>
            {filteredPokemons().map(({ id, name, pic, height, weight, abilities }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                  <img src={pic} alt={name} className="h-12" />
                </td>
                <td>{height} m</td>
                <td>{weight} lbs</td>
                <td>{abilities.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default HomePage;
