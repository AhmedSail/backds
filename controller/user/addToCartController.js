const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    console.log("Product ID:", productId); // سجل معرف المنتج للتحقق منه
    console.log("User ID:", currentUser); // سجل معرف المستخدم للتحقق منه

    if (!productId || !currentUser) {
      return res.status(400).json({
        message: "Product ID and User ID are required",
        success: false,
        error: true,
      });
    }

    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    console.log("isProductAvailable: ", isProductAvailable);

    if (isProductAvailable) {
      return res.status(400).json({
        message: "Product already exists in cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.status(200).json({
      data: saveProduct,
      message: "Product added to cart successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).json({
      message: err.message || "An error occurred while adding product to cart",
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
