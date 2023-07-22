export function Item({ item, items, setItems, onSortBy }) {

  function handleStoke() {
    /*
    // let newItems = items.map((i) => i.id === item.id ? { ...i, packed: !i.packed } : i);
    // newItems = newItems.map((i) => {if(i.description === item.description && i.packed && item.packed ){
    //   i.quantity = i.quantity + item.quantity;
    //   handleRemoveItem();
    //   return i;
    // }
    // else return i;
    // } );
 
    // setItems(newItems);
     
    // onSortBy();
*/
    setItems(items => items.map((i) => i.id === item.id ? { ...i, packed: !i.packed } : i));
    onSortBy();

  }


  function handleRemoveItem() {
    setItems(items => items.filter((i) => i.id !== item.id));
  }

  return (
    <li>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} onClick={handleStoke}>
        <input style={{ scale: "1.2" }} type="checkbox" checked={item.packed} readOnly={true} />
        <span style={item.packed ? { textDecoration: "line-through", cursor: "pointer" } : { cursor: "pointer" }}>{item.quantity} {item.description} </span>
      </div>
      <button onClick={handleRemoveItem}> ❌ </button>
    </li>
  );
}
