import definitions from "../assets/definitions.json";

function resolveRating(ratings) {
  if (Array.isArray(ratings)) {
    return ratings.map(r => r.value).reduce((a, b) => a + b) / ratings.length;
  }
  return ratings;
}

function getRatingProps(ratings) {
  if (!ratings) {
    return undefined;
  }
  const rawRating = resolveRating(ratings);
  const rating = Math.min(5, Math.max(1, rawRating));
  return { rating, ratingFloor: Math.floor(rating) };
}

export default function initPacks() {
  return definitions.map((pack) => {
    return {
      ...pack,
      games: pack.games.map((game) => {
        return {
          ...game,
          collapsed: true,
          nameUpper: game.name.toUpperCase(),
          descUpper: game.description.toUpperCase(),
          ...getRatingProps(game.rating)
        };
      }),
    };
  });
}