import React, { Fragment, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./orderDetails.css";
import axios from "axios";
import { clearErrors, IndOrderFailed, IndOrderRequest, IndOrderSuccess } from "../../features/individualsOrderDetailsSlice";

const stylesForAlert = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const OrderDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;

    // Get state from Redux
    const { individualOrder, error, loading } = useSelector((state) => state.individualOrder);

    useEffect(() => {
        if (error) {
            toast.error(error, stylesForAlert);
            dispatch(clearErrors());
        }

        const fetchOrderDetails = async () => {
            try {
                dispatch(IndOrderRequest());
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/${id}`, {
                    withCredentials: true,
                });

                dispatch(IndOrderSuccess(data?.data)); // Ensure we store the correct data

            } catch (err) {
                dispatch(IndOrderFailed(err.response?.data?.message || "Something went wrong"));
                toast.error(err.response?.data?.message || "Something went wrong", stylesForAlert);
            }
        };

        if (!individualOrder || individualOrder._id !== id) {
            fetchOrderDetails();
        }

    }, [dispatch, error, id]); // Only fetch when the `id` changes

    return (
        <Fragment>
            <ToastContainer />
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title="Order Details" />
                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <Typography component="h1">
                                Order #{individualOrder?._id}
                            </Typography>

                            <Typography>Shipping Info</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>Name:</p>
                                    <span>{individualOrder?.user?.name || "N/A"}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>{individualOrder?.shippingInfo?.phoneNo || "N/A"}</span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>
                                        {individualOrder?.shippingInfo
                                            ? `${individualOrder.shippingInfo.address}, ${individualOrder.shippingInfo.city}, ${individualOrder.shippingInfo.state}, ${individualOrder.shippingInfo.pinCode}, ${individualOrder.shippingInfo.country}`
                                            : "N/A"}
                                    </span>
                                </div>
                            </div>

                            <Typography>Payment</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p className={individualOrder?.paymentInfo?.status === "succeeded" ? "greenColor" : "redColor"}>
                                        {individualOrder?.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
                                    </p>
                                </div>
                                <div>
                                    <p>Amount:</p>
                                    <span>{individualOrder?.totalPrice || "N/A"}</span>
                                </div>
                            </div>

                            <Typography>Order Status</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p className={individualOrder?.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                        {individualOrder?.orderStatus || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="orderDetailsCartItems">
                            <Typography>Order Items:</Typography>
                            <div className="orderDetailsCartItemsContainer">
                                {individualOrder?.orderItems?.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        <span>
                                            {item.quantity} X ৳ {item.price} = <b>৳ {item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetails;
