import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import jwt, {Secret} from "jsonwebtoken";
import * as process from "process";

export const verifyToken = async (req:express.Request,res:any,next: express.NextFunction) => {

    let authorizationToken  = req.headers.authorization;

    if (!authorizationToken){
        return res.status(404).json(
            new CustomResponse(400,"Invalid Token",null)
        )
    }

    try {

        res.tokenData = jwt.verify(authorizationToken, process.env.SECRET as Secret);
        next();

    }catch (error) {
        return res.status(401).send(
            new CustomResponse(401,"Invalid Token")
        )
    }
}