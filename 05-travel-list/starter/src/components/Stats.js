export function Stats({ items }) {
  if (!items.length)
    return (<footer className="stats"><em> Start adding your items 🔥 </em></footer>);

  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / totalItems) * 100);

  return (
    <div className="stats">
      {percentage === 100 ? <em>🎉 You are ready to go!  🎉</em> :
        <em>
          👜 You have {totalItems} item on your list, and you already packed {packedItems} ({percentage}%)
        </em>}
    </div>
  );
}
