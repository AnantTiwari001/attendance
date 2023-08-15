import { getFirestore } from 'firebase/firestore';
import app from './config';

export default db=  getFirestore(app);