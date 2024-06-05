import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import ItemModel from "../models/item.model";
import OrderModel from "../models/order.model";


export const saveItem = async (req:express.Request,res:express.Response) => {
    try {

        let item = await ItemModel.create(req.body);

        if(item){
            res.status(201).json(
                new CustomResponse(201,"Item Saved!!",item.dataValues)
            )
        }else {
            res.status(500).send(
                new CustomResponse(500,`Not saved`)
            )
        }

    }catch (error){
        console.log(error)
        res.status(500).send(
            new CustomResponse(500,`Somthong went worng!!!`)
        )
    }
}

export const getItem = async (req:express.Request,res:express.Response) => {


    try {

        //Eager fetching
        // let item = await ItemModel.findOne({
        //     where:{
        //         item_id:req.body.item
        //     },
        //     include:OrderModel
        // })

        //Lazy fetching
        let item = await ItemModel.findOne({
            where:{
                item_id:req.body.item
            }
        })

        console.log(item)

        if (item){
            // @ts-ignore
            console.log(await item.getOrders())
        }

        res.status(200).json(
            new CustomResponse(200,`Get Item`,item)
        )

    }catch (error){
        console.log(error)
        res.status(500).send(
            new CustomResponse(500,`Somthong went worng!!!`)
        )
    }

}