import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import Sidebar from './Sidebar';
import { Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import './productList.css';


const ProductList = () => {

    const {products,loading}=useSelector((state)=>state.adminProduct);

    const deleteProductHandler = (id) => {
        
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
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
        {
          field: "price",
          headerName: "Price",
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
    products.forEach((item) => {
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