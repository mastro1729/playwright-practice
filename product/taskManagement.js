const tasks = require('../data/tasks.json');
const users = require('../data/users.json');

class TaskManagement {
    constructor(tasks = {}, users = {}) {
        this.tasks = tasks;
        this.users = users;
    }

    assignUser(taskId, userId) {
        if (!this.checkTaskId(taskId)) {
            throw new Error("Task does not exist.");
        }

        if (!this.checkUserId(userId)) {
            throw new Error("User does not exist.");
        }

        const task = this.getTask(taskId);

        if (task.assignedUserIds.includes(userId)) {
            throw new Error(`Cannot add user ${userId}. User is already assigned to the task.`);
        }

        task.assignedUserIds.push(userId);
        return this.getTask(taskId).assignedUserIds;
    }

    removeUser(taskId, userId) {
        if (!this.checkTaskId(taskId)) {
            throw new Error("Task does not exist.");
        }

        if (!this.checkUserId(userId)) {
            throw new Error("User does not exist.");
        }

        const task = this.getTask(taskId);

        if (!task.assignedUserIds.includes(userId)) {
            throw new Error(`Cannot remove user ${userId}. User is not assigned to the task.`);
        }

        const index = this.getTask(taskId).assignedUserIds.indexOf(userId);
        task.assignedUserIds.splice(index, 1);

        return task.assignedUserIds;
    }

    checkTaskId(taskId){
        return taskId in this.tasks;
    }

    getTask(taskId){
        return this.tasks[taskId];
    }

    getAllTasks() {
        const allTasks = [];
        for(const taskId in this.tasks){
            const taskDetails = this.getTask(taskId).toString();
            allTasks.push(`${taskId}: {${taskDetails}}`);
        }
        return allTasks;
    }

    checkUserId(userId){
        return userId in this.users;
    }

    getUser(userId){
        return this.users[userId];
    }

    getAllUsers() {
        const allUsers = [];
        for(const userId in this.users){
            const userDetails = this.getUser(userId).toString();
            allUsers.push(`${userId}: {${userDetails}}`);
        }
        return allUsers;
    }
}

module.exports = TaskManagement;