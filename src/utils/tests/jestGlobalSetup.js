module.exports = async() => {
    process.env = { ...process.env };
    process.env.REDIS_HOST = '127.0.0.1';
    process.env.TYPEORM_DATABASE = '1stchallenge_tests';
}