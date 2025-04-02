import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import axios from "axios";
import { productDetailsFail, productDetailsRequest, productDetailsSuccess } from "../../features/productSlice";
import { updatePasswordRequest } from "../../features/profileSlice";
import { updateProductFail, updateProductSuccess } from "../../features/updateProductSlice";

const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const params=useParams();

    const { loading } = useSelector((state) => state.updateProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
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

    const productId = params.id;

    useEffect(() => {

            const fetchProductInfo = async () => {
                try {
                    dispatch(productDetailsRequest());
                    const {data} = await axios.get(`http://localhost:4000/api/v1/product/${productId}`,{
                        withCredentials:true
                    });

                    dispatch(productDetailsSuccess(data?.data));
                    setName(data?.data?.name);
                    setDescription(data?.data?.description);
                    setPrice(data?.data?.price);
                    setCategory(data?.data?.category);
                    setStock(data?.data?.Stock);
                    setOldImages(data?.data?.images);
                    
                } catch (error) {
                    dispatch(productDetailsFail(error?.data?.message));
                    toast.error("Failed to Fetch Product Details",toastOptions);
                }
            };

            fetchProductInfo();


        // if (updateError) {
        //   toast.error(updateError,toastOptions);
        //   dispatch(clearErrors());
        // }

        // if (isUpdated) {
        //   toast.success("Product Updated Successfully");
        //   navigate("/admin/products");
        //   dispatch({ type: UPDATE_PRODUCT_RESET });
        // }
    }, [productId]);

    const updateProductSubmitHandler =async(e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((file) => {
            myForm.append("images", file); // Append the actual File object
        });

        // for(const [key,value] of myForm){
        //     console.log('key: ',key);
        //     console.log('value: ',value);
        // }

        const config={
            headers: { 
                "Content-Type": "multipart/form-data" 
            },
            withCredentials: true
        };

        // dispatch(updateProduct(productId, myForm));
        try {
            dispatch(updatePasswordRequest());

            const {data}=await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/product/${productId}`,myForm,config);

            dispatch(updateProductSuccess(data?.data));

            toast.success("Product Updated Successfully!",toastOptions);
            navigate('/admin/dashboard');

        } catch (error) {
            console.error("Update Error:", error.response?.data || error.message);
            console.log(error?.message);

            dispatch(updateProductFail(error?.message));
            toast.error("Product Update Failed!",toastOptions);
        }
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
      
        setImages(files); // Store File objects
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
        <MetaData title="Update Product" />
        <div className="dashboard">
        <Sidebar />
            <div className="newProductContainer">
                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={updateProductSubmitHandler}
                >
                <h1>Update Product</h1>

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
                        value={price}
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
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
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
                        value={Stock}
                    />
                </div>

                <div id="createProductFormFile">
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        onChange={updateProductImagesChange}
                        multiple
                    />
                </div>

                <div id="createProductFormImage">
                {oldImages &&
                    oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt="Old Product Preview" />
                    ))}
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
                    Update
                </Button>
                </form>
            </div>
        </div>
    </Fragment>
  );
};


export default UpdateProduct;