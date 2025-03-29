import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { newProductFail, newProductRequest, newProductSuccess, resetProduct } from "../../features/newProductSlice";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const { loading,  success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

    const toastOptions = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (success) {
            toast.success("Product Created Successfully!", toastOptions);
    
            setName("");
            setPrice(0);
            setDescription("");
            setCategory("");
            setStock(0);
            setImages([]);
            setImagesPreview([]);
    
            setTimeout(() => {
                navigate('/admin/dashboard');
                dispatch(resetProduct());
            }, 2000);
        }
    }, [success, navigate, dispatch]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        if(!category){
            toast.error("Please select a category!", toastOptions);
            return;
        }

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
        myForm.append("images", image);
        });
        
        //create product and save it to the database
        const createProduct=async()=>{
            try {
                dispatch(newProductRequest());

                const config = {
                    // headers: {
                    //     "Content-Type": "multipart/form-data"
                    // },
                    withCredentials: true
                };

                const {data}=await axios.post('http://localhost:4000/api/v1/admin/products/new',myForm,config);

                dispatch(newProductSuccess(data?.data));

            } catch (error) {
                dispatch(newProductFail(error?.message))
                toast.error(error.message ||"Product Creation Failed!",toastOptions);
            }
        }
        createProduct();
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        
        setImages(files); // Store actual File objects
        setImagesPreview([]);
        
        files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            }
        };
        reader.readAsDataURL(file);
        });
    };


  return (
    <Fragment>
        <ToastContainer/>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;