import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/index';

// Function to create a user
export const createUser = async (req: Request, res: Response) => {
  try {
    // Extract user details from the request body
    const { userName, firstName, lastName, email, password, dateOfBirth, gender } = req.body;
    
    // Check if any required field is missing
    if (!userName || !firstName || !lastName || !email || !password || !dateOfBirth || !gender ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the username or email already exists
    const existingUser = await User.findOne().or([{ userName }, { email }]);
    if (existingUser) {
      const field = existingUser.userName === userName ? 'Username' : 'Email';
      return res.status(400).json({ message: `${field} already exists` });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      userName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!);

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// function that logsin the user
// dit moeten we veranderen naar email, niet naar username
export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

      // Fetch additional user data from MongoDB
      const userData = await User.findById(user._id);

      return res.json({ message: 'Logged in successfully', token, userData }); // Include the token and userData in the response
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
