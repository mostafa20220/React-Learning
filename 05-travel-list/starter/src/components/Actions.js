export function Actions({ items, sortBy, onSortBy, onClearAllItems }) {

  if (!items.length) return null;


  return (
    <div className="actions">
      <select value={sortBy} onChange={onSortBy}>
        <option value="inputOrder">SORT BY INPUT ORDER</option>
        <option value="description">SORT BY DESCRIPTION</option>
        <option value="packed">SORT BY INPUT PACKED STATUS</option>
      </select>
      <button onClick={onClearAllItems}>
        Clear All Items
      </button>
    </div>
  );
}
