class Task {
    constructor(taskId, title, description, status, assignedUserIds) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.assignedUserIds = assignedUserIds;
    }

    toString() {
        return `title=${this.title}, 
                description=${this.description}, 
                status=${this.status}, 
                assignedUserIds=${this.assignedUserIds}`;
    }
}

module.exports = Task;