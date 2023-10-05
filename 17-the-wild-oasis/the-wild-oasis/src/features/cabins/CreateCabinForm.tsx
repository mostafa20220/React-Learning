import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { TCabin } from "../../../types/remoteTypes";
import FormRow, { StyledFormRow } from "../../ui/FormRow";
import { useCreateUpdateCabin } from "./useCreateUpdateCabin";

type TCreateCabinForm = Omit<TCabin, "image"> & { image: FileList };

type PropsType = { cabinToEdit?: TCabin };

function CreateCabinForm({ cabinToEdit }: PropsType) {
  const { id: cabinToEditId, ...restValues } = cabinToEdit ?? {};
  const isEditForm = Boolean(cabinToEditId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues: restValues });

  const { createEditCabin, isCabinLoading } = useCreateUpdateCabin(isEditForm);

  function submit(data: TCreateCabinForm) {
    console.log(data);

    // if edit add the id to the data
    if (isEditForm)
      createEditCabin(
        {
          ...data,
          image: typeof data.image === "string" ? data.image : data.image[0],
          id: cabinToEditId,
        },
        {
          onSuccess: (data) => {
            console.log("onsuccess Data: ", data);
            reset();
          },
        }
      );
    else
      createEditCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: (data) => {
            console.log("onsuccess Data: ", data);
            reset();
          },
        }
      );
  }

  function onError(err) {
    // console.error(err);
  }

  return (
    <Form onSubmit={handleSubmit(submit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          defaultValue="005"
          disabled={isCabinLoading}
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          defaultValue={5}
          disabled={isCabinLoading}
          {...register("max_capacity", {
            required: "Max capacity is required",
            min: {
              value: 1,
              message: "Max capacity must be greater than 0",
            },
            max: {
              value: 100,
              message: "Max capacity must be less than 100",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regularPrice"
          defaultValue={200}
          disabled={isCabinLoading}
          {...register("regular_price", {
            required: "Regular price is required",
            min: {
              value: 1,
              message: "Regular price must be greater than 0",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCabinLoading}
          {...register("discount", {
            required: "discount is required",
            min: {
              value: 0,
              message: "discount must be greater than 0",
            },
            // max: {
            //   value: getValues("regular_price"),
            //   message: "discount must be less than the regular price",
            // },
            validate: (discount) =>
              +discount <= +getValues("regular_price") ||
              "discount must be less than or equal to the regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCabinLoading}
          {...register("description", {
            required: "description is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCabinLoading}
          {...register("image", {
            required: !isEditForm && "Image is required",
          })}
        />
      </FormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCabinLoading}>
          {" "}
          {isEditForm ? "Update Cabin" : "Create a New Cabin"}
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
