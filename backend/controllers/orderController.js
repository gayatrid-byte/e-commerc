const Order = require('../models/Order');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, customerEmail, customerPhone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const order = new Order({
      items,
      totalAmount,
      shippingAddress,
      customerEmail,
      customerPhone,
      status: 'confirmed',
      paymentStatus: 'completed'
    });

    await order.save();
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get orders by email
exports.getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ customerEmail: email }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Simulate payment and create order
exports.checkoutCart = async (req, res) => {
  try {
    const { items, totalAmount, email, phone, address, city, state, zip } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Simulate payment processing
    const order = new Order({
      items,
      totalAmount,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: {
        street: address,
        city,
        state,
        postalCode: zip,
        country: 'USA'
      },
      status: 'confirmed',
      paymentStatus: 'completed',
      notes: 'Order placed and payment processed'
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Payment successful! Order has been created.',
      orderId: order.orderId,
      data: order
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
