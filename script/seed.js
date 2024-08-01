"use strict";

const {
  db,
  models: { User, Order, Product, OrderDetails },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: "Chai Tea",
      description:
        'Chai tea is a delightful and aromatic beverage that blends rich black tea with a symphony of spices and flavors. Originating from India, this traditional drink is known for its warming and invigorating properties. The word "chai" itself means "tea" in Hindi, and it perfectly captures the essence of this beloved drink.',
      imageUrl:
        "https://www.japanesegreenteain.com/cdn/shop/products/JapaneseMatchaGreenTea6.jpg?v=1698692562",
      price: 10,
    }),
    Product.create({
      name: "Green Tea",
      description:
        "Green tea is a refreshing and healthful beverage known for its delicate flavor and numerous health benefits. Made from unoxidized tea leaves, it has a light, grassy taste with subtle floral notes. Rich in antioxidants, green tea promotes heart health, aids in weight management, and boosts metabolism. Enjoyed hot or cold, green tea is a versatile and soothing drink, perfect for any time of day.",
      imageUrl:
        "https://www.japanesegreenteain.com/cdn/shop/products/JapaneseMatchaGreenTea6.jpg?v=1698692562",
      price: 12,
    }),
    Product.create({
      name: "Matcha",
      description:
        "Green tea is a refreshing and healthful beverage known for its delicate flavor and numerous health benefits. Made from unoxidized tea leaves, it has a light, grassy taste with subtle floral notes. Rich in antioxidants, green tea promotes heart health, aids in weight management, and boosts metabolism. Enjoyed hot or cold, green tea is a versatile and soothing drink, perfect for any time of day.",
      imageUrl:
        "https://www.japanesegreenteain.com/cdn/shop/products/JapaneseMatchaGreenTea6.jpg?v=1698692562",
      price: 12,
    }),
    Product.create({
      name: "Jasmine",
      description:
        "Green tea is a refreshing and healthful beverage known for its delicate flavor and numerous health benefits. Made from unoxidized tea leaves, it has a light, grassy taste with subtle floral notes. Rich in antioxidants, green tea promotes heart health, aids in weight management, and boosts metabolism. Enjoyed hot or cold, green tea is a versatile and soothing drink, perfect for any time of day.",
      imageUrl:
        "https://www.japanesegreenteain.com/cdn/shop/products/JapaneseMatchaGreenTea6.jpg?v=1698692562",
      price: 12,
    }),
    Product.create({
      name: "Orange Cinnamon",
      description:
        "Green tea is a refreshing and healthful beverage known for its delicate flavor and numerous health benefits. Made from unoxidized tea leaves, it has a light, grassy taste with subtle floral notes. Rich in antioxidants, green tea promotes heart health, aids in weight management, and boosts metabolism. Enjoyed hot or cold, green tea is a versatile and soothing drink, perfect for any time of day.",
      imageUrl:
        "https://www.japanesegreenteain.com/cdn/shop/products/JapaneseMatchaGreenTea6.jpg?v=1698692562",
      price: 12,
    }),
    Product.create({
      name: "Oolong",
      description:
        "Green tea is a refreshing and healthful beverage known for its delicate flavor and numerous health benefits. Made from unoxidized tea leaves, it has a light, grassy taste with subtle floral notes. Rich in antioxidants, green tea promotes heart health, aids in weight management, and boosts metabolism. Enjoyed hot or cold, green tea is a versatile and soothing drink, perfect for any time of day.",
      imageUrl:
        "https://www.japanesegreenteain.com/cdn/shop/products/JapaneseMatchaGreenTea6.jpg?v=1698692562",
      price: 12,
    }),
    Product.create({
      name: "Black",
      description:
        "Green tea is a refreshing and healthful beverage known for its delicate flavor and numerous health benefits. Made from unoxidized tea leaves, it has a light, grassy taste with subtle floral notes. Rich in antioxidants, green tea promotes heart health, aids in weight management, and boosts metabolism. Enjoyed hot or cold, green tea is a versatile and soothing drink, perfect for any time of day.",
      imageUrl:
        "https://www.japanesegreenteain.com/cdn/shop/products/JapaneseMatchaGreenTea6.jpg?v=1698692562",
      price: 12,
    }),
    Product.create({
      name: "Ginger",
      description:
        "Green tea is a refreshing and healthful beverage known for its delicate flavor and numerous health benefits. Made from unoxidized tea leaves, it has a light, grassy taste with subtle floral notes. Rich in antioxidants, green tea promotes heart health, aids in weight management, and boosts metabolism. Enjoyed hot or cold, green tea is a versatile and soothing drink, perfect for any time of day.",
      imageUrl:
        "https://www.japanesegreenteain.com/cdn/shop/products/JapaneseMatchaGreenTea6.jpg?v=1698692562",
      price: 12,
    }),
    Product.create({
      name: "Chamomile",
      description:
        "Green tea is a refreshing and healthful beverage known for its delicate flavor and numerous health benefits. Made from unoxidized tea leaves, it has a light, grassy taste with subtle floral notes. Rich in antioxidants, green tea promotes heart health, aids in weight management, and boosts metabolism. Enjoyed hot or cold, green tea is a versatile and soothing drink, perfect for any time of day.",
      imageUrl:
        "https://www.japanesegreenteain.com/cdn/shop/products/JapaneseMatchaGreenTea6.jpg?v=1698692562",
      price: 12,
    }),
  ]);

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "theo",
      password: "123",
      firstName: "Theo",
      lastName: "Monzon",
      isAdmin: false,
      email: "theo@gmail.com",
    }),
    User.create({
      username: "nathan",
      password: "123",
      firstName: "Nathan",
      lastName: "Truong",
      isAdmin: true,
      email: "nathan@gmail.com",
    }),
  ]);

  // Creating Orders

  const order = await Order.create({ isCompleted: false, userId: 1 });

  // Creating OrderDetails
  const orderDetails = await OrderDetails.create({
    id: 1,
    quantity: 1,
    productId: 1,
    orderId: 1,
  });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      theo: users[0],
      nathan: users[1],
    },
    products: {
      chaiTea: products[0],
      greenTea: products[1],
    },
    order,
    orderDetails,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
