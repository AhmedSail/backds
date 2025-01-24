const productModel = require("../../models/productModel")

const getProductDetails = async(req,res)=>{
    try{
        console.log("getProductDetails222222222222222222222222");
        
        const { productId } = req.body

        const product = await productModel.findById(productId)

        res.json({
            data : product,
            message : "Ok",
            success : true,
            error : false
        })

        
    }catch(err){
        res.json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }
}

module.exports = getProductDetails