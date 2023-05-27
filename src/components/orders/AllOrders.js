import React from "react";
import { useSelector } from "react-redux";
import Order from "./Order";


function AllOrders (){
  //selector
  const orders = useSelector((state) => state.order.orders)
  //Handlers 
  return (
          <React.Fragment>
            {orders && orders.map((order) => (
              <Order
                order={order}
                tableNumber={order.tableNumber}
                time={order.createdAt}
              />
            ))}
          </React.Fragment>
        );
}

export default AllOrders;
