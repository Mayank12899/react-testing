import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useSelector } from "react-redux";
import moment from "moment";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const chartValues = useSelector((state) => state.order.chartValues);
  var recentAmount = "";
  var recentDate = "";
  if (chartValues) {
    recentAmount = chartValues[chartValues.length - 1].amount;
    recentDate = moment(chartValues[chartValues.length - 1].time).format(
      "DD MMM, YYYY"
    );
  }
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component='p' variant='h4'>
        ₹ {recentAmount}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        on {recentDate}
      </Typography>
    </React.Fragment>
  );
}
