import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import "./myOrder.css";
import { clearErrors, createOrderFailed, createOrderRequest, createOrderSuccess } from "../../features/newOrderSlice";
import axios from "axios";

const stylesForAlert={
    position: "top-right", // Position of the toast
    autoClose: 2000, // Auto-close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.newOrder);
  const { logInUser } = useSelector((state) => state.user);

//   console.log(order);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => 
            params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.3,
    },

    {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 270,
        flex: 0.5,
    },

    {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => (
            <Link to={`/order/${params.row.id}`}>
                <LaunchIcon />
            </Link>
        )   
    },

    
  ];

  const rows = [];

  order &&
    order?.forEach((item, index) => {
      rows.push({
        itemsQty: item?.orderItems?.length,
        id: item?._id,
        status: item?.orderStatus,
        amount: item?.totalPrice,
      });
    });

    useEffect(() => {
        if (error) {
          toast.error(error, stylesForAlert);
          dispatch(clearErrors());
        }
      
        const fetchOrders = async () => {
          try {
            dispatch(createOrderRequest());
            const { data } = await axios.get("http://localhost:4000/api/v1/order/me", {
              withCredentials: true,
            });
      
            // console.log("Fetched Orders:", data?.data);  // Debugging Log
      
            dispatch(createOrderSuccess(data?.data));
          } catch (error) {
            dispatch(createOrderFailed(error?.message));
            toast.error(error?.message, stylesForAlert);
          }
        };
      
        fetchOrders();
      }, [dispatch, error]);
      
  return (
    <Fragment>
        <ToastContainer/>
        <MetaData title={`${logInUser?.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{logInUser?.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;