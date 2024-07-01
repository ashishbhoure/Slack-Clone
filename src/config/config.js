import { Client } from "appwrite";
import { Databases } from "appwrite";
import { Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("6682767f003bc68679cc"); // Your project ID

export const account = new Account(client);

export const databases = new Databases(client);

// async function getDocuments() {
//   try {
//     const response = await databases.listDocuments(
//       "668276c2000035250fe7", // Database ID
//       "668276d1002224544881" // Collection ID
//     );
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Call the function to fetch documents
// getDocuments();

// client
//   .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
//   .setProject("6682767f003bc68679cc"); // Your project ID
