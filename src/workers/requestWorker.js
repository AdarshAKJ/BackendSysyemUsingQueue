const redis = require('redis');
const { redisHost, redisPort } = require('../config/config');
const client = redis.createClient(redisPort, redisHost);
const mongoose = require('mongoose');
const { mongoURI } = require('../config/config');
const User = require('../models/userModel');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const processQueue = () => {
    client.keys('queue:*', (err, keys) => {
        if (err) return console.error('Error fetching keys:', err);

        keys.forEach((key) => {
            client.lpop(key, (err, request) => {
                if (err) return console.error('Error popping request:', err);

                if (request) {
                    const parsedRequest = JSON.parse(request);
                    console.log('Processing request:', parsedRequest);
                    // Implement request processing logic here
                }
            });
        });
    });
};

setInterval(processQueue, 1000); // Process requests every second
