// MONGODB_URI is a real credential (unlike the Firebase config above) — it
// must stay out of source control. Set it in your local .env file, which
// .gitignore already excludes from git.
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let clientPromise;

export function getMongoClient() {
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env and fill it in.');
  }
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

export async function getPracticeCollection() {
  const client = await getMongoClient();
  // Everything lives in the shared "solodevmeetexandproj" database, inside
  // one "practise" collection — use a "kind" field per document to separate
  // your exercises from everyone else's (see routes/example.js).
  return client.db('solodevmeetexandproj').collection('practise');
}
