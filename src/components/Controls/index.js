import React from 'react';
import './Controls.less';

export default function Controls({ collapseAll, expandAll, collapseAllPacks, expandAllPacks, collapseAllGames, expandAllGames }) {
  return (
    <div className="controls">
      <button onClick={collapseAll}>Collapse All</button>
      <button onClick={expandAll}>Expand All</button>
      <button onClick={collapseAllPacks}>Collapse All Packs</button>
      <button onClick={expandAllPacks}>Expand All Packs</button>
      <button onClick={collapseAllGames}>Collapse All Games</button>
      <button onClick={expandAllGames}>Expand All Games</button>
    </div>
  );
}