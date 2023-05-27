import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import QRCode from "qrcode.react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PersonIcon from "@material-ui/icons/Person";
import CropFreeIcon from "@material-ui/icons/CropFree";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DownloadIcon from "@material-ui/icons/ArrowDownward";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { deleteTable } from "../../reducers/tableSlice";
import TableUpdateForm from "../tables/TableUpdateForm";
import Popup from "../global/Popup";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 580,
  },
  cover: {
    width: 180,
    height: 150,
  },
  content: {
    flex: "1 0 auto",
  },
  actions: {
    marginTop: "auto",
  },
}));

export default function TablesCardItem() {
  const [openPopup, setOpenPopup] = useState(false);
  //snackbar
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
  const data = useSelector((state) => state.table.tables);
  // const [data, setData] = useState({
  //   id: "5fef0e0ff4b5ef08a357d814",
  //   tableNumber: 1,
  // });
  const dispatch = useDispatch();
  const [showQr, setShowQr] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const handleSetShowQr = (id, tableNumber) => {
    setShowQr(!showQr);
    var obj = {
      id,
      tableNumber,
    };
    setJsonData(JSON.stringify(obj));
  };
  const [tableToBeUpdated, setTableToBeUpdated] = useState({});
  const handleEdit = (table) => {
    setTableToBeUpdated(table);
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${data.tableNumber}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    handleSetShowQr();
  };
  return (
    <React.Fragment>
      {data &&
        data.map((table) => (
          <Card className={classes.root} key={table._id}>
            {/* pop up for updates */}
            <Popup
              title='Update Table'
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <TableUpdateForm
                handleClickError={handleClickError}
                handleClickSuccess={handleClickSuccess}
                tableData={tableToBeUpdated}
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
                Tables updated!
              </Alert>
            </Snackbar>

            <CardMedia
              className={classes.cover}
              image='https://www.btklsby.go.id/images/placeholder/food.png'
            />
            <CardContent className={classes.content}>
              <Box display='flex' alignItems='center' flexDirection='row'>
                <Box ml={1}>
                  <Typography component='h5' variant='h4'>
                    #{table.tableNumber}
                  </Typography>
                </Box>
                <Box ml={1}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon color='inherit' fontSize='large' />
                    <Typography variant='h5' color='initial' component='h2'>
                      {table.capacity}
                    </Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>
            <CardActions className={classes.actions}>
              <Button
                variant='contained'
                size='small'
                color='secondary'
                startIcon={<DeleteIcon />}
                style={{ marginRight: 20 }}
                onClick={() => {
                  console.log("Will call delete for: ", table._id);
                  dispatch(deleteTable(table._id));
                }}
              >
                Delete
              </Button>

              <Button
                variant='contained'
                size='small'
                color='primary'
                startIcon={<EditIcon />}
                onClick={() => {
                  handleEdit(table);
                  setOpenPopup(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant='contained'
                size='small'
                color='inherit'
                startIcon={<CropFreeIcon />}
                onClick={() => handleSetShowQr(table._id, table.tableNumber)}
              >
                QR
              </Button>
            </CardActions>
            {showQr && (
              <Modal
                open={showQr}
                onClose={() => setShowQr(false)}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <div>
                  <QRCode
                    id={"qrcode"}
                    value={jsonData}
                    size={256}
                    level={"H"}
                    includeMargin={true}
                  />
                  <button>
                    <Button
                      size='small'
                      color='primary'
                      startIcon={<DownloadIcon />}
                      onClick={() => downloadQR()}
                    >
                      Download QR
                    </Button>
                  </button>
                </div>
              </Modal>
            )}
          </Card>
        ))}
    </React.Fragment>
  );
}
