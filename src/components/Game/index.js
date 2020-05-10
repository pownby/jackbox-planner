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
          {rating ? <div>{rating} stars</div> : <div>Not rated</div>}
          {comments && <div>Comments: {comments}</div>}
          <div className="game-description">{description}</div>
        </div>
      )}
    </div>
  );
}
