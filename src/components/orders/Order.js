import React from "react";
import { withStyles, makeStyles, styled } from "@material-ui/core/styles";
import { compose, spacing, palette } from "@material-ui/system";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import RoomServiceIcon from "@material-ui/icons/RoomService";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import OutdoorGrillIcon from "@material-ui/icons/OutdoorGrill";
import { useDispatch } from "react-redux";
import { orderUpdate, updateIsPaid } from "../../reducers/orderSlice";
import { Button } from "@material-ui/core";
import moment from "moment";

const Box = styled("div")(compose(spacing, palette));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.light,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 1050,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function CustomizedTables({ order, tableNumber, time }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleIsPaid = (order_id) => {
    dispatch(updateIsPaid(order_id));
  };
  const handleIsPreparing = (order_id, item_id) => {
    // console.log("Inside IsPreparing");
    console.log(order_id);
    console.log(item_id);
    const values = {
      order_id,
      item_id,
      update_code: 1,
    };
    dispatch(orderUpdate(values));
  };
  const handleIsPrepared = (order_id, item_id) => {
    // console.log("Inside IsPrepared");
    console.log(order_id);
    console.log(item_id);
    const values = {
      order_id,
      item_id,
      update_code: 2,
    };
    dispatch(orderUpdate(values));
  };
  const handleIsServed = (order_id, item_id) => {
    console.log(order_id);
    console.log(item_id);
    const values = {
      order_id,
      item_id,
      update_code: 3,
    };
    dispatch(orderUpdate(values));
  };
  return (
    <TableContainer component={Paper} style={{ marginTop: 40 }}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell align='left' style={{ color: "white" }}>
              Table Number : {tableNumber}
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align='right'>
              <Box color='white' p={1}>
                <h4
                  style={{
                    padding: 10,
                    margin: 0,
                    backgroundColor: "lightgrey",
                    color: "black",
                    display: "inline-block",
                  }}
                >
                  {moment(time).format("DD MMM | hh:mm a")}
                </h4>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <StyledTableCell>Item Name</StyledTableCell>
            <StyledTableCell align='right'>Quantity</StyledTableCell>
            <StyledTableCell align='center'></StyledTableCell>
            <StyledTableCell align='right'>Actions</StyledTableCell>
            <StyledTableCell align='center'>
              {
                <Button
                  variant='outlined'
                  onClick={() => {
                    handleIsPaid(order._id);
                  }}
                  color='secondary'
                  disabled={order.isPaid}
                >
                  Completed Payment Using Cash
                </Button>
              }
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.items.map((item) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell component='th' scope='row'>
                {item.itemName}
              </StyledTableCell>
              <StyledTableCell align='right'>{item.quantity}</StyledTableCell>
              <StyledTableCell align='right'>
                <Fab
                  disabled={item.isPreparing}
                  onClick={() => handleIsPreparing(order._id, item._id)}
                  variant='round'
                  value={item}
                >
                  <OutdoorGrillIcon />
                </Fab>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Fab
                  disabled={item.isPrepared}
                  onClick={() => handleIsPrepared(order._id, item._id)}
                  variant='round'
                >
                  <AssignmentTurnedInIcon />
                </Fab>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Fab
                  disabled={item.isServed}
                  onClick={() => handleIsServed(order._id, item._id)}
                  variant='round'
                >
                  <RoomServiceIcon />
                </Fab>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
