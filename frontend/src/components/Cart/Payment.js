import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { clearErrors, createOrderFailed, createOrderRequest, createOrderSuccess } from "../../features/newOrderSlice";
import { resetShippingInfo } from "../../features/shippingSlice";

const Payment = () => {
    
    const stylesForAlert = {
        position: "top-right", // Position of the toast
        autoClose: 2000, // Auto-close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const navigate = useNavigate();

    const { shippingInfo } = useSelector((state) => state.shipping);
    const {items}=useSelector((state)=>state.cart);
    const { logInUser } = useSelector((state) => state.user);

    const { loading, success, error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: items,
        itemPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;
        
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials:true
            };
            dispatch(createOrderRequest());
            const { data } = await axios.post("http://localhost:4000/api/v1/process/payment", paymentData, config);

            const client_secret = data?.data?.client_secret;

            if (!stripe || !elements)
                return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: logInUser.name,
                        email: logInUser.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    
                    //save the order to the database
                    try {
                        dispatch(createOrderRequest());
                    
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            withCredentials: true,
                        };
                    
                        const {data} = await axios.post("http://localhost:4000/api/v1/order/new", order, config);
                
                        dispatch(createOrderSuccess(data?.data)); // Save order to Redux store
                        toast.success('Payment Successful!',stylesForAlert);
                        dispatch(resetShippingInfo());

                    }catch (error) {
                        dispatch(createOrderFailed(error.response?.data2?.message || "Failed to place order"));
                    }

                    setTimeout(() => {
                        navigate("/success");
                    }, 1000);

                } else {
                    toast.error("There's some issue while processing payment.",stylesForAlert);
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            dispatch(createOrderFailed(error.response.data.message));
            toast.error(error.response?.data?.message || "Payment failed",stylesForAlert);
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

  return (
    <Fragment>
      <ToastContainer />
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ৳${orderInfo && orderInfo?.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
