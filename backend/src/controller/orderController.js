const Order = require("../schema/OrderSchema");

// Get all products from MongoD B

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error 💩" });
  }
};

// Get a specific product by ID from MongoDB

exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new product and save it to MongoDB

exports.createOrder = async (req, res) => {
  const data = req.body;
  console.log(req.body);
  // * Make sure request has the email
  if (!data) {
    return res.status(400).json({ error: { register: "Email not recieved" } });
  }
  console.log(data);
  const newOrder = new Order({
    productList: data.productList,
    user: data.user_id,
    restaurante: data.restaurante_id,
  });

  newOrder
    .save()
    .then((createdOrder) => {
      console.log("exito");
      return res.status(201).json({
        order: {
          _id: createdOrder._id,
          productList: createdOrder.productList,
          user: createdOrder.user_id,
          restaurante: createdOrder.restaurante_id,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: {
          message: "Error creating new User :(",
          details: err.message,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};

// Update product and save it to MongoDB

exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const update = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, update, {
      new: true,
    });
    if (updatedOrder) {
      res.json({ message: "Order Updated Succsessfully", updatedOrder });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete order and save it to MongoDB

exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (deletedOrder) {
      res.json({ message: "order deleted successfully", deletedOrder });
    } else {
      res.status(500).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrdersByRestaurantId = async (req, res) => {
  const restauranteId = req.params.restauranteId;
  try {
    const orders = await Order.find({ restaurante: restauranteId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
