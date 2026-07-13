// This database and its credentials are public on purpose — anyone learning
// on SoloDevMeet is meant to use it, no signup required. It runs on a free
// tier with no billing attached and never will, so the worst case if it's
// ever abused is the practice data getting reset, not a bill.
// MONGODB_URI itself still stays out of source control (see .env.example) —
// not because it's secret, but so each learner's local .env is the one
// source of truth instead of everyone editing this file.
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
