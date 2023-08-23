const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        title: {
            type:String,
            required:[true, "Todo Tile is required"]
        },
        completed: {
            type:Boolean,
            default:false
        },
    },
    {timestamps:true}
);

const Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo;