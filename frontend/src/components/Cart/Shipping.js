import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutSteps from "./CheckoutSteps";
import "./Shipping.css";
import { setShippingInfo } from "../../features/shippingSlice";
import { useNavigate } from "react-router-dom";

const Shipping = () => {

    const dispatch = useDispatch();
    const navigete = useNavigate();

    const { shippingInfo } = useSelector((state) => state.shipping);

    const [address, setAddress] = useState(shippingInfo?.address || "");
    const [city, setCity] = useState(shippingInfo?.city || "");
    const [state, setState] = useState(shippingInfo?.state || "");
    const [country, setCountry] = useState(shippingInfo?.country || "");
    const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");

    const stylesForAlert={
        position: "top-right", // Position of the toast
        autoClose: 2000, // Auto-close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };


    const shippingSubmit = (e) => {
        e.preventDefault();
        
        if(phoneNo.length<11){
            toast.error('Phone number should be 11 digits',stylesForAlert);
            return;
        }

        dispatch(setShippingInfo({address,city,state,country,pinCode,phoneNo}));
        navigete('/order/confirm');

    // Dispatch action here (if applicable)
    // dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
  };

  return (
    <div>
        <ToastContainer/>
        <CheckoutSteps activeStep={0} />
        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeader">Shipping Details</h2>

                <form className="shippingForm" onSubmit={shippingSubmit}>
                    <div>
                        <HomeIcon />
                        <input
                            type="text"
                            placeholder="Address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div>
                        <LocationCityIcon />
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div>
                        <PinDropIcon />
                        <input
                            type="number"
                            placeholder="Pin Code"
                            required
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                    </div>

                    <div>
                        <PhoneIcon />
                        <input
                            type="number"
                            placeholder="Phone Number"
                            required
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            size={10}
                        />
                    </div>

                    <div>
                        <PublicIcon />
                        <select
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value="">Select Country</option>
                            {Country.getAllCountries().map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                            </option>
                            ))}
                        </select>
                    </div>

                    {country && (
                        <div>
                            <TransferWithinAStationIcon />
                            <select
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="">Select State</option>
                                {State.getStatesOfCountry(country).map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <input
                        type="submit"
                        value="Continue"
                        className="shippingBtn"
                        disabled={!state}
                    />
                </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
