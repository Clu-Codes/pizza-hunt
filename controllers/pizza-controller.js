const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .then(dbPizzaData => {
                // if no pizza found, send 404
                if (!dbPizzaData) {
                    return res.status(404).json({ message: 'No pizza found with this id!' });
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // destructured 'body' from the req to grab only the data we're wanting, which in this case is the body.
    createPizza({ body }, res) {
        // In mongoDB, methods for adding data are .insertOne(), .insertMany() but Mongoose uses create() which will handle either of the aforementioned methods.
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        // Mongoose is finding the document, updating it, then returning the updated document. Without '{ new: true }', the original version of the document would be returned. There are also Mongoose and MongoDB methods '.updateOne()' and '.updateMany()' that will update without returning the documents.
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    return res.status(404).json({ message: 'No pizza with that id exists!' })
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    return res.status(404).json({ message: 'No pizza with that id exists!' })
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;