import { getAuth } from 'firebase/auth';
import app from './config';

// initializing firebase authentication

const auth= getAuth(app);

export default auth;