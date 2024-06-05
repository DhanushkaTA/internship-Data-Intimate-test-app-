import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import AddressModel from "../models/address.model";
import UserModel from "../models/user.model";


export const saveAddress = async (req:express.Request,res:express.Response) => {


    try{

        let model = await AddressModel.create(req.body);

        console.log('--------------------------------------------------')
        console.log(model)

        if(model){
            res.status(201).json(
                new CustomResponse(201,"Address Saved!!",model.dataValues)
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

export const getAll = async (req:express.Request,res:express.Response) => {

    try{

        let addressList = await UserModel.findAll();

        // console.log(newVar)


        res.status(200).json(
            new CustomResponse(200,`Get All Users`,addressList)
        )

    }catch (error){
        console.log(error)
        res.status(500).send(
            new CustomResponse(500,`Somthong went worng!!!`)
        )
    }

}


export const getAddress = async (req:express.Request,res:express.Response) => {
    try{

        let address = await AddressModel.findOne({
            where:{
                address_id:req.body.address
            },
            include:UserModel
        })

        console.log(address)
        // @ts-ignore
        // console.log(await item.getUser())

        // console.log(newVar)


        res.status(200).json(
            new CustomResponse(200,`Get Users address`,address)
        )

    }catch (error){
        console.log(error)
        res.status(500).send(
            new CustomResponse(500,`Somthong went worng!!!`)
        )
    }
}