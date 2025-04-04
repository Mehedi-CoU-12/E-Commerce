import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./productReviews.css";


import { DataGrid } from "@mui/x-data-grid"; 
import { Button } from "@mui/material"; 
import DeleteIcon from "@mui/icons-material/Delete"; 
import Star from "@mui/icons-material/Star"; 

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { allReviewFailed, allReviewRequest, allReviewSuccess, clearErrors, resetAllReview } from "../../features/allReviewSlice";
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

const ProductReviews = () => {

    const dispatch = useDispatch();

    const { error, reviews, loading } = useSelector((state) => state.allReviews);

    const [productId, setProductId] = useState("");

    //get all reviews 
    const getAllReviews=async()=>{
        try {
            dispatch(allReviewRequest());
            const { data } = await axios.get(
                `/api/v1/reviews?id=${productId}`,
                { withCredentials: true }
            );
            dispatch(allReviewSuccess(data?.data));
            toast.success("Product reviews fetched", toastOptions);
        } catch (error) {
            toast.error(error?.message, toastOptions);
            dispatch(allReviewFailed(error?.message));
        }
    }
 
    const deleteReviewHandler = async(reviewId) => {
        // dispatch(deleteReviews(reviewId, productId));
        try {
            await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`,{withCredentials:true})
            toast.success('review deleted!',toastOptions);
            getAllReviews();
        } catch (error) {
            toast.error(error.message,toastOptions);
        }
    };

    const productReviewsSubmitHandler =(e) => {
        e.preventDefault();
  
        // Reset before fetching new reviews
        dispatch(resetAllReview()); 
        getAllReviews();
    };

  useEffect(() => {
    if (error) {
      toast.error(error, toastOptions); // Show error
      dispatch(clearErrors()); // Clear error from Redux state
    }
    dispatch(resetAllReview());
  }, [error, dispatch]);
  

  useEffect(() => {
    if (productId.length === 24) {
        getAllReviews();
    }
  }, [dispatch, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params?.row?.rating >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params?.id)
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

  reviews &&
    reviews?.forEach((item) => {
      rows.push({
        id: item?._id,
        rating: item?.rating,
        comment: item?.comment,
        user: item?.name,
      });
    });

  return (
    <Fragment>
        <ToastContainer/>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews?.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;