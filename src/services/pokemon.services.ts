import { axiosHttpWithToken } from "../config/axios.config";
import { PokemonResponse, QueryPokemons } from "../types/pokemon.types";
import { ServiceResponse } from "../types/response.service";

const getPokemons = async (filters: QueryPokemons) => {
  try {
    const pokemons = (
      await axiosHttpWithToken<ServiceResponse<PokemonResponse>>(
        `/pokemon?page=${filters.page}&pageSize=${filters.pageSize}&name=${filters.name}`,
      )
    ).data.responseData;
    return pokemons;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(error.message || "Server Error");
  }
};

const refreshData = async () => {
  try {
    const pokemons = (
      await axiosHttpWithToken<ServiceResponse<PokemonResponse>>(
        "/pokemon/refresh-data",
      )
    ).data.responseData;
    return pokemons;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(error.message || "Server Error");
  }
};

export { getPokemons, refreshData };
