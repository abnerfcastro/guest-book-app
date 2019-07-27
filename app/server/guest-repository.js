
const RedisClient = require('./redis-client');
const axios = require('axios');

const guestbookApiDomain = process.env.GUESTBOOK_API || 'http://localhost:3000';

module.exports = new class GuestRepository {
    async getAll(refreshCash = false) {
        let guests = await RedisClient.getAsync(RedisClient.ALL_GUESTS_KEY);

        if (guests == null || refreshCash) {
            const result = await axios.get(`${guestbookApiDomain}/guests`);
            guests = result.data;
            await RedisClient.setAsync(RedisClient.ALL_GUESTS_KEY, guests);
        } else {
            console.log('GET /api/ Using Redis cache');
        }

        return guests;
    }

    async create(guest) {
        const result = await axios.post(`${guestbookApiDomain}/guests`, guest);

        if (result.data && result.data.createdObject) {
            let guests = await RedisClient.getAsync(RedisClient.ALL_GUESTS_KEY);
            if (guests == null) return;

            console.log('POST /api/ Updating Redis cache');
            guests = [...guests, result.data.createdObject];
            await RedisClient.setAsync(RedisClient.ALL_GUESTS_KEY, guests);
        }
    }

    async getById(id) {
        let guest = await RedisClient.getAsync(id);

        if (guest == null) {
            const result = await axios.get(`${guestbookApiDomain}/guests/${id}`);
            guest = result.data;
            await RedisClient.setAsync(id, guest, 60);
        } else {
            console.log(`GET /api/${id} Using Redis cache`);
        }

        return guest;
    }
}