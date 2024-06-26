import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

client.connect();

client.on('connect', () => console.log('Redis is Connected!'));

export default client;
