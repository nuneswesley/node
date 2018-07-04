'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product
        .find({
            active: true
        }, 'title slug price');
}

exports.getBySlug = (slug) => {
    return Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description slug price tags');
}

exports.getById = (id) => {
    return Product
        .findById(id, 'title description slug price tags')
}

exports.getByTag = (tag) => {
    return Product
        .find({
            tags: tag,
            active: true
        }, 'title description slug price tags')
}

exports.create = (data) => {
    var product = new Product(data);
    return product.save();
}

exports.update = (id, body) => {
    return Product
        .findByIdAndUpdate(id, {
            $set: {
                title: body.title,
                description: body.description,
                prince: body.prince,
                slug: body.slug,
                tags: body.tags
            }
        })
}

exports.delete = (id) =>{
    return Product.findByIdAndRemove(id)
}