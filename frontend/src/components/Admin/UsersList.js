import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./productList.css";

import axios from "axios";
import { allUserFailed, allUserRequest, allUserSuccess } from "../../features/allUserSlice";

const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    };

const UsersList = () => {
    const dispatch = useDispatch();
    const params=useParams();

    const { error, users } = useSelector((state) => state.allUsers);
  
    //get all user;
    const getAllUsers=async()=>{
        try {
            dispatch(allUserRequest());
            const {data}=await axios.get('http://localhost:4000/api/v1/admin/users',{
                withCredentials:true
            });
    
            dispatch(allUserSuccess(data?.data));
            toast.success('all user fatched',toastOptions);
    
        } catch (error) {
            dispatch(allUserFailed(error.message));
            toast.error(error?.message||'something went wrong!',toastOptions);
        }
    }

    const deleteUserHandler = async(id) => {
        try {
            const {data}=await axios.delete(`http://localhost:4000/api/v1/admin/user/${id}`,{
                withCredentials:true,
            })
            toast.success('user deleted!',toastOptions);
            getAllUsers();

        } catch (error) {
            toast.error('user deletion failed',toastOptions);
        }
  };

  useEffect(() => {

    getAllUsers();

  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params?.row?.role === "admin"
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
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.id)
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

  users &&
    users?.forEach((user) => {
      rows.push({
        id: user?._id,
        role: user?.role,
        email: user?.email,
        name: user?.name,
      });
    });

  return (
    <Fragment>
        <ToastContainer/>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;