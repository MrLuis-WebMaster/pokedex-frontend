import { MetaData } from "./response.service";

interface QueryPokemons {
  name?: string;
  page?: number;
  pageSize?: number;
}

interface Pokemon {
  id?: number;
  name: string;
  color: string;
  idPokemon: number;
}

interface PokemonResponse {
  pokemons: Pokemon[];
  meta: MetaData;
}

export type { QueryPokemons, Pokemon, PokemonResponse };
