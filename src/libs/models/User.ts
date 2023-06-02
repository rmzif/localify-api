import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  // userName: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  userName: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

const User = model('User', userSchema);

export default User;


// voornaam, achternaam, date of birth, adres?, username, wachtwoord, naam winkel

