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
      imageUrl: "https://i.imgur.com/Regub32.png",
      price: 12,
    }),
    Product.create({
      name: "Green Tea",
      description:
        "Green tea is a refreshing and healthful beverage known for its delicate flavor and numerous health benefits. Made from unoxidized tea leaves, it has a light, grassy taste with subtle floral notes. Rich in antioxidants, green tea promotes heart health, aids in weight management, and boosts metabolism. Enjoyed hot or cold, green tea is a versatile and soothing drink, perfect for any time of day.",
      imageUrl: "https://i.imgur.com/oNqKokz.png",
      price: 12,
    }),
    Product.create({
      name: "Matcha",
      description:
        "Matcha is a finely ground green tea powder known for its vibrant green color and rich, umami flavor. This traditional Japanese tea is celebrated for its high antioxidant content and its ability to provide a calm, focused energy. Enjoy it whisked into hot water or blended into your favorite smoothies and lattes for a refreshing boost.",
      imageUrl: "https://i.imgur.com/pk8ZkwQ.png",
      price: 15,
    }),
    Product.create({
      name: "Jasmine",
      description:
        "Jasmine tea is a fragrant and delicate tea infused with the sweet aroma of jasmine blossoms. Typically made from green tea leaves, it offers a soothing, floral flavor that calms the senses. This enchanting tea is perfect for moments of relaxation and tranquility, providing a sensory experience that delights both the palate and the spirit.",
      imageUrl: "https://i.imgur.com/BBGszBe.png",
      price: 12,
    }),
    Product.create({
      name: "Orange Cinnamon",
      description:
        "Orange Cinnamon tea is a warm and inviting blend that combines the zesty brightness of oranges with the comforting spice of cinnamon. This aromatic tea offers a perfect balance of sweet and spicy notes, making it a delightful choice for cozy afternoons and festive occasions. Sip and savor the harmonious flavors that bring warmth and cheer to your cup.",
      imageUrl: "https://i.imgur.com/exaZ5iu.png",
      price: 12,
      isDecaf: true,
    }),
    Product.create({
      name: "Oolong",
      description:
        "Oolong tea is a partially fermented tea that strikes a perfect balance between green and black teas. Known for its complex flavor profile, oolong offers a smooth, floral taste with hints of fruit and honey. This versatile tea can be enjoyed throughout the day, providing a refreshing, aromatic experience that both energizes and relaxes.",
      imageUrl: "https://i.imgur.com/XewJbvb.png",
      price: 15,
    }),
    Product.create({
      name: "Black",
      description:
        "Black tea is a robust and full-bodied tea known for its deep, rich flavor and invigorating qualities. Often enjoyed with a splash of milk and a touch of sugar, it provides a perfect pick-me-up any time of the day. Its high caffeine content and complex taste make it a versatile and beloved choice among tea enthusiasts worldwide.",
      imageUrl: "https://i.imgur.com/okJO1tC.png",
      price: 12,
    }),
    Product.create({
      name: "Ginger",
      description:
        "Ginger tea is a bold and invigorating infusion made from fresh ginger root. Renowned for its warming properties and spicy kick, this tea is perfect for soothing the stomach and boosting immunity. Enjoy it hot to warm up on a chilly day or iced for a refreshing, zesty treat.",
      imageUrl: "https://i.imgur.com/QbT6p5M.png",
      price: 12,
      isDecaf: true,
    }),
    Product.create({
      name: "Chamomile",
      description:
        "Chamomile tea is a gentle and calming herbal infusion made from the delicate flowers of the chamomile plant. Known for its soothing properties, it offers a mild, floral flavor with hints of apple. Perfect for unwinding after a long day, chamomile tea promotes relaxation and restful sleep, making it a beloved choice for those seeking tranquility and peace in a cup.",
      imageUrl: "https://i.imgur.com/AYqHCrm.png",
      price: 12,
      isDecaf: true,
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
  const orderDetails = await Promise.all([
    OrderDetails.create({
      id: 1,
      quantity: 2,
      productId: 1,
      orderId: 1,
    }),
    OrderDetails.create({
      id: 2,
      quantity: 1,
      productId: 2,
      orderId: 1,
    }),
  ]);

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
