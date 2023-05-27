import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../reducers/orderSlice";
import moment from "moment";
import { useState } from "react";

// Generate Order Data
function createData(id, timestamp, itemName, tableNo, paymentMethod, quantity) {
  return { id, timestamp, itemName, tableNo, paymentMethod, quantity };
}

const rows = [
  createData(
    0,
    "12:00, 16 Mar 2019",
    "Butter Chicken",
    1,
    "VISA ⠀•••• 3719",
    1
  ),
  createData(1, "14:00, 16 Mar 2019", "Misal Pav", 5, "VISA ⠀•••• 2574", 2),
  createData(2, "17:00, 16 Mar 2019", "Matar Paneer", 8, "MC ⠀•••• 1253", 3),
  createData(3, "19:00, 16 Mar 2019", "Chicken Soup", 7, "AMEX ⠀•••• 2000", 2),
  createData(4, "20:00, 16 Mar 2019", "Meatballs", 1, "VISA ⠀•••• 5919", 1),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showLess, setShowLess] = useState(true);
  const orders = useSelector((state) => state.order.orders);
  useEffect(() => {
    dispatch(getOrderById());
  }, [dispatch]);
  var newRows = [];
  if (orders) {
    orders.map((order, index) => {
      newRows.push({
        id: index,
        timestamp: moment(order.createdAt).format("DD MMM hh:mm a"),
        tableNo: order.tableNumber,
        total: order.total,
        quantity: order.items.length,
      });
    });
  }
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Table No</TableCell>
            <TableCell>Total</TableCell>
            <TableCell align='right'>Quantity</TableCell>
            {/* <TableCell align='right'>Quantity</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {showLess &&
            newRows
              .reverse()
              .slice(0, 4)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.timestamp}</TableCell>
                  <TableCell>{row.tableNo}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell align='right'>{row.quantity}</TableCell>
                </TableRow>
              ))}
          {!showLess &&
            newRows.reverse().map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.tableNo}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell align='right'>{row.quantity}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link
          color='primary'
          onClick={() => setShowLess(!showLess)}
          style={{ cursor: "pointer" }}
        >
          {showLess && <a>See more orders</a>}
          {!showLess && <a>See less orders</a>}
        </Link>
      </div>
    </React.Fragment>
  );
}
