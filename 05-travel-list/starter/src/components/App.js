import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Actions } from "./Actions";
import { Stats } from "./Stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

export let MAXID = 3;


export default function App() {
  const [items, setItems] = useState(initialItems);
  const [sortBy, setSortBy] = useState("inputOrder");

  function handleSortBy(e) {

    const newSortBy = e?.target?.value || sortBy;
    setSortBy(newSortBy);

    if (newSortBy === "inputOrder")
      setItems(items => items.slice().sort((a, b) => a.id - b.id));
    else if (newSortBy === "description")
      setItems(items => items.slice().sort((a, b) => a.description.localeCompare(b.description)));
    else if (newSortBy === "packed")
      setItems(items => items.slice().sort((a, b) => a.packed - b.packed));
  }

  function handleClearAllItems() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form items={items} setItems={setItems} onSortBy={handleSortBy} />
      <PackingList items={items} setItems={setItems} onSortBy={handleSortBy} />
      <Actions items={items} setItems={setItems} sortBy={sortBy} onSortBy={handleSortBy} onClearAllItems={handleClearAllItems} />
      <Stats items={items} />
    </div>
  );
}
