'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

exports.get = (req, res, next) => {
    Product
        .find({
            active: true
        }, 'title slug price')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e)
        });
};

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
            slug: req.params.slug,
            active: true
        }, 'title description slug price tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e)
        });
};

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id, 'title description slug price tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e)
        });
};

exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        }, 'title description slug price tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e)
        });
};

exports.post = (req, res, next) => {
    let validator = new ValidationContract();
    validator.hasMinLen(req.body.title, 3, 'O Título deve conter pelo menos 3 caracteres');
    validator.hasMinLen(req.body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres');
    validator.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    }

    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({
                message: 'Produtos cadastrado com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar produto',
                data: e
            })
        });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                prince: req.body.prince,
                slug: req.body.slug,
                tags: req.body.tags
            }
        }).then(x => {
            res.status(200).send({
                message: 'Produto atualizar sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: e
            })
        });
};

exports.delete = (req, res, next) => {
    Product
        .findByIdAndRemove(req.body.id).then(x => {
            res.status(200).send({
                message: 'Produto removido sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover produto',
                data: e
            })
        });
};