const redis = require('redis');
const { redisHost, redisPort } = require('../config/config');
const client = redis.createClient(redisPort, redisHost);

module.exports.enqueueRequest = (req, res) => {
    const { userId } = req;
    const { request } = req.body;

    client.rpush(`queue:${userId}`, JSON.stringify(request), (err) => {
        if (err) return res.status(500).json({ message: 'Failed to enqueue request' });
        res.status(200).json({ message: 'Request enqueued successfully' });
    });
};
