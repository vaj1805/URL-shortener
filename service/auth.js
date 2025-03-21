//making this for session id . after login we want to generate cookie to keep user header data
//so making use of uuid npm package.

const sessionIdToUserMap = new Map();

function setUser(id , user) {
    sessionIdToUserMap.set(id , user);
}

function getUser(id) {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}