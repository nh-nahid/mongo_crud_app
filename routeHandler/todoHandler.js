const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');

const Todo = new mongoose.model("Todo", todoSchema);


// GET ACTIVE TODOS by instance
router.get('/active', async (req, res) => {
    try {
      const todo = new Todo();
      const data = await todo.findActive();

      res.status(200).json({
        data,
      })

    } catch (error) {
       res.status(500).json({
        error: 'There is a server error'
       })
    }
});

// GET ACTIVE TODOS by Static
router.get('/js', async (req, res) => {
    try {
      const data = await Todo.findByJS();
      res.status(200).json({
        data,
      })
    } catch (error) {
       res.status(500).json({
        error: 'There is a server error'
       })
    }
});

// GET ACTIVE TODOS by Query helper
router.get('/language', async (req, res) => {
    try {
      const data = await Todo.find().byLanguage("js");

      res.status(200).json({
        data,
      })
    } catch (error) {
       res.status(500).json({
        error: 'There is a server error'
       })
    }
});

// GET ALL THE TODOS
router.get('/', async (req, res) => {
    try {
       const result = await Todo.find({status: "active"}).select({
        _id: 0,
        __v: 0
       }).limit(2);

       res.status(200).json({
        message: "Data loaded successfully",
        data: result
       })
    } catch (error) {
       res.status(500).json({
        error: 'There is a server error'
       })
    }
});


// GET A TODO by ID
router.get('/:id', async(req, res) => {
    try {
       const result = await Todo.find({_id: req.params.id});

        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            error: 'There is a server side error'
        })
    }
});

// POST TODO
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();

        res.status(200).json({
            message: "Todo was inserted successfully"
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
});

// POST MULTIPLE TODO
router.post('/all', async (req, res) => {
   try {
     const result = await Todo.insertMany(req.body);
    
        res.status(200).json({
        message: "Todos was inserted successfully",
        data: result
     });
   } catch (error) {
        res.status(500).json({
        error: "There was a server side error"
    });
   }
});

// PUT TODO
router.put('/:id', async (req, res) => {
    try {
        await Todo.updateOne({_id: req.params.id}, {
        $set: {
            status: 'active',
         }
        });

        res.status(200).json({
            message: "Todo has been updated"
        })
    } catch (error) {
        res.status(500).json({
            error: "There is a server side error"
        })
    }
});

// DELETE TOD
router.get('/:id', async(req, res) => {
    try {
       const result = await Todo.deleteOne({_id: req.params.id});

        res.status(200).json({
            message: 'Todo was deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            error: 'There is a server side error'
        })
    }
});;


module.exports = router;