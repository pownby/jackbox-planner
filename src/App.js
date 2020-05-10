import React, { useReducer, useState } from 'react';
import './App.less';
import definitions from '../assets/definitions.json';
import Pack from './components/Pack';
import Controls from './components/Controls';
import Filters, { ALL_RATINGS } from './components/Filters';

import reducer, {
  TOGGLE_PACK,
  TOGGLE_GAME,
  COLLAPSE_ALL,
  EXPAND_ALL,
  COLLAPSE_ALL_PACKS,
  EXPAND_ALL_PACKS,
  COLLAPSE_ALL_GAMES,
  EXPAND_ALL_GAMES
} from './reducer';

function initPacks() {
  return definitions.map(pack => {
    return {
      ...pack,
      games: pack.games.map(game => {
        return { ...game, collapsed: true, nameUpper: game.name.toUpperCase(), descUpper: game.description.toUpperCase() };
      })
    };
  });
}

function filterGames(packs, minRating, playerCountFilter, textFilter) {
  const upperTextFilter = textFilter.toUpperCase();
  return packs.map(pack => {
    return {
      ...pack,
      games: pack.games.filter(game => (minRating === ALL_RATINGS || game.rating >= minRating) &&
        (!playerCountFilter || playerCountFilter <= 0 || (game.min <= playerCountFilter && game.max >= playerCountFilter)) &&
        (!textFilter || (game.nameUpper.includes(upperTextFilter) || game.descUpper.includes(upperTextFilter)))
      )
    };
  });
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initPacks());
  const [ratingFilter, setRatingFilter] = useState(ALL_RATINGS);
  const [playerCountFilter, setPlayerCountFilter] = useState();
  const [textFilter, setTextFilter] = useState('');

  const togglePack = packName => dispatch({ type: TOGGLE_PACK, packName });
  const toggleGame = (packName, gameName) => dispatch({ type: TOGGLE_GAME, packName, gameName });
  const collapseAll = () => dispatch({ type: COLLAPSE_ALL });
  const expandAll = () => dispatch({ type: EXPAND_ALL });
  const collapseAllPacks  = () => dispatch({ type: COLLAPSE_ALL_PACKS });
  const expandAllPacks = () => dispatch({ type: EXPAND_ALL_PACKS });
  const collapseAllGames = () => dispatch({ type: COLLAPSE_ALL_GAMES });
  const expandAllGames = () => dispatch({ type: EXPAND_ALL_GAMES });

  const packs = filterGames(state, ratingFilter, playerCountFilter, textFilter).map(pack => 
    pack.games && !!pack.games.length && <Pack key={pack.name} {...pack} togglePack={togglePack} toggleGame={toggleGame} />
  ).filter(Boolean);

  return (
    <div className="container">
      <a href="https://jackbox.tv" target="_blank" className="jackbox-link">Open Jackbox.tv</a>
      <Filters changeRating={setRatingFilter} selectedRating={ratingFilter} playerCount={playerCountFilter} changePlayerCount={setPlayerCountFilter} textFilter={textFilter} setTextFilter={setTextFilter} />
      {packs.length ? (
        <>
          <Controls
            collapseAll={collapseAll}
            expandAll={expandAll}
            collapseAllPacks={collapseAllPacks}
            expandAllPacks={expandAllPacks}
            collapseAllGames={collapseAllGames}
            expandAllGames={expandAllGames}
          />
          {packs}
        </>
      ) : (
        <div className="no-games">No games match current filters.</div>
      )}
    </div>
  );
}