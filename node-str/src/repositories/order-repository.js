'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
    return await Order
    .find({},'customer number status items')
    .populate('customer', 'name email')
    .populate('items.product', 'title description');
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
}