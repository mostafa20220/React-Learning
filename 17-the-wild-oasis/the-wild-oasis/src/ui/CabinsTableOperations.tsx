import TableOperations from "./TableOperations";
import Filter from "./Filter";
import SortBy from "./SortBy";

export default function CabinsTableOperations() {
  return (
    <TableOperations>
      <Filter name="filter" options={["All", "With Discount", "No Discount"]} />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort By Name (A-Z)" },
          { value: "name-desc", label: "Sort By Name (Z-A)" },
          { value: "price-asc", label: "Sort By Price (low-first)" },
          { value: "price-desc", label: "Sort By Price (high-first)" },
          { value: "maxCapacity-asc", label: "Sort By Capacity (low-first)" },
          { value: "maxCapacity-desc", label: "Sort By Capacity (high-first)" },
        ]}
      />
    </TableOperations>
  );
}
