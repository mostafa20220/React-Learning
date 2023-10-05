import styled from "styled-components";
import { TCabin } from "../../../types/remoteTypes";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateUpdateCabin } from "./useCreateUpdateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
    <>
      <TableRow>
        <Img src={cabin.image} />
        <Cabin>{cabin.name}</Cabin>
        {/* <div>{cabin.description}</div> */}
        <div>Fits up to {cabin.max_capacity} gusts</div>
        <Price>{formatCurrency(cabin.regular_price)}</Price>
        <Discount>{formatCurrency(cabin.discount)}</Discount>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <button
            onClick={handleDuplicate.bind(null, cabin)}
            disabled={isLoading}
          >
            <HiSquare2Stack />
          </button>
          <button
            onClick={() => setIsEditing((show) => !show)}
            disabled={isLoading}
          >
            <HiPencil />
          </button>
          <button onClick={() => deleteCabin(cabin.id)} disabled={isLoading}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {isEditing && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
