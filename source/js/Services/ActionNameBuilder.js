function builder(prefix, name) {
    const action = `[${prefix}] ${name}`;

    return action.replace(/ /g, '_').toUpperCase();
};

export default builder;