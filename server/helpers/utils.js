const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const generateOTP = () => {
    return crypto.randomInt(1000, 10000).toString();
}

const generateAccessToken = (user) => {
    const token = jwt.sign(user, process.env.JWT_SEC);
    return token
}


function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') 
        .replace(/[\s_-]+/g, '-') 
        .replace(/^-+|-+$/g, ''); 
}
module.exports = { isValidEmail, generateOTP, generateAccessToken, generateSlug }
