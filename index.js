const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

async function performOperations() {
    try {
        await connect;
        console.log('Connected correctly to server');

        // First chain: Save new dish and find all dishes
        let newDish = new Dishes({
            name: 'Uthappizza',
            description: 'test'
        });

        let dish = await newDish.save();
        console.log("Saved new dish:\n", dish);

        let dishes = await Dishes.find({});
        console.log("Found all dishes:\n", dishes);

        // Second chain: Create new dish, update it, add a comment, and save it
        dish = await Dishes.create({
            name: 'Uthappizza',
            description: 'test'
        });
        console.log("Created new dish:\n", dish);

        dish = await Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test' }
        }, { new: true }).exec();
        console.log("Updated dish:\n", dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });
        dish = await dish.save();
        console.log("Added comment to dish:\n", dish);

    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}

performOperations();
