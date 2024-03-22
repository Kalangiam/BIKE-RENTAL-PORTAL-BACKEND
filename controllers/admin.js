import RRModel from "../models/RentRequestModel.js"

const dashboard = async (req, res) => {
    try {
        let data = await RRModel.aggregate([{
            $group: { _id: "$status", count: { $sum: 1 } }
        }])
        let count = {}
        data.forEach((e) => {
            count[e._id] = e.count
        })

        res.status(200).send({
            message: "Data Fetched Successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const list = async (req, res) => {
    try {
        let status = req.params.status
        let data = await RRModel.find({ status: status })
        res.status(200).send({
            message: "Data Fetched",
            data
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const changeStatus = async (req, res) => {
    try {
        let id = req.params.no
        let user = req.headers.user
        let rr = await RRModel.findById(id)
        if (rr) {
            if (rr.status === "Not Booked") {
                rr.status = "Waiting"
                await rr.save()
            }
            else if (rr.status === "Waiting") {
                rr.status = "Booked"
                await rr.save()
    

            }
            res.status(200).send({
                message: "Status Updated Successfully"
            })
        }
        else {
            res.status(400).send({
                message: "Invalid Service Request"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

export default {
    dashboard,
    list,
    changeStatus
}