import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { TCabin } from "../../../types/remoteTypes";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";


function CabinTable() {
  const { cabins, isLoading } = useCabins();

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("filter") ?? "all";
  let filteredCabins;
  switch (filterValue) {
    case "all":
      filteredCabins = cabins;
      break;
    case "with-discount":
      filteredCabins = cabins?.filter((cabin) => cabin.discount);
      break;
    case "no-discount":
      filteredCabins = cabins?.filter((cabin) => !cabin.discount);
      break;

    default:
      throw new Error("Invalid filter value: " + filterValue);
  }

  const sortByValue = searchParams.get("sortBy") ?? "name-asc";
  const [field, direction] = sortByValue.split("-"); // "price-desc" => ["price", "desc"]
  const modifier = direction === "desc" ? -1 : 1;
  const sortedCabins = filteredCabins;

  // debug
  // console.log("sortedCabins: ", sortedCabins);
  console.log("sortByValue: ", sortByValue);
  console.log("field: ", field);
  console.log("direction: ", direction);
  console.log("modifier: ", modifier);

  switch (field) {
    case "name":
      sortedCabins?.sort((a, b) =>
        a.name.localeCompare(b.name) * modifier 
      )
      break;
case "price":
      sortedCabins?.sort((a, b) =>
        (a.regular_price - b.regular_price) * modifier
      );
      break;
case "maxCapacity":
      sortedCabins?.sort((a, b) =>
        (a.max_capacity - b.max_capacity) * modifier
      );
      break;
  
    default:
      throw new Error("Invalid sort value: " + sortByValue);
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Header>
            <div>Image</div>
            <div>Cabin</div>
            {/* <div>Description</div> */}
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
          </Table.Header>
        )}

        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin: TCabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

// CabinTable.propTypes = {

// }

export default CabinTable;
