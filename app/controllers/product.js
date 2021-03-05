const Product = require('../models/product').Product;

const products = {

    // GET get all Products
    getProducts: function(req, res) {
        Product.find({}).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving products."
            });
        })
    },
    // GET Product by id
    getProductsByID: function(req, res) {
        const id = req.params.id;
        Product.findById(id).then(data => {
            if (!data)
                res.status(404).send({
                    message: "Product with id " + id + " is not found."
                });
            else res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while retrieving Product with id " + id
            })
        })
    },
    // POST add new Product
    addProduct: function(req, res) {
        if (!req.body.name) {
            res.status(400).send({
                message: "Product name can not be empty!"
            });
            return;
        }

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })

        product.save().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the Product."
            });
        })
    },
    // PUT update Product by id
    updateProduct: function(req, res) {
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const id = req.params.id;

        Product.findByIdAndUpdate(id, req.body, {
                useFindAndModify: false
            })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Failed to update Product with id=${id}.`
                    });
                } else res.send({
                    message: "Product was updated successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occured while updating Product with id=" + id
                });
            });
    },
    // DELETE delete Product by id
    deleteProduct: function(req, res) {
        const id = req.params.id;

        Product.deleteOne({
                _id: id
            })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Failed to delete Product with id=${id}.`
                    });
                } else res.send({
                    message: "Product was deleted successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occured while deleting Product with id=" + id
                });
            });
    },
    // DELETE remove all Products
    deleteAllProducts: function(req, res) {
        Product.deleteMany({})
            .then(data => {
                res.send({
                    message: "All Products was deleted successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occured while deleting all Products"
                });
            });
    },
}

module.exports = products;