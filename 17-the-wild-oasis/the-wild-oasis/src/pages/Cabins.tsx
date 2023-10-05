import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";

function Cabins() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={()=> setShowModal(showModal=>!showModal)} > Create a New Cabin </Button>
        {
          showModal && <CreateCabinForm /> 
        }
      </Row>
    </>
  );
}

export default Cabins;
