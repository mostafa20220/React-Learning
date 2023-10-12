import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { TCabin } from "../../../types/remoteTypes";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

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
          data={filteredCabins}
          render={(cabin: TCabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

// CabinTable.propTypes = {

// }

export default CabinTable;
