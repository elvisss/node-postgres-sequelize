import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Task from './task';

const Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT
    },
    priority: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.TEXT
    },
    delivery_date: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Project.hasMany(Task, { foreignKey: 'projectid', sourceKey: 'id' });
Task.belongsTo(Project, { foreignKey: 'projectid', sourceKey: 'id' });

export default Project;
