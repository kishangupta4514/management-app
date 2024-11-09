import bcrypt from "bcrypt"
const saltRounds = 10; // You can adjust the cost factor
const plainPassword = 'Aditya';

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Hashed password:', hash);
    // Store the hash in your database
  }
});
