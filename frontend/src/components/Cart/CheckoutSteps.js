import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <LocalShippingIcon />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: "Payment",
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <div className="stepperContainer">
      <Stepper alternativeLabel activeStep={activeStep} className="stepper">
        
        {steps.map((item, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel
              icon={item.icon}
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
            >
              <Typography>{item.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
