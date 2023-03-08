const redis = require('redis');
const redisClient = redis.createClient({
  socket: {
    // host: 'docker.for.mac.localhost',
    host: 'localhost',
    port: 6379,
  }
}
);
redisClient.on('error', (err) => {
  console.log('Redis connection error: ' + err);
});
redisClient.connect();

module.exports = redisClient;