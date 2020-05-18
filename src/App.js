import React, { useReducer, useState } from 'react';
import './App.less';
import definitions from '../assets/definitions.json';
import Pack from './components/Pack';
import Controls from './components/Controls';
import Filters from './components/Filters';
import filterGames from './utils/filterGames';
import chooseRandomGame from './utils/chooseRandomGame';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function App() {
  const [state, dispatch] = useReducer(reducer, initPacks());
  const [ratingFilter, setRatingFilter] = useState();
  const [packFilter, setPackFilter] = useState();
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

  const filteredPacks = filterGames(state, ratingFilter, playerCountFilter, textFilter, packFilter).filter(pack => pack.games && !!pack.games.length);
  const renderedPacks = filteredPacks.map(pack => 
    <Pack key={pack.id} {...pack} togglePack={togglePack} toggleGame={toggleGame} />
  );

  function onChooseRandom() {
    const choice = chooseRandomGame(filteredPacks);
    if (choice) {
      toast.info(`Let's play ${choice.pack.name}: \"${choice.game.name}\"!`);
    }
  }

  return (
    <div className="container">
      <ToastContainer position="top-center" />
      <a href="https://jackbox.tv" target="_blank" className="jackbox-link">Open Jackbox.tv</a>
      <Filters
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        packFilter={packFilter}
        setPackFilter={setPackFilter}
        playerCount={playerCountFilter}
        changePlayerCount={setPlayerCountFilter}
        textFilter={textFilter}
        setTextFilter={setTextFilter}
      />
      {renderedPacks.length ? (
        <>
          <Controls
            collapseAll={collapseAll}
            expandAll={expandAll}
            collapseAllPacks={collapseAllPacks}
            expandAllPacks={expandAllPacks}
            collapseAllGames={collapseAllGames}
            expandAllGames={expandAllGames}
            onChooseRandom={onChooseRandom}
          />
          {renderedPacks}
        </>
      ) : (
        <div className="no-games">No games match current filters.</div>
      )}
    </div>
  );
}