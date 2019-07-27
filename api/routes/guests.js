const express = require('express');
const router = express.Router();
const RabbitMQService = require('../utils/rabbitmq-service');

const Guest = require('../models/guests');

router.get('/', (req, res, next) => {
    Guest.find()
        .exec()
        .then(docs => res.status(200).json(docs))
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:guestId', (req, res, next) => {
    const id = req.params.guestId;
    Guest.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    const { firstname, lastname, date, country } = req.body;
    const guest = new Guest({ firstname, lastname, date, country });

    guest
        .save()
        .then(result => {
            if (req.headers['api_key'] != 'guestbook_app') {
                RabbitMQService.send(result);
            }
            res.status(201).json({
                message: 'Handling POST requests to /guests',
                createdObject: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.patch("/:guestId", (req, res, next) => {
    const id = req.params.guestId;
    const updateOps = {};

    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key];
    }

    Guest.update({ _id: id }, { $set: updateOps }, { runValidators: true })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:guestId", (req, res, next) => {
    const id = req.params.productId;
    Guest.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;