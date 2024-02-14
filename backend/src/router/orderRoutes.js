const express = require('express');
const orderController = require('../controller/orderController');
const { jwtMiddleware } = require('../security/jwt');

const orderRouter = express.Router();

// Aplica jwtMiddleware a todas las rutas de este router para asegurar que sean privadas
orderRouter.use(jwtMiddleware);


orderRouter.post('/', orderController.createOrder); // Crear un nuevo pedido
orderRouter.get('/', orderController.getAllOrders); // Obtener todos los pedidos
orderRouter.get('/:id', orderController.getOrderById); // Obtener un pedido por su ID
orderRouter.patch('/:id', orderController.updateOrder); // Actualizar un pedido existente
orderRouter.delete('/:id', orderController.deleteOrder); // Eliminar un pedido

module.exports = orderRouter;
