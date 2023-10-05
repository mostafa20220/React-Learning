import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin as createEditCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateUpdateCabin(isEditForm: boolean) {
  const queryClient = useQueryClient();

  const { mutate: createEditCabin, isLoading: isCabinLoading } = useMutation({
    mutationFn: createEditCabinApi,
    onSuccess: () => {
      toast.success(isEditForm ? "Cabin Updated!" : "Cabin created!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error(
        isEditForm
          ? "Failed to Update The Cabin!"
          : "Failed to Create The Cabin!"
      );
    },
  });

  return { createEditCabin, isCabinLoading };
}
