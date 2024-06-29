import { Client } from 'appwrite';
import { Databases } from 'appwrite';
import { Account } from 'appwrite';


const client = new Client();

export const account = new Account(client);

export const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('657c91a311919768bac6') // Your project ID
;
