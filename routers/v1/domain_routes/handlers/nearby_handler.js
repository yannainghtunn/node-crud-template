
const validator = require("../../../../helpers/valid_helper");


const nearby_handler = async (req,res,next)=>{
    
    try {
        validator(req)
    
        const json = {
            message: "Successfully Fetched",
            result: "example",
            status: "success"
        }
        res.status(200).json(json);

    } catch (error) {
        next(error);
    }
}
module.exports = nearby_handler;