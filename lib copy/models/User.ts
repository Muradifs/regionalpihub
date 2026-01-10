import mongoose from 'mongoose';

// Ovo je "nacrt" - ovdje definiramo što pamtimo o svakom korisniku
const UserSchema = new mongoose.Schema({
  uid: { 
    type: String, 
    required: true, 
    unique: true // Svaki Pi korisnik ima jedinstven ID
  },
  username: { 
    type: String, 
    required: true 
  },
  roles: { 
    type: [String], 
    default: ['user'] // Po defaultu je običan korisnik
  },
  balance: { 
    type: Number, 
    default: 0 // Početno stanje bodova
  },
  terms_accepted: {
    type: Boolean,
    default: false
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Ovo sprječava grešku kod "hot reloada" u Next.js-u
export default mongoose.models.User || mongoose.model('User', UserSchema);