import React from "react";
import "./sidebar.css";
import logo from "../../images/shoptodayBlack.png";
import { Link, useNavigate } from "react-router-dom";
import {  TreeItem, SimpleTreeView } from '@mui/x-tree-view';
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {

    const navigate=useNavigate();

  return (
    <div className="sidebar">
        <Link to="/">
            <img src={logo} alt="Ecommerce" />
        </Link>

        <Link to="/admin/dashboard">
            <p>
            <DashboardIcon /> Dashboard
            </p>
        </Link>

        <SimpleTreeView>
            <TreeItem itemId="1" id="products" label="Products" icon={<ImportExportIcon />}>

                <TreeItem
                    itemId="2"
                    id="all-products"
                    label="All"
                    icon={<PostAddIcon />}
                    onClick={() => navigate('/admin/products')}
                />

                <TreeItem
                    itemId="3"
                    id="create-product"
                    label="Create"
                    icon={<AddIcon />}
                    onClick={() => navigate('/admin/products/new')}
                />
            </TreeItem>
        </SimpleTreeView>

        <Link to="/admin/orders">
            <p>
            <ListAltIcon />
            Orders
            </p>
        </Link>
        
        <Link to="/admin/users">
            <p>
            <PeopleIcon /> Users
            </p>
        </Link>

        <Link to="/admin/reviews">
            <p>
            <RateReviewIcon />
            Reviews
            </p>
        </Link>
    </div>
  );
};

export default Sidebar;
