const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const Product = require('./models/Product');
const User = require('./models/User');

// Sample products data
const products = [
  {
    name: "Smartphone X",
    description: "Latest model with amazing camera and battery life",
    price: 699.99
  },
  {
    name: "Laptop Pro",
    description: "Powerful laptop for professionals",
    price: 1299.99
  },
  {
    name: "Wireless Headphones",
    description: "Noise cancelling wireless headphones",
    price: 199.99
  },
  {
    name: "Smart Watch",
    description: "Track your fitness and stay connected",
    price: 249.99
  },
  {
    name: "Tablet Mini",
    description: "Perfect for reading and light work",
    price: 399.99
  }
];

// Sample users data
const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123"
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Hash passwords and insert users
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );
    await User.insertMany(hashedUsers);
    console.log('Users seeded successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 