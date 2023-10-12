import styled from "styled-components";
import { TCabin } from "../../../types/remoteTypes";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import {  HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateUpdateCabin } from "./useCreateUpdateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

type PropsType = { cabin: TCabin };

function CabinRow({ cabin }: PropsType) {
  const [isEditing, setIsEditing] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { createEditCabin, isCabinLoading } = useCreateUpdateCabin(false);

  const isLoading = isDeleting || isCabinLoading;

  function handleDuplicate(cabin: TCabin) {
    const { id, ...duplicateCabin } = cabin;
    createEditCabin({ ...duplicateCabin, name: `copy of (${cabin.name})` });
  }

  return (
    <Table.Row>
      <Img src={cabin.image} />
      <Cabin>{cabin.name}</Cabin>
      {/* <div>{cabin.description}</div> */}
      <div>Fits up to {cabin.max_capacity} gusts</div>
      <Price>{formatCurrency(cabin.regular_price)}</Price>
      <Discount>{`${cabin.discount ? formatCurrency(cabin.discount) : "    -" }`}</Discount>

      <Modal >
        <Menus.Toggle list={cabin.id?.toFixed() ?? ""} />
        <Menus.List name={cabin.id?.toFixed() ?? ""}>
          <Modal.Open style={{justifySelf: "end"}} window="edit-cabin-form">
            <Menus.Button>
              <HiPencil />
              Edit
            </Menus.Button>
          </Modal.Open>

          <Menus.Button onClick={handleDuplicate.bind(null, cabin)}>
            <HiSquare2Stack />
            Duplicate
          </Menus.Button>

          <Modal.Open window="delete-cabin-form">
            <Menus.Button>
              <HiTrash />
              Delete
            </Menus.Button>
          </Modal.Open>
        </Menus.List>
     
        <Modal.Window name="edit-cabin-form">
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Window>

        <Modal.Window name="delete-cabin-form">
          <ConfirmDelete
            resourceName={"Cabin"}
            disabled={isLoading}
            onConfirm={() => deleteCabin(cabin.id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
