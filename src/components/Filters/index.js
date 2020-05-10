import React from 'react';
import './Filters.less';

export const ALL_RATINGS = 'All';
export const MIN_RATING = 1;
export const MAX_RATING = 5;
const _ratings = [ALL_RATINGS];

for (let i = MIN_RATING; i <= MAX_RATING; i++) {
  _ratings.push(i);
}

export default function Filters({ selectedRating = ALL_RATINGS, changeRating, playerCount = '', changePlayerCount, textFilter, setTextFilter }) {
  const onRatingClick = rating => () => {
    if (rating !== selectedRating) {
      changeRating(rating);
    }
  };

  const onPlayerCountChange = e => {
    changePlayerCount(e.currentTarget.value);
  }

  const onTextFilterChange = e => {
    setTextFilter(e.currentTarget.value);
  }

  return (
    <div className="filters">
      <div className="filter-label">Show ratings of at least:</div>
      <div className="rating-filter">
        {_ratings.map(rating => {
          const className = `rating-button${rating === selectedRating ? ' selected' : ''}`;
          return <button key={rating} className={className} onClick={onRatingClick(rating)}>{rating}</button>
        })}
      </div>
      <div className="filter-label">Show games for players numbering:</div>
      <div className="player-filter">
        <input type="number" className="player-number" value={playerCount} onChange={onPlayerCountChange} />
      </div>
      <div className="filter-label">Text filter:</div>
      <div className="text-filter">
        <input type="text" className="text-filter-input" value={textFilter} onChange={onTextFilterChange} />
      </div>
    </div>
  );
}
