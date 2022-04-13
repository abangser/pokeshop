import { prisma } from '@pokemon/utils/db';
import ImportPokemon from '@pokemon/validators/importPokemon';
import PokeAPIService from '@pokemon/services/pokeApi.service';
import PokemonSyncronizer from '@pokemon/services/pokemonSyncronizer.service'
import { validate } from '@pokemon/middlewares/validation';
import { jsonResponse } from '@pokemon/middlewares/response';

const pokeApiService = PokeAPIService();
const pokemonSyncronizer = PokemonSyncronizer(pokeApiService);

const importPokemon = async (ctx: { body: ImportPokemon }) => {
  const { id = 0 } = ctx.body;

  await pokemonSyncronizer.queue({
    id: id,
  });

  return {
    id
  };
};

export default function setupRoute(router) {
  router.post(
    '/pokemon/import',
    validate(ImportPokemon),
    jsonResponse(200),
    importPokemon
  )
};
