'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repositoryProduct = require('../repositories/product-repository');

exports.get = (req, res, next) => {
    repositoryProduct
        .get()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e)
        });
};

exports.getBySlug = (req, res, next) => {
    repositoryProduct
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e)
        });
};

exports.getById = (req, res, next) => {
    repositoryProduct
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e)
        });
};

exports.getByTag = (req, res, next) => {
    repositoryProduct
        .getByTag(req.params.tag)
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

    repositoryProduct
        .create(req.body)
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
    repositoryProduct
        .update(req.params.id, req.body)
        .then(x => {
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
    repositoryProduct
        .delete(req.body.id)
        .then(x => {
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