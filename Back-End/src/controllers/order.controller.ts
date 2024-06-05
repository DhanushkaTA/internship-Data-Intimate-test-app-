import express from "express";
import AddressModel from "../models/address.model";
import {CustomResponse} from "../dtos/custom.response";
import OrderModel from "../models/order.model";
import UserModel from "../models/user.model";
import OrderDetailModel from "../models/orderDetails.model";
import ItemModel from "../models/item.model";


export const saveOrder = async (req:express.Request,res:express.Response) => {
    try{


        console.log(req.body)
        ///////////////////////////////////////////////////////////////////

        let model = await OrderModel.create(req.body.order);


        console.log('--------------------------------------------------')
        console.log(model)

        if(model){


            let list: any[] =  req.body.details;

            for (let value of list){
                let newVar = await OrderDetailModel.create({
                    item_id:value.item_id,
                    order_id:req.body.order.order_id,
                    qty:value.qty,
                    total_price:value.total_price
                });
            }

            // list.map(value => {
            //
            //
            //
            // })


            res.status(201).json(
                new CustomResponse(201,"Order Saved!!",model.dataValues)
            )


        }else {
            res.status(500).send(
                new CustomResponse(500,`Not saved Order`)
            )
        }

    }catch (error){
        console.log(error)
        res.status(500).send(
            new CustomResponse(500,`Something went wording in Order 💥!!!`,error)
        )
    }
}

export const getOrders = async (req:express.Request,res:express.Response)=> {

    try {

        //Eager fetching
        // let order = await OrderModel.findOne({
        //     where:{
        //         order_id:req.body.order
        //     },
        //     include:ItemModel
        // })

        //Lazy fetching
        let order = await OrderModel.findOne({
            where:{
                order_id:req.body.order
            }
        })

        console.log(order)


        if (order){
            // @ts-ignore
            console.log(await order.getItems())
        }

        // console.log(newVar)


        res.status(200).json(
            new CustomResponse(200,`Get Users address`,order)
        )


    }catch (error){
        console.log(error)
        res.status(500).send(
            new CustomResponse(500,`Somthong went worng!!!`)
        )
    }

}

// const addOrderDetails = async (req:express.Request,res:express.Response)=> {
//
//     try {
//
//     }catch (error){
//         console.log(error)
//         res.status(500).send(
//             new CustomResponse(500,`Somthong went worng!!!`)
//         )
//     }
//
// }