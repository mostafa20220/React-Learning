import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinsTableOperations from "../ui/CabinsTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
        <CabinsTableOperations/>
      </Row>

      <Row>
        <CabinTable />
      <AddCabin/>
      </Row>
    </>
  );
}

export default Cabins;
