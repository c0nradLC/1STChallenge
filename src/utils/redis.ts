import { createClient } from 'redis';

export default function getClient() {
    const client = createClient({
        socket: {
            host: 'redis',
            port: 6379
        }
    });

    client.on('error', (err: any) => console.log('Redis Client Error', err));

    return client;
}