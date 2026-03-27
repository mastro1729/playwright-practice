class User {
    constructor(userId, firstName, lastName) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    toString() {
        return `firstName=${this.firstName}, 
                lastName=${this.lastName}`;
    }
}

module.exports = User;