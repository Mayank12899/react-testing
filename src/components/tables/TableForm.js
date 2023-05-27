import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, InputAdornment, Button } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import Input from "../controls/Input";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import GroupIcon from "@material-ui/icons/Group";
import { useDispatch } from "react-redux";
import { addTable } from "../../reducers/tableSlice";
// const genderItems = [
//     { id: 'male', title: 'Male' },
//     { id: 'female', title: 'Female' },
//     { id: 'other', title: 'Other' },
// ]

const initialFieldValues = {
  capacity: null,
  tableNumber: null,
};
const useStyles = makeStyles((theme) => ({
  icons: {
    color: theme.palette.primary.dark,
  },
}));
export default function TableForm({
  handleClickError,
  handleClickSuccess,
  setOpenPopup,
}) {
  //   const submitHandle = () => {
  //     console.log("Bhai bhai Dispatch");
  //     console.log(values);
  //   };
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //   };
  const dispatch = useDispatch();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("capacity" in fieldValues)
      temp.capacity = fieldValues.capacity ? "" : "This field is required.";
    if ("tableNumber" in fieldValues)
      temp.tableNumber = fieldValues.tableNumber
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
      handleClickSuccess();
      setOpenPopup(false);
      dispatch(addTable(values));
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
            name='tableNumber'
            label='Table Number *'
            fullWidth
            value={values.tableNumber}
            onChange={handleInputChange}
            error={errors.tableNumber}
            type='number'
            helperText='Keep unique'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AirlineSeatReclineNormalIcon className={classes.icons} />
                </InputAdornment>
              ),
            }}
          />
          <Controls.Input
            name='capacity'
            label='Capacity *'
            fullWidth
            value={values.capacity}
            onChange={handleInputChange}
            error={errors.capacity}
            type='number'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <GroupIcon className={classes.icons} />
                </InputAdornment>
              ),
            }}
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
