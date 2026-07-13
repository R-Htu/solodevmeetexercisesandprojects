// Example router showing the two patterns used throughout the SoloDevMeet
// backend checklists: a MongoDB route and a Firestore route. Copy this
// pattern into a new file for whichever exercise you're working on, and
// rename the route path/fields to match that step.
//
// This collection/path is SHARED by everyone using this starter kit, so
// always tag your documents with an "owner" value (your name, or any string
// that's unlikely to collide) and filter by it when reading — otherwise
// you'll see other learners' test data mixed in with yours.
import { Router } from 'express';
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { getPracticeCollection } from '../config/mongodb.js';
import { db as firestoreDb } from '../config/firebase.js';

const router = Router();

// POST /api/practice/mongo  { owner, text }
router.post('/mongo', async (req, res) => {
  const { owner, text } = req.body;
  if (!owner || !text) return res.status(400).json({ error: 'owner and text are required' });

  const practise = await getPracticeCollection();
  const doc = { kind: 'example', owner, text, createdAt: Date.now() };
  const result = await practise.insertOne(doc);
  res.status(201).json({ id: result.insertedId, ...doc });
});

// GET /api/practice/mongo?owner=yourName
router.get('/mongo', async (req, res) => {
  const { owner } = req.query;
  if (!owner) return res.status(400).json({ error: 'owner query param is required' });

  const practise = await getPracticeCollection();
  const docs = await practise
    .find({ kind: 'example', owner })
    .sort({ createdAt: -1 })
    .limit(20)
    .toArray();
  res.json({ docs });
});

// POST /api/practice/firestore  { owner, text }
router.post('/firestore', async (req, res) => {
  const { owner, text } = req.body;
  if (!owner || !text) return res.status(400).json({ error: 'owner and text are required' });

  const doc = { owner, text, createdAt: Date.now() };
  const ref = await addDoc(collection(firestoreDb, 'practice', 'example', 'entries'), doc);
  res.status(201).json({ id: ref.id, ...doc });
});

// GET /api/practice/firestore?owner=yourName
router.get('/firestore', async (req, res) => {
  const { owner } = req.query;
  if (!owner) return res.status(400).json({ error: 'owner query param is required' });

  const entriesRef = collection(firestoreDb, 'practice', 'example', 'entries');
  const snap = await getDocs(query(entriesRef, where('owner', '==', owner), orderBy('createdAt', 'desc'), limit(20)));
  res.json({ docs: snap.docs.map((d) => ({ id: d.id, ...d.data() })) });
});

export default router;
