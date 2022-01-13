import { createClient } from 'redis';

function getClient() {
    const client = createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: 6379
        }
    });

    client.on('error', (err: any) => console.log('Redis Client Error', err));

    return client;
}

export { getClient };