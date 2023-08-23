const router = require("express").Router();
const Todo = require('../Models/todoModel');
const {v4} = require("uuid");
let todos = [];
const checkAuth = require("../middleware/checkAuth")

router.get("", async(req, res) => {
    const todosList = await Todo.find({})
    return res.json(todosList)
})

router.get("/:id",checkAuth, async(req, res) => {
    const {id} = req.params
    const todo = await Todo.findById(id);
    return res.json(todo);
})

router.put("/:id",checkAuth, async(req,res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        res.status(400);
        throw new Error('Todo not found');
    }
    const status = todo.completed;
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {completed:!status}, {
        new: true,
    });
    return res.status(200).json(updatedTodo)
})

router.delete("/:id",checkAuth, async(req,res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        res.status(400);
        throw new Error('Todo not found');
    }
    await todo.remove();
    return res.json(todos)
})

router.post("",checkAuth, async(req, res) => {
    const {title} = req.body;
     const todo = {
        title,
        completed: false
     }
     try {
        const todoItem = await Todo.create(todo);
        return res.status(200).json({todo: todoItem});
     } catch (error) {
        return res.status(500).json({msg: error.message})
     }
})

module.exports = router