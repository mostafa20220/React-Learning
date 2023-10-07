import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}>
        Create a New Cabin
      </Button>
      {isModalOpen && 
      <Modal onClose={setIsModalOpen.bind(null,false)}>
        <CreateCabinForm onClose={setIsModalOpen.bind(null,false)} isItModal={true} />
        </Modal>
      }
    </>
  );
}
