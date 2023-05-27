import React, { useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Title from "./Title";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getChart } from "../../reducers/orderSlice";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];

export default function Chart() {
  const dispatch = useDispatch();
  const theme = useTheme();
  useEffect(() => {
    dispatch(getChart());
  }, [dispatch]);
  const chartValues = useSelector((state) => state.order.chartValues);

  var newValues = [];
  if (chartValues) {
    chartValues.map((value) => {
      newValues.push({
        time: moment(value.time).format("DD-MMM hh:mm a"),
        amount: value.amount,
      });
    });
  }
  return (
    <React.Fragment>
      {/* <Title>Today</Title> */}
      <ResponsiveContainer width='100%'>
        <LineChart
          data={newValues.slice(Math.max(newValues.length - 5, 0))}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey='time' stroke={theme.palette.text.secondary} />
          <YAxis
            stroke={theme.palette.text.secondary}
            // domain={[0, "dataMax + 100"]}
          >
            <Label
              angle={270}
              position='left'
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Sales (₹)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='amount'
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
