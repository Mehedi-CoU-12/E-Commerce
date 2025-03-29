import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./productList.css";

import axios from "axios";
import { allOrderFailed, allOrderRequest, allOrderSuccess } from "../../features/allOrderSlice";
import { deleteOrderFailed, deleteOrderRequest, deleteOrderSuccess } from "../../features/deleteOrderSlice";


const toastOptions = {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
theme: "dark",
};

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const params=useParams();

    const { error, orders } = useSelector((state) => state.allOrders);

    const getAllOrders=async()=>{
        try {
            dispatch(allOrderRequest());
            const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/orders`,{
                withCredentials:true
            });
            // console.log(data.data);
            dispatch(allOrderSuccess(data?.data));
        } catch (error) {
            console.log(error.messsage);
            dispatch(allOrderFailed(error?.messsage));
        }
    }

    const deleteOrderHandler = (id) => {

        const deleteOrder=async () => {
            try {
                dispatch(deleteOrderRequest());
                const {data}=await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/order/${id}`,{
                    withCredentials:true
                })
                toast.success('Order deleted successfully!',toastOptions);
                dispatch(deleteOrderSuccess(data?.data))

                getAllOrders();
                // navigate('/admin/dashboard');

            } catch (error) {
                toast.error(error?.messsage ||'order deletion failed!',toastOptions);
                dispatch(deleteOrderFailed(error?.messsage));
            }
        }

        deleteOrder();
    };

  useEffect(() => {

    getAllOrders();
    
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params?.row?.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
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
      renderCell: (params) => {
        // console.log(params);
        return (
          <Fragment>
            <Link to={`/admin/order/${params?.row?.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params?.row?.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders?.orders &&
    orders?.orders.forEach((item) => {
      rows.push({
        id: item?._id,
        itemsQty: item?.orderItems?.length,
        amount: item?.totalPrice,
        status: item?.orderStatus,
      });
    });

  return (
    <Fragment>
        <ToastContainer/>
        <MetaData title={`ALL ORDERS - Admin`} />

        <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
            <h1 id="productListHeading">ALL ORDERS</h1>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10} // Number of rows per page
                rowsPerPageOptions={[10, 20, 30]} // Options for rows per page
                disableSelectionOnClick
                className="productListTable"
                autoHeight
            />
            </div>
        </div>
    </Fragment>
  );
};

export default OrderList;