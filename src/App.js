import React, { useReducer } from 'react';
import './App.less';
import definitions from '../assets/definitions.json';
import Pack from './components/Pack';
import Controls from './components/Controls';

import reducer, {
  TOGGLE_PACK,
  TOGGLE_GAME,
  COLLAPSE_ALL,
  EXPAND_ALL,
  COLLAPSE_ALL_PACKS,
  EXPAND_ALL_PACKS,
  COLLAPSE_ALL_GAMES,
  EXPAND_ALL_GAMES,
  setAllGamesCollapsed
} from './reducer';

export default function App() {
  const [state, dispatch] = useReducer(reducer, setAllGamesCollapsed(definitions, true));

  const togglePack = packName => dispatch({ type: TOGGLE_PACK, packName });
  const toggleGame = (packName, gameName) => dispatch({ type: TOGGLE_GAME, packName, gameName });
  const collapseAll = () => dispatch({ type: COLLAPSE_ALL });
  const expandAll = () => dispatch({ type: EXPAND_ALL });
  const collapseAllPacks  = () => dispatch({ type: COLLAPSE_ALL_PACKS });
  const expandAllPacks = () => dispatch({ type: EXPAND_ALL_PACKS });
  const collapseAllGames = () => dispatch({ type: COLLAPSE_ALL_GAMES });
  const expandAllGames = () => dispatch({ type: EXPAND_ALL_GAMES });

  return (
    <div className="container">
      <a href="https://jackbox.tv" target="_blank" className="jackbox-link">Open Jackbox.tv</a>
      <Controls
        collapseAll={collapseAll}
        expandAll={expandAll}
        collapseAllPacks={collapseAllPacks}
        expandAllPacks={expandAllPacks}
        collapseAllGames={collapseAllGames}
        expandAllGames={expandAllGames}
      />
      {state.map(pack => 
        <Pack key={pack.name} {...pack} togglePack={togglePack} toggleGame={toggleGame} />
      )}
    </div>
  );
}