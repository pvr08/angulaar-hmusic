// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://vishalgoud2020:VishalKanaka@cluster0.j7jfniz.mongodb.net/Music?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// User model
const User = require('./models/User');

app.use(bodyParser.json());

// Test endpoint to check MongoDB connection and retrieve user data
app.get('/api/test', async (req, res) => {
  try {
      // Check MongoDB connection
      if (mongoose.connection.readyState !== 1) {
          return res.status(500).json({ message: 'MongoDB connection failed' });
      }

      // Retrieve user data (for example, the first user in the database)
      const user = await User.findOne();

      if (!user) {
          return res.status(404).json({ message: 'No user found in the database' });
      }

      // If user data is retrieved successfully, return it
      return res.json({ user });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
  }
});


// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
      // Find user by username
      const user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Check password
      if (password === user.password) {
       
        console.log('Retrieved user:', user);
        //const token = jwt.sign({ userId: user._id }, '123123', { expiresIn: '1h' });
  
        // Return token and user details
        return res.json(user);
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
