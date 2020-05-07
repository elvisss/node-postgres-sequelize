import Project from '../models/project';

export async function getProjects(req, res) {
    try {
        const projects = await Project.findAll();
        res.json({
            data: projects
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}

export async function getProjectById(req, res) {
    try {
        const { projectId } = req.params;
        const project = await Project.findOne({
            where: {
                id: projectId
            }
        });
        
        if (!project) return res.status(404).json('Project not found');

        res.json({
            data: project
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}

export async function deleteProject(req, res) {
    try {
        const { projectId } = req.params;
        const deleteRowCount = await Project.destroy({
            where: {
                id: projectId
            }
        });
        res.json({
            message: 'Project Deleted succesfully',
            count: deleteRowCount
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}

export async function updateProject(req, res) {
    try {
        const { projectId } = req.params;
        const { name, priority, description, delivery_date } = req.body;
        const projects = await Project.findAll({
            attributes: ['id', 'name', 'priority', 'description', 'delivery_date'],
            where: {
                id: projectId
            }
        });
        if (projects.length > 0) {
            projects.forEach(async project => {
                await project.update({
                    name,
                    priority,
                    description,
                    delivery_date
                });
            });
        } else {
            res.status(404).json({
                message: 'Not projects found'
            });
        }
        res.json({
            message: 'Project Updated succesfully',
            data: projects
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}

export async function createProject(req, res) {
    const { name, priority, description, delivery_date } = req.body;

    try {
        let newProject = await Project.create({
            name,
            priority,
            description,
            delivery_date
        }, {
            fields: ['name', 'priority', 'description', 'delivery_date']
        });
        if (newProject) {
            return res.json({
                message: "Project created succesfully",
                data: newProject
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Interval Server Error"
        });
    }
}
