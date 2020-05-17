import React from 'react';
import './Filters.less';
import Checkbox from '../Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import definitions from '../../../assets/definitions.json';

export const UNRANKED_RATINGS = 'Unranked';
export const MIN_RATING = 1;
export const MAX_RATING = 5;
const _ratings = [UNRANKED_RATINGS];

for (let i = MIN_RATING; i <= MAX_RATING; i++) {
  _ratings.push(i);
}

const _packIds = definitions.map(pack => pack.id);

export default function Filters({
  ratingFilter = _ratings,
  setRatingFilter,
  packFilter = _packIds,
  setPackFilter,
  playerCount = '',
  changePlayerCount,
  textFilter,
  setTextFilter
}) {
  const changeListFilter = (entity, list, setList) => {
    const newList = list.slice(0);

    const index = newList.indexOf(entity);
    if (index > -1) {
      newList.splice(index, 1);
    } else {
      newList.push(entity);
    }
    setList(newList);
  };

  const onPackFilterClick = pack => () => {
    changeListFilter(pack, packFilter, setPackFilter);
  };

  const onRatingClick = rating => () => {
    changeListFilter(rating, ratingFilter, setRatingFilter);
  };

  const onPlayerCountChange = e => {
    changePlayerCount(e.currentTarget.value);
  };

  const onTextFilterChange = e => {
    setTextFilter(e.currentTarget.value);
  };

  
  return (
    <div className="filters">
      <div className="filter-label">Show Jackbox Party Packs:</div>
      <div className="content-block">
        {_packIds.map(pack => {
          const name = `check${pack}`;
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={packFilter.includes(pack)}
                  onChange={onPackFilterClick(pack)}
                  name={name}
                />
              }
              label={pack}
              key={pack}
            />
          );
        })}
      </div>
      <div className="filter-label">Show games with ratings:</div>
      <div className="content-block">
        {_ratings.map(rating => {
          const name = `check${rating}`;
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={ratingFilter.includes(rating)}
                  onChange={onRatingClick(rating)}
                  name={name}
                />
              }
              label={rating}
              key={rating}
            />
          );
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
