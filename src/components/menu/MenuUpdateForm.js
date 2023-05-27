import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, InputAdornment, Button } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import { useDispatch } from "react-redux";
import { updateMenuItem } from "../../reducers/menuSlice";

var initialFieldValues = {};

const useStyles = makeStyles((theme) => ({
  icons: {
    color: theme.palette.primary.dark,
  },
}));

export default function MenuUpdateForm({
  handleClickError,
  handleClickSuccess,
  menuData,
  setOpenPopup,
}) {
  const dispatch = useDispatch();
  initialFieldValues = {
    price: menuData.price,
    name: menuData.name,
    sectionName: menuData.sectionName, //change later
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("price" in fieldValues)
      temp.price = fieldValues.price ? "" : "This field is required.";
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("sectionName" in fieldValues)
      temp.sectionName = fieldValues.sectionName
        ? ""
        : "This field is required.";

    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //dispatch here
      console.log("Bhai bhai Dispatch");
      console.log(values);
      var finalValues = {
        ...values,
        itemId: menuData.itemId,
        sectionId: menuData.sectionId,
      };
      dispatch(updateMenuItem(finalValues));
      handleClickSuccess();
      setOpenPopup(false);
    } else {
      handleClickError();
    }
  };

  const { values, handleInputChange, setValues, setErrors, resetForm, errors } =
    useForm(initialFieldValues, true, validate);
  const classes = useStyles();
  return (
    <Form>
      <Grid>
        <Grid item xs={12}>
          <Controls.Input
            name='sectionName'
            label='Category *'
            fullWidth
            value={values.sectionName}
            onChange={handleInputChange}
            error={errors.sectionName}

            // helperText='Keep unique'
            //
          />
          <Controls.Input
            name='name'
            label='Item Name *'
            fullWidth
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}

            // helperText='Keep unique'
            //
          />
          <Controls.Input
            name='price'
            label='Price *'
            fullWidth
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
            type='number'
          />

          <Button
            fullWidth
            size='medium'
            onClick={handleSubmit}
            color='primary'
            variant='contained'
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}
