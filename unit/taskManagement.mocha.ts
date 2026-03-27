const { expect } = require('chai');
const TaskManagement = require('../product/taskManagement.js');
const tasks = require('../data/tasks.json');
const users = require('../data/users.json');

let taskManager: any = null;

describe("Task Mcanagement Unit Tests", () => {

    beforeEach(() => {
        const freahTasks = JSON.parse(JSON.stringify(tasks));
        const freahUsers = JSON.parse(JSON.stringify(users));
        taskManager = new TaskManagement(freahTasks, freahUsers);
    });

    it("count tasks", function () {
        const actual = taskManager.getAllTasks().length;
        const expected = 1;
        expect(actual).to.equal(expected);
    });

    it("assign user", function () {
        const actual = taskManager.assignUser("a2fa4580", "a5caa712");
        const expected = ["a9f39c40", "a5caa712"];
        expect(actual).to.deep.equal(expected);
    });

    it("assign existing user", function () {
        expect(() => {
            taskManager.assignUser("a2fa4580", "a9f39c40");
        }).to.throw("Cannot add user a9f39c40. User is already assigned to the task.");
    });

    it("remove user", function () {
        const actual = taskManager.removeUser("a2fa4580", "a9f39c40");
        expect(actual).to.deep.equal([]);
    });

    it("remove user nonexisting", function () {
        expect(() => {
            taskManager.removeUser("a2fa4580", "a5caa712");
        }).to.throw("Cannot remove user a5caa712. User is not assigned to the task.");
    });

    it("nonexistent user", function () {
        expect(() => {
            taskManager.assignUser("a2fa4580", "invalidUser");
        }).to.throw("User does not exist.");
    });
});