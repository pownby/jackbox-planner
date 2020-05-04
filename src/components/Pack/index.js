import React from 'react';
import "./Pack.less";
import Game from '../Game';

export default function Pack({ name, games, collapsed, togglePack, toggleGame }) {

  const toggle = () => togglePack(name);
  const toggleMyGame = gameName => toggleGame(name, gameName);

  return (
    <div className="pack">
      <div onClick={toggle} className="pack-name">{name}</div>
      {!collapsed && 
        <div className="pack-content">
          {games.map(game =>
           <Game key={game.name} {...game} toggleGame={toggleMyGame} />
          )}
        </div>
      }
    </div>
  );
}
