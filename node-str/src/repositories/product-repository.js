'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    return await Product.find({
        active: true
    }, 'title slug price');
}

exports.getBySlug = async (slug) => {
    return await Product.findOne({
        slug: slug,
        active: true
    }, 'title description slug price tags');
}

exports.getById = async (id) => {
    return await Product.findById(id, 'title description slug price tags');
}

exports.getByTag = async (tag) => {
    return await Product.find({
        tags: tag,
        active: true
    }, 'title description slug price tags')
}

exports.create = async (data) => {
    var product = new Product(data);
    return await product.save();
}

exports.update = async (id, body) => {
    return await Product.findByIdAndUpdate(id, {
        $set: {
            title: body.title,
            description: body.description,
            prince: body.prince,
            slug: body.slug,
            tags: body.tags
        }
    })
}

exports.delete = async (id) => {
    return await Product.findByIdAndRemove(id)
}