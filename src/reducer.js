export const TOGGLE_PACK = 'TOGGLE_PACK';
export const TOGGLE_GAME = 'TOGGLE_GAME';
export const COLLAPSE_ALL_GAMES = 'COLLAPSE_ALL_GAMES';
export const EXPAND_ALL_GAMES = 'EXPAND_ALL_GAMES';
export const COLLAPSE_ALL_PACKS = 'COLLAPSE_ALL_PACKS';
export const EXPAND_ALL_PACKS = 'EXPAND_ALL_PACKS';
export const COLLAPSE_ALL = 'COLLAPSE_ALL';
export const EXPAND_ALL = 'EXPAND_ALL';

export default function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_PACK: {
      const { packName } = action;
      const index = state.findIndex(pack => pack.name === packName);
      if (index > -1) {
        const pack = state[index];
        const newState = state.slice(0);
        newState[index] = { ...pack, collapsed: !pack.collapsed };
        return newState;
      }
      return state;
    }
    case TOGGLE_GAME: {
      const { packName, gameName } = action;
      const packIndex = state.findIndex(pack => pack.name === packName);
      if (packIndex > -1) {
        const pack = state[packIndex];
        const gameIndex = pack.games.findIndex(game => game.name === gameName);
        if (gameIndex > -1) {
          const game = pack.games[gameIndex];
          const newState = state.slice(0);
          const newGames = pack.games.slice(0);
          newGames[gameIndex] = { ...game, collapsed: !game.collapsed };
          newState[packIndex] = { ...pack, games: newGames };
          return newState;
        }
      }
      return state;
    }
    case COLLAPSE_ALL_GAMES: {
      return setAllGamesCollapsed(state, true);
    }
    case EXPAND_ALL_GAMES: {
      return setAllGamesCollapsed(state, false);
    }
    case COLLAPSE_ALL_PACKS: {
      return setAllPacksCollapsed(state, true);
    }
    case EXPAND_ALL_PACKS: {
      return setAllPacksCollapsed(state, false);
    }
    case COLLAPSE_ALL: {
      return setAllCollapsed(state, true);
    }
    case EXPAND_ALL: {
      return setAllCollapsed(state, false);
    }
    default:
      throw new Error();
  }
}

export function setAllGamesCollapsed(packs, collapsed) {
  return packs.map(pack => {
    return {
      ...pack,
      games: pack.games.map(game => {
        return { ...game, collapsed };
      })
    };
  });
}

export function setAllPacksCollapsed(packs, collapsed) {
  return packs.map(pack => {
    return {
      ...pack,
      collapsed
    };
  });
}

export function setAllCollapsed(packs, collapsed) {
  return packs.map(pack => {
    return {
      ...pack,
      collapsed,
      games: pack.games.map(game => {
        return { ...game, collapsed };
      })
    };
  });
}