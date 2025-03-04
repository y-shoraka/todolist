/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const AddModal = ({
  modalMode,
  closeHandler,
}: {
  modalMode: { open: boolean; edit: string };
  closeHandler: ({
    item,
    edit,
  }: {
    item: Record<string, any>;
    edit: string;
  }) => void;
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: modalMode.edit,
    },
  });

  const onSubmit = (data: any) => {
    closeHandler({ item: { ...data, id: Date() }, edit: modalMode.edit });
  };

  useEffect(() => {
    setValue("name", modalMode.edit);
  }, [modalMode.edit, setValue]);

  return (
    <Modal open={modalMode.open} onClose={closeHandler}>
      <Box
        sx={{
          width: 400,
          backgroundColor: "white",
          margin: "auto",
          marginTop: "24px",
          padding: "16px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 id="unstyled-modal-title" className="modal-title">
            write the name of your task
          </h2>

          <Controller
            name="name"
            control={control}
            rules={{ required: "Task name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name of the task"
                fullWidth
                defaultValue={modalMode.edit}
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            {!modalMode.edit.length ? "Add the task" : "Edit the task"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
