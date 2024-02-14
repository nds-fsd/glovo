// orderController.js
const Order = require('../schema/orderSchema');

// Crear un nuevo pedido
exports.createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice, status } = req.body;
        const newOrder = await Order.create({
            userId,
            items,
            totalPrice,
            status
        });
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: "Error al crear el pedido", error: err.message });
    }
};

// Obtener todos los pedidos
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los pedidos", error: err.message });
    }
};

// Obtener un pedido específico por su ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener el pedido", error: err.message });
    }
};

// Actualizar un pedido
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json({ message: "Pedido actualizado correctamente", updatedOrder });
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el pedido", error: err.message });
    }
};

// Eliminar un pedido
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json({ message: "Pedido eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar el pedido", error: err.message });
    }
};
