const addToCartModel = require("../../models/cartProduct");

const deleteAllCartProducts = async (req, res) => {
  try {
    const currentUserId = req.userId;
    console.log(`Deleting products for user: ${currentUserId}`); // Debugging line

    const deleteAllProducts = await addToCartModel.deleteMany({
      userId: currentUserId,
    });
    console.log(`Deleted products count: ${deleteAllProducts.deletedCount}`); // Checking the number of deleted documents

    if (deleteAllProducts.deletedCount === 0) {
      return res.json({
        message: "No products found to delete.",
        error: false,
        success: true,
        data: deleteAllProducts,
      });
    }

    res.json({
      message: "All Products Deleted From Cart",
      error: false,
      success: true,
      data: deleteAllProducts,
    });
  } catch (err) {
    console.error(`Error deleting products: ${err}`);
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteAllCartProducts;
