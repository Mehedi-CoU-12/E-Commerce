import axios from "axios";
import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { adminProductFail, adminProductRequest, adminProductSuccess, getAllProduct } from "../../features/adminProductSlice.js";
import "./dashboard.css";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import Loader from "../layout/Loader/Loader.js";
import { allOrderFailed, allOrderRequest, allOrderSuccess } from "../../features/allOrderSlice.js";
import { allUserFailed, allUserRequest, allUserSuccess } from "../../features/allUserSlice.js";
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement
);

const Dashboard = () => {

  const dispatch = useDispatch();

  const { products,loading } = useSelector((state) => state.adminProduct);
  const { orders } = useSelector((state) => state.allOrders);
  const {users}=useSelector((state)=>state.allUsers)

//   const { users } = useSelector((state) => state.allUsers);

    useEffect(()=>{

        dispatch(getAllProduct());

        const getAllOrders=async()=>{
            try {
                dispatch(allOrderRequest());
                const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/orders`,{
                    withCredentials:true
                });
                // console.log(data?.data);
                dispatch(allOrderSuccess(data?.data));
            } catch (error) {
                console.log(error.messsage);
                dispatch(allOrderFailed(error?.messsage));
            }
        }

        const getAllUsers=async()=>{
            try {
                dispatch(allUserRequest());
                const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/users`,{
                    withCredentials:true
                });
                // console.log(data.data);
                dispatch(allUserSuccess(data?.data));
            } catch (error) {
                console.log(error.messsage);
                dispatch(allUserFailed(error?.messsage));
            }
        }
        
        getAllOrders();
        getAllUsers();

    },[dispatch])


  let outOfStock = 0;

  products &&
    products?.forEach((item) => {
      if (item?.Stock === 0) {
        outOfStock += 1;
      }
    });

    let totalAmount = orders?.
    totalAmmount || 0;


  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };


  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, (products?.length || 0) - outOfStock],
      },
    ],
  };

  return ( 
    <Fragment>
        {loading?
        <Loader/> :
        <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ৳ {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products?.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>
                {orders?.orders?.length || 0}
              </p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>
                {users && users.length}
              </p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
            <Line data={lineState} />
        </div>

        <div className="doughnutChart">
            <Doughnut data={doughnutState} />
        </div>
        </div>
    </div>}
    </Fragment>
  );
};

export default Dashboard;