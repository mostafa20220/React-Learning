import TableOperations from "./TableOperations";
import Filter from "./Filter";

export default function CabinsTableOperations() {
  return (
    <TableOperations>
      <Filter name="filter" options={["All","With Discount","No Discount"]}/>
    </TableOperations>
  )
}