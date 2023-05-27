import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import Popup from "../global/Popup";
import MenuUpdateForm from "./MenuUpdateForm";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { deleteMenuItem } from "../../reducers/menuSlice";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 120,
  },
});
export default function MenuCardItem({
  name,
  price,
  sectionName,
  sectionId,
  itemId,
}) {
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [openError, setOpenError] = useState(false);
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const [openSuccess, setOpenSuccess] = useState(false);
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };
  const handleClickError = () => {
    setOpenError(true);
  };
  const handleClickSuccess = () => {
    setOpenSuccess(true);
  };

  const classes = useStyles();
  const [itemToBeUpdated, setItemToBeUpdated] = useState({});
  const handleEdit = (menuData) => {
    setItemToBeUpdated(menuData);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image='https://www.btklsby.go.id/images/placeholder/food.png'
      />
      <CardContent>
        <Typography variant='h6' component='h2'>
          {name}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <AttachMoneyIcon color='action' fontSize='small' /> */}
          <Typography variant='subtitle2' color='textSecondary' component='h2'>
            ₹ {price}
          </Typography>
        </div>
      </CardContent>

      <CardActions>
        <Button
          size='small'
          color='secondary'
          startIcon={<DeleteIcon />}
          onClick={() => {
            dispatch(deleteMenuItem({ sectionId, itemId }));
          }}
        >
          Delete
        </Button>
        <Button
          size='small'
          color='primary'
          startIcon={<EditIcon />}
          onClick={() => {
            handleEdit({ name, price, sectionName, sectionId, itemId });
            setOpenPopup(true);
          }}
        >
          Edit
        </Button>
      </CardActions>

      {/* popup  */}

      <Popup
        title='Update Table'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <MenuUpdateForm
          handleClickError={handleClickError}
          handleClickSuccess={handleClickSuccess}
          menuData={itemToBeUpdated}
          setOpenPopup={setOpenPopup}
        />
      </Popup>

      {/* snackbars */}
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity='error'>
          Please fill the fields correctly!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity='success'>
          Menu updated!
        </Alert>
      </Snackbar>
    </Card>
  );
}
