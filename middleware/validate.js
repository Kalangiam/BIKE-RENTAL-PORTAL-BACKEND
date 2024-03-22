import UserModel from "../models/UserModel.js";
import Auth from "../common/Auth.js";

let validate = async (req, res, next) => {
    try {
        let token = req?.headers?.authorization?.split(" ")[1]
        if (token) {
            let data = await Auth.decodeToken(token)
            let user = await UserModel.findById(data.id)
            if (user) {
                if (Math.floor(+new Date() / 1000) <= data.exp) {
                    req.headers.user = user
                    next()
                }  
                else {
                    res.status(401).send({
                        message: "Session Expired"
                    })
                }
            }
            else {
                res.status(401).send({
                    message: "UnAuthorized Access"
                })
            }
        }
        else {
            res.status(401).send({
                message: "unauthorized Access"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal server Error"
        })
    }
}

export default validate