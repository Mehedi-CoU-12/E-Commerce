import { Order } from "../Models/orderModel.js";
import { Product } from "../Models/productModels.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//create new order
const newOrder=asyncHandler(async(req,res)=>{
    
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body;

    console.log(req.body);

    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    })

    res.status(201).json(new ApiResponse(201,order,'order created successfully!'));
})

// get single order details
const getSingleOrder=asyncHandler(async(req,res)=>{

    const id=req.params.id;

    //here this populate function will be 
    const order=await Order.findById(id).populate("user","name email");

    if(!order)
        throw new ApiError(404,'order not found!');

    res.status(200).json(new ApiResponse(200,order,'order fatched from db successfully!'));
})

//get logged in user orders
const myOrders=asyncHandler(async(req,res)=>{

    const orders=await Order.find({user:req.user._id});

    if(!orders)
        throw new ApiError(500,'oders fatching problem!');

    res.status(200).json(new ApiResponse(200,orders,'order fatched successfully!'));
})

//get all orders-->admin
const getAllOrders=asyncHandler(async(req,res)=>{

    const orders=await Order.find();

    //calculate the total ammount of all orders
    let totalAmmount=0;
    orders.forEach(order=>{
        totalAmmount+=order.totalPrice;
    });

    res.status(200).json(new ApiResponse(200,{totalAmmount,orders},'orders and total ammount calculated successfully!'));

})

//update order status-->admin
const updateOrderStatus=asyncHandler(async(req,res)=>{

    const order=await Order.findById(req.params.id);

    if(!order)
        throw new ApiError(403,'Order does not found with this Id');

    if(order.orderStatus==='Delivered')
        throw new ApiError(400,'You have  already delivered this order!');

    //this will update the product stock and quantity
    order.orderItems.forEach(async(item)=>{
        await updateStock(item.product,item.quantity);
    });

    order.orderStatus=req.body.status;

    if(req.body.status==='Delivered')
        order.deliveredAt=Date.now();

    await order.save({validateBeforeSave:false});

    res.status(200).json(new ApiResponse(200,'','order updated successfully!'));
})

async function updateStock(id,quantity) {
    
    
    const product=await Product.findById(id);

    product.Stock-=quantity;

    await product.save({validateBeforeSave:false});
}

//delete order -->admin
const deleteOrder=asyncHandler(async(req,res)=>{

    const order=await Order.findById(req.params.id);

    if(!order)
        throw new ApiError(400,'Order not found with this Id');
    
    await order.remove();

    res.status(200).json(new ApiResponse(200,'','order deleted successfully!'));
})

export {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
}