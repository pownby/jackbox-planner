import { UNRANKED_RATINGS } from '../components/Filters';

export default function filterGames(packs, ratingFilter, playerCountFilter, textFilter, packFilter) {
  const upperTextFilter = textFilter.toUpperCase();
  return packs
    .filter(pack => !packFilter || packFilter.includes(pack.id))
    .map(pack => {
      return {
        ...pack,
        games: pack.games.filter(game =>
          (!ratingFilter || ratingFilter.includes(game.rating) || (ratingFilter.includes(UNRANKED_RATINGS) && !game.rating)) &&
          (!playerCountFilter || playerCountFilter <= 0 || (game.min <= playerCountFilter && game.max >= playerCountFilter)) &&
          (!textFilter || (game.nameUpper.includes(upperTextFilter) || game.descUpper.includes(upperTextFilter)))
        )
      };
    });
};