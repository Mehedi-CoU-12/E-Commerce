import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import Sidebar from './Sidebar';
import { Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './productList.css';
import { deleteProductFail, deleteProductRequest, deleteProductSuccess } from '../../features/deleteProductSlice';
import axios from 'axios';
import { getAllProduct } from '../../features/adminProductSlice';

const ProductList = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {products,loading}=useSelector((state)=>state.adminProduct);

    useEffect(()=>{
        dispatch(getAllProduct());
    },[dispatch])

    const toastOptions = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const deleteProductHandler = (id) => {
        
        const deleteProduct=async()=>{
            try {
                dispatch(deleteProductRequest());
                const {data}=await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/product/${id}`,{
                    withCredentials:true
                });
                dispatch(deleteProductSuccess(data?.data));
                toast.success('Product deleted successfully!',toastOptions);
                navigate('/admin/dashboard');
            } catch (error) {
                toast.error(error?.message,toastOptions);
                dispatch(deleteProductFail(error?.message));
            }
        }
        deleteProduct();
    };

    const columns = [
        { 
            field: "id", 
            headerName: "Product ID", 
            minWidth: 200, 
            flex: 0.5 
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 300,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 50,
          flex: 0.3,
        },
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 200,
          flex: 0.5,
        },
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 200,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/product/${params.id}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.id)
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
    
    products &&
    products?.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name,
        });
    });

  return (
    <Fragment>
        {loading? <Loader/>
        :<Fragment>
            <ToastContainer/>
            <MetaData title={`ALL PRODUCTS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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
        </Fragment>}
    </Fragment>
  )
}

export default ProductList