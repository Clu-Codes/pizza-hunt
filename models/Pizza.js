const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    }, 
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [] //Can also specify 'Array' in place of the brackets
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;