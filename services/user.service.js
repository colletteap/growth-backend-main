export const register = (email, password) => {
    const userExists = user.find((user) => user.username)
    if (userExists) {
        throw new Error ("User already exists");
    } else {
        user.create({ email, password });
    }
};

export const login = (email, password) => {
    const user = user.find((user) => user.email === email);
    if (!user) {
        throw new Error("User not found");
    } else {
        if (user.password === password) {
            return user;
        } else {
            throw new Error("Password is incorrect");
        }
    }
};