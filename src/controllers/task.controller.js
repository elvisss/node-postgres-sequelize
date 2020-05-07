import Task from '../models/task';
import Project from '../models/project';

export async function getTasks(req, res) {
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'projectid', 'nombre', 'done'],
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({
            data: tasks
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}

export async function getTasksByProject(req, res) {
    try {
        const { projectId } = req.params;
        const tasks = await Task.findAll({
            where: { projectid: projectId },
            attributes: ['id', 'projectid', 'nombre', 'done']
        });
        res.json({
            tasks
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}

export async function getTaskById(req, res) {
    try {
        const { taskId } = req.params;
        const task = await Task.findOne({
            where: {
                id: taskId
            },
            attributes: ['id', 'projectid', 'nombre', 'done'],
            // include: Project
        });
        
        if (!task) return res.status(404).json('Task not found');

        return res.json({
            data: task
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}

export async function deleteTask(req, res) {
    try {
        const { taskId } = req.params;
        const deleteRowCount = await Task.destroy({
            where: {
                id: taskId
            }
        });
        res.json({
            message: 'Task Deleted succesfully',
            count: deleteRowCount
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}

export async function updateTask(req, res) {
    try {
        const { taskId } = req.params;
        const { projectid, nombre, done } = req.body;
        const task = await Task.findOne({
            attributes: ['id', 'projectid', 'nombre', 'done'],
            where: {
                id: taskId
            }
        });
        if (task) {
            const updatedTask = await task.update({
                projectid,
                nombre,
                done
            });

            return res.json({
                message: 'Task Updated succesfully',
                data: updatedTask
            });
        } else {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}

export async function createTask(req, res) {
    const { nombre, done, projectid } = req.body;

    try {
        let newTask = await Task.create({
            nombre,
            done,
            projectid
        }, {
            fields: ['nombre', 'done', 'projectid']
        });
        if (newTask) {
            return res.json({
                message: "Task created succesfully",
                data: newTask
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}
