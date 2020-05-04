import React from 'react';
import "./Game.less";

export default function Game({ name, min, max, rating, comments, description, collapsed, toggleGame }) {

  const toggle = () => toggleGame(name);

  return (
    <div className="game">
      <div className="game-name" onClick={toggle}>
        <span>{name}</span>{collapsed && <span> ({min} - {max} players)</span>}
      </div>
      {!collapsed && (
        <div className="game-content">
          <div>{min} - {max} players</div>
          <div>{rating} stars</div>
          {comments && <div>Comments: {comments}</div>}
          <div>{description}</div>
        </div>
      )}
    </div>
  );
}
