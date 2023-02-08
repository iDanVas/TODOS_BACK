import { Router } from "express";
import taskModel from "./task.model.mjs";
import raw from "../../middleware/route.async.wrapper.mjs"

// create router object
const router = Router();

// apply middleware to router


// define routing functions

// GET ALL TASKS
router.get("/", raw(async (req, res) => {
    const tasks = await taskModel.find();
    res.status(200).json(tasks);
}));

// GET TASK by ID
router.get("/:id", raw(async (req, res) => {
    const task = await taskModel.find({ _id: req.params.id });
    res.status(200).json(task);
    // res.status(200).send(`GET TASK by ID ${task}`);
}));

// CREATE TASK
router.post("/", raw(async (req, res, next) => {
    const task = await taskModel.create(req.body);
    res.status(200).send(task);
}));

// UPADATE REPLACE TASK by ID
router.put("/:id", raw(async (req, res) => {
    const replacedTask = req.body;
    const task = await taskModel.findOneAndReplace({ _id: req.params.id }, replacedTask);
    // const task = await taskModel.findByIdAndUpdate(req.params.id,req.body,{
    //     new: true, upsert: false
    // })
    res.status(200)
        .send(`UPADATE - REPLACE TASK by ID ${req.params}`);
}));

// UPDATE MERGE TASK by ID
router.patch("/:id", raw(async (req, res) => {
    const replacedTask = req.body;
    const task = await taskModel.findOneAndReplace({ _id: req.params.id }, replacedTask);
    // const task = await taskModel.findByIdAndUpdate(req.params.id,req.body,{
    //     new: true, upsert: false
    // })
    res.status(200).send(`UPDATE - MERGE TASK by ID ${req.params.id}`);
}));

//DELETE TASK by ID
router.delete("/:id", raw(async (req, res) => {
    await taskModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(`Delete TASK by ID ${req.params.id}`);
}));

//DELETE ALL TASKS 
router.delete("/", raw(async (req, res) => {
    await taskModel.deleteMany();
    res.status(200).send(`All Tasks was Deleted`);
}));


export default router;