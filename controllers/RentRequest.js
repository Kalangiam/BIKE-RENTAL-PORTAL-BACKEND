import RRModel from "../models/RentRequestModel.js";
import EmailService from "./EmailService.js";

let create = async (req, res) => {
    try {
        req.body.no = `RR${+new Date()}`
        let data = await RRModel.create(req.body)
        EmailService(data)
        res.status(200).send({
            message: "Bike request Created"
        })

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal server Error"
        })
    }
}

const getByRrNo = async (req, res) => {
    try {
        let data = await RRModel.findOne({no:req.params.no})
        if(data){
            res.status(200).send({
                message:"Data fetched",
                data
            })
        }
        else{
            res.status(400).send({
                message:"Incorrect no"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message || "internal Server Error"
        })
    }

    } 

 
export default {
    create,
    getByRrNo
}