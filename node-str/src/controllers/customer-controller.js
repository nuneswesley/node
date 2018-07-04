'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

exports.post = async (req, res, next) => {
    let validator = new ValidationContract();
    validator.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    validator.isEmail(req.body.email,'E-mail inválido');
    validator.hasMinLen(req.body.password, 6, 'O password deve conter pelo menos 6 caracteres');

    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};