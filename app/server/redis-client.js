
const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient(process.env.REDIS_URL);

const get  = promisify(client.get).bind(client);
const set  = promisify(client.set).bind(client);
const keys = promisify(client.keys).bind(client);

module.exports = new class RedisClient {
    // Keys
    ALL_GUESTS_KEY = 'allguests'

    async getAsync(key) {
        let data = await get(key);
        return data != null ? JSON.parse(data) : null;
    }

    async setAsync(key, data, expire) {
        const dataString = JSON.stringify(data);
        if (expire) {
            await set(key, dataString, 'EX', expire);
        } else {
            await set(key, dataString);
        }
    }
}