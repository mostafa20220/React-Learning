import { Item } from "./Item";

export function PackingList({ items, setItems, onSortBy }) {

  console.log("From traveList, here is the items: ", items);

  return (
    <div className="list">

      <ul>  {items.map((item) => <Item item={item} items={items} setItems={setItems} key={item.id} onSortBy={onSortBy} />)} </ul>
    </div>
  );
}
