import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Typography } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import Loader from "../layout/Loader/Loader";
import SideBar from "./Sidebar";
import "./processOrder.css";

import { Button } from "@mui/material";
import { IndOrderFailed, IndOrderRequest, IndOrderSuccess } from "../../features/individualsOrderDetailsSlice";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const ProcessOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const params = useParams();
    const id=params.id;
    
  const {error, loading } = useSelector((state) => state.individualOrder);
  const order = useSelector((state) => state.individualOrder.individualOrder);

  const updateOrderSubmitHandler = async(e) => {
    e.preventDefault();

    const config={
        withCredentials:true
    }

    try {
        const {data}=await axios.put(`http://localhost:4000/api/v1/admin/order/${id}`,{status},config);
        toast.success('Order status updated successfully!',toastOptions);
        
        setTimeout(() => {
            navigate('/admin/dashboard');
        }, 2000);

    } catch (error) {
        toast.error('failed to change order status',toastOptions);
    }
  };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }
    // if (updateError) {
    //   alert.error(updateError);
    //   dispatch(clearErrors());
    // }
    // if (isUpdated) {
    //   alert.success("Order Updated Successfully");
    //   dispatch({ type: UPDATE_ORDER_RESET });
    // }

    const getIndividualOrderDetails = async () => {
        try {
            dispatch(IndOrderRequest());
            const { data } = await axios.get(`http://localhost:4000/api/v1/order/${id}`, {
                withCredentials: true,
            });

            dispatch(IndOrderSuccess(data?.data));

        } catch (err) {
            dispatch(IndOrderFailed(err.response?.data?.message || "Something went wrong"));
            toast.error(err.response?.data?.message || "Something went wrong", toastOptions);
        }
    };

    getIndividualOrderDetails();

    // dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
        <ToastContainer/>
        <MetaData title="Process Order" />
         <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
            {loading ? (
                <Loader />
            ) : (
                <div
                className="confirmOrderPage"
                style={{
                    display: order?.orderStatus === "Delivered" ? "block" : "grid",
                }}
                >
                <div>
                    <div className="confirmshippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                        <p>Name:</p>
                        <span>{order?.user && order?.user?.name}</span>
                        </div>
                        <div>
                        <p>Phone:</p>
                        <span>
                            {order?.shippingInfo && order?.shippingInfo?.phoneNo}
                        </span>
                        </div>
                        <div>
                        <p>Address:</p>
                        <span>
                            {order?.shippingInfo &&
                            `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.pinCode}, ${order?.shippingInfo?.country}`}
                        </span>
                        </div>
                    </div>

                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                        <p
                            className={
                            order?.paymentInfo &&
                            order?.paymentInfo?.status === "succeeded"
                                ? "greenColor"
                                : "redColor"
                            }
                        >
                            {order?.paymentInfo &&
                            order?.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                        </div>

                        <div>
                        <p>Amount:</p>
                        <span>{order?.totalPrice && order?.totalPrice}</span>
                        </div>
                    </div>

                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                        <p
                            className={
                            order?.orderStatus && order?.orderStatus === "Delivered"
                                ? "greenColor"
                                : "redColor"
                            }
                        >
                            {order?.orderStatus && order?.orderStatus}
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {order?.orderItems &&
                        order?.orderItems.map((item) => (
                            <div key={item?.product}>
                            <img src={item?.image} alt="Product" />
                            <Link to={`/product/${item.product}`}>
                                {item.name}
                            </Link>{" "}
                            <span>
                                {item?.quantity} X ৳ {item?.price} ={" "}
                                <b>৳ {item?.price * item?.quantity}</b>
                            </span>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
                {/*  */}
                <div
                    style={{
                    display: order?.orderStatus === "Delivered" ? "none" : "block",
                    }}
                >
                    <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                    >
                    <h1>Process Order</h1>

                    <div>
                        <AccountTreeIcon />
                        <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order?.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                        )}

                        {order?.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                        )}
                        </select>
                    </div>

                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={
                        loading ? true : false || status === "" ? true : false
                        }
                    >
                        Process
                    </Button>
                    </form>
                </div>
                </div>
            )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
