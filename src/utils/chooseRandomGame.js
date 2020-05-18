function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function chooseRandomGame(packs) {
  if (!packs || !packs.length) {
    return;
  }

  const randomPack = packs[getRandomInt(packs.length)];
  const randomGame = randomPack.games[getRandomInt(randomPack.games.length)];
  return { pack: randomPack, game: randomGame };
}