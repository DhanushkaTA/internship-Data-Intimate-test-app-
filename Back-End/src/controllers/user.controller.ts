import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import jwt, {Secret} from "jsonwebtoken";
import * as process from "process";
import UserModel from "../models/user.model";
import AddressModel from "../models/address.model";
import bcrypt from "bcryptjs"
import OrderModel from "../models/order.model";

export const saveUser = async (req:express.Request ,res:any) => {
    try {



        let user = req.body;

        bcrypt.hash(user.password, 8, async (error, hash:string) => {

            user.password=hash;

            let model = await UserModel.create(user);

            if(model){
                model.dataValues.password="";
                res.status(201).json(
                    new CustomResponse(201,"User Saved!!",model.dataValues)
                )
            }
            // console.log(model);
            // console.log(model.dataValues);

        })

        //-----------------------------------------------------
        let newVar = await AddressModel.findAll();

        console.log(newVar)

        //-----------------------------------------------------

    }catch (error){
        res.status(500).json(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const deleteUser = async (req:express.Request, res:any) => {
    try {

        // let query = req.query;
        // let id = query.id;

        await UserModel.destroy({where: {nic: req.query.id}})
            .then((deleteRows :number) => {

                console.log(deleteRows)
                if (deleteRows>0){
                    res.status(200).send(
                        new CustomResponse(200,"User deleted successfully")
                    )
                }else {
                    res.status(500).json(
                        new CustomResponse(500,`Something went wrong.Please check the nic again`)
                    )
                }

            })
            .catch((error) => {
                res.status(500).json(
                    new CustomResponse(500,`Error : ${error}`)
                )
            })

    }catch (error){
        res.status(500).json(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getAll = async (req:express.Request, res:any) => {
    try {

        console.log("awaaaaaaa")

        let userList = await UserModel.findAll();

        // console.log(newVar)

        userList.map(value => {
            value.dataValues.password="";
        })

        res.status(200).json(
            new CustomResponse(200,`Get All Users`,userList)
        )

    }catch (error){
        res.status(500).json(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getUser = async (req:express.Request, res:any) => {
    try {

        let user = await UserModel.findOne({where: {nic: req.params.id}});

        if (user){
            user.dataValues.password="";
            res.status(200).json(
                new CustomResponse(200,`User found successfully`,user)
            )
        }else {
            res.status(404).json(
                new CustomResponse(404,`User not found`)
            )
        }

    }catch (error){
        res.status(500).json(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const updateUser = async (req:express.Request, res:any) => {
    try {

        let rowCounts = await UserModel.update(req.body,{where:{nic: req.body.nic}});


        // console.log(rowCounts)
        if (rowCounts[0]>0){
            res.status(200).send(
                new CustomResponse(200,"User update successfully",)
            )
        }else {
            res.status(500).send(
                new CustomResponse(500,"User not update")
            )
        }

    }catch (error){
        res.status(500).json(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const updatePassword = async (req: express.Request, res:any) => {
    try {

        console.log(res.tokenData.user.nic)

        let user = await UserModel.findOne({where: {nic: res.tokenData.user.nic}});

        if (user){

            let isMache :boolean = await bcrypt.compare(req.body.oldPassword, user.dataValues.password);

            if (isMache){

                bcrypt.hash(req.body.password, 8, async (err, hash :string) =>{

                    if (err){
                        res.status(500).json(
                            new CustomResponse(500,`Something went wrong : ${err}`)
                        )
                    }

                    await UserModel.update({password: hash},{where:{nic: res.tokenData.user.nic}})
                        .then((row) => {
                            if (row[0]>0){
                                res.status(200).send(
                                    new CustomResponse(200,"Password update successfully",)
                                )
                            }
                        })
                        .catch((error) => {
                            res.status(500).json(
                                new CustomResponse(500,`Error : ${error}`)
                            )
                        })

                    // if (row[0]>0){
                    //     res.status(200).send(
                    //         new CustomResponse(200,"Password update successfully",)
                    //     )
                    // }else {
                    //     res.status(500).send(
                    //         new CustomResponse(500,"Password not update")
                    //     )
                    // }

                })

            }else {
                res.status(401).json(
                    new CustomResponse(401,`Invalid Password!!!`)
                )
            }


        }else {
            res.status(404).json(
                new CustomResponse(404,`User not found!!!`)
            )
        }



    }catch (error){
        res.status(500).json(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const authUser = async (req:express.Request, res:any) => {
    try {

        let user= await UserModel.findOne({where: {username: req.body.username}});

        // UserModel.findOne({where: {username: req.body.username}})
        //     .then((success) => {
        //
        //     console.log(success)
        //
        //     })
        //     .catch((error) => {
        //         res.status(500).json(
        //             new CustomResponse(500,`Error : ${error}`)
        //         )
        //     })

        if (user){
            let isMache: boolean = await bcrypt.compare(req.body.password, user.dataValues.password);

            if (isMache){
                await generateToken(user.dataValues, res);
            }else {
                res.status(401).json(
                    new CustomResponse(401,"Wrong Password!!!")
                )
            }

        }else {
            res.status(404).send(
                new CustomResponse(404, "User not found!")
            )
        }

    }catch (error){
        res.status(500).json(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

const generateToken = async (user:any,res:any)=> {
    user.password = "";
    let expiresIn = "1w";

    jwt.sign({user}, process.env.SECRET as Secret,{expiresIn},(error:any, token:any) => {

        if (error){
            res.status(500).send(
                new CustomResponse(500,`Something went wrong : ${error}`)
            )
        } else {

            let res_body={
                user: user,
                accessToken: token
            }

            res.status(200).send(
                new CustomResponse(200,"Access",res_body)
            );

        }
    })
}


export const getUserAddress = async (req:express.Request,res:express.Response)=> {

    try {

        console.log("💥💥💥💥💥")

        //Eager fetching
        // let user_by_nic = await UserModel.findOne({
        //     where: {
        //         nic: req.params.id,
        //     },
        //     include: AddressModel,
        // });

        //Lazy fetching
        const user_by_nic = await UserModel.findOne({
            where: {
                nic: req.params.id,
            },
        });

        console.log(user_by_nic)

        // @ts-ignore
        console.log(await user_by_nic.getAddress())

        if (user_by_nic){
            res.status(200).json(
                new CustomResponse(200,`Get All Users`,user_by_nic)
            )
        }else {
            res.status(404).json(
                new CustomResponse(200,`User na`)
            )
        }

    }catch (error){
        console.log(error)
        res.status(500).send(
            new CustomResponse(500,`Somthong went worng!!!`)
        )
    }

}

export const getUserOrders = async (req:express.Request,res:express.Response)=> {

    try {

        //Eager fetching
        // const userWithOrders = await UserModel.findOne({
        //     where: { nic: req.params.id },
        //     include: OrderModel
        // });
        //
        //
        // console.log(userWithOrders)

        //Lazy fetching
        const user_by_nic = await UserModel.findOne({
            where: {
                nic: req.params.id,
            },
        });

        // @ts-ignore
        let list = await user_by_nic.getOrders();
        console.log(list)

        //to access one data
        console.log("++++++++++++++++++++++++++")
        console.log(list[0].dataValues)

        res.status(200).json(
            new CustomResponse(200,`Get All Users`,user_by_nic)
        )

    }catch (error){
        console.log(error)
        res.status(500).send(
            new CustomResponse(500,`Somthong went worng!!!`)
        )
    }

}