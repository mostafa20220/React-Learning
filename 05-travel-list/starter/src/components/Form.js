import { useState } from "react";
// import { MAXID as maxid } from "./App";

let MAXID=3;

export function Form({ items, setItems, onSortBy }) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // need to fix the problem if the item is already in the list and packed, then we add a new element and leave the packed as it is, then we will have two elements with the same description, one packed and one not packed.
    // then when add the same item again, we will increase the quantity of the not packed item, and we will have two elements with the same description.
    // then when we pack the not packed item we will have one packed item with the quantity of the two items.
    // then when we unpack the item, we will have one item.
    const temp = items.filter(item => item.description === description);
    if (!temp.length || !temp.filter(i => !i.packed).length) {
      console.log("old item:");
      console.log(items);
      setItems(items => [...items, { id: items.length ? ++MAXID : 1, description, quantity, packed: false }]);
      console.log("new item:");
      console.log(items);
    }
    else {
      temp.filter(i => !i.packed)[0].quantity += quantity;
      setItems(items => items.map((item) => item.description === description && !item.packed ? temp[0] : item));

      console.log(items);
    }
    setDescription("");
    setQuantity(1);
    onSortBy();
  };

  return (

    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={e => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => <option value={num} key={num}>
          {num}
        </option>
        )}

      </select>
      <input type="text" name="item" placeholder="Item..." value={description} onChange={e => setDescription(e.target.value)} required />
      <button type="submit">Add</button>
    </form>

  );
}
