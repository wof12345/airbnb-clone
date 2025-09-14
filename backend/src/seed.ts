import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Service, { IService } from "../src/models/service";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

const randomChoice = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomSubset = <T>(arr: T[], maxCount: number): T[] => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.ceil(Math.random() * maxCount));
};

const service_types = [
  "Photography",
  "Chefs",
  "Prepared meals",
  "Massage",
  "Training",
  "Make-up Hair",
  "Spa treatments",
  "Catering",
  "Nails",
];

const seed = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}`);
    console.log("✅ Connected to MongoDB");

    await Service.deleteMany({});
    console.log("🧹 Cleared old services");

    const services: Partial<IService>[] = [];

    // --- 30 Experiences ---
    for (let i = 0; i < 30; i++) {
      services.push({
        title: faker.company.catchPhrase(),
        sub_title: faker.lorem.sentence(),
        price: faker.number.int({ min: 50, max: 500 }),
        minimum_price: faker.number.int({ min: 20, max: 50 }),
        type: "experience",
        email: faker.internet.email(),
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        reviews: faker.number.int({ min: 0, max: 2000 }),
        start_date: faker.date.soon({ days: 30 }),
        end_date: faker.date.soon({ days: 60 }),
        coordinates: [
          { lat: faker.location.latitude(), lng: faker.location.longitude() },
        ],
        country: faker.location.country(),
        city: faker.location.city(),
        language: randomChoice(["en", "bn"]),
        tag: randomChoice(["Popular", "Original"]),
        service_type: randomSubset(service_types, 3),
        guests: [
          {
            name: "Adults",
            amount: faker.number.int({ min: 1, max: 5 }),
            type: "adults",
          },
          {
            name: "Infants",
            amount: faker.number.int({ min: 0, max: 5 }),
            type: "infants",
          },
          {
            name: "Children",
            amount: faker.number.int({ min: 0, max: 3 }),
            type: "children",
          },
        ],
      });
    }

    // --- 30 Homes ---
    for (let i = 0; i < 30; i++) {
      services.push({
        title: faker.company.catchPhrase(),
        sub_title: faker.lorem.sentence(),
        price: faker.number.int({ min: 50, max: 500 }),
        minimum_price: faker.number.int({ min: 20, max: 50 }),
        type: "home",
        email: faker.internet.email(),
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        reviews: faker.number.int({ min: 0, max: 2000 }),
        start_date: faker.date.soon({ days: 30 }),
        end_date: faker.date.soon({ days: 60 }),
        coordinates: [
          { lat: faker.location.latitude(), lng: faker.location.longitude() },
        ],
        country: faker.location.country(),
        city: faker.location.city(),
        language: randomChoice(["en", "bn"]),
        tag: faker.helpers.maybe(() => "Guest Favourite", { probability: 0.5 }),
        service_type: randomSubset(service_types, 3),
        guests: [
          {
            name: "Adults",
            amount: faker.number.int({ min: 1, max: 5 }),
            type: "adults",
          },
          {
            name: "Infants",
            amount: faker.number.int({ min: 0, max: 5 }),
            type: "infants",
          },
          {
            name: "Pets",
            amount: faker.number.int({ min: 0, max: 5 }),
            type: "pets",
          },
          {
            name: "Children",
            amount: faker.number.int({ min: 0, max: 3 }),
            type: "children",
          },
        ],
      });
    }

    // --- 30 Services ---
    for (let i = 0; i < 30; i++) {
      services.push({
        title: faker.company.catchPhrase(),
        sub_title: faker.lorem.sentence(),
        price: faker.number.int({ min: 50, max: 500 }),
        minimum_price: faker.number.int({ min: 20, max: 50 }),
        type: "service",
        email: faker.internet.email(),
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        reviews: faker.number.int({ min: 0, max: 2000 }),
        start_date: faker.date.soon({ days: 30 }),
        end_date: faker.date.soon({ days: 60 }),
        coordinates: [
          { lat: faker.location.latitude(), lng: faker.location.longitude() },
        ],
        country: faker.location.country(),
        city: faker.location.city(),
        language: randomChoice(["en", "bn"]),
        tag: faker.helpers.maybe(() => "Popular", { probability: 0.2 }), // no tag restrictions for plain "service"
        service_type: randomSubset(service_types, 3),
        guests: [
          {
            name: "Adults",
            amount: faker.number.int({ min: 1, max: 5 }),
            type: "adults",
          },
        ],
      });
    }

    const data = await Service.insertMany(services);

    console.log(MONGO_URI);
    console.log("✅ Inserted 90 services (30 of each type)");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  }
};

seed();
