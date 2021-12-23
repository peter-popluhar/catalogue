import { ObjectId } from "mongodb";
import { connectToDatabase } from "./utils/mongodb";
require("dotenv").config();

const { MONGO_DB_COLLECTION } = process.env;

export const resolvers = {
  Query: {
    items: async () => {
      let items;

      try {
        const { db } = await connectToDatabase();
        items = await db
          .collection(MONGO_DB_COLLECTION)
          .find({})
          .sort({ _id: -1 })
          .toArray();
      } catch (e) {
        console.log(e);
      }
      return JSON.parse(JSON.stringify(items));
    },
  },

  Mutation: {
    createItem: async (
      _,
      {
        enName,
        enLabelContent,
        enCategories,
        enDescription,
        enPrice,
        swName,
        swLabelContent,
        swCategories,
        swDescription,
        swPrice,
      }
    ) => {
      const item = {
        enName,
        enLabelContent,
        enCategories,
        enDescription,
        enPrice,
        swName,
        swLabelContent,
        swCategories,
        swDescription,
        swPrice,
      };

      try {
        const { db } = await connectToDatabase();
        const collection = await db.collection(MONGO_DB_COLLECTION);
        await collection.insertOne(item);
      } catch (e) {
        console.log(e);
      }
      return item;
    },

    deleteItem: async (_, { id }) => {
      try {
        const objectId = await ObjectId(id);
        const { db } = await connectToDatabase();
        const collection = await db.collection(MONGO_DB_COLLECTION);
        await collection.deleteOne({ _id: objectId });
      } catch (e) {
        console.log(e);
      }
      return { id };
    },

    updateItem: async (
      _,
      {
        id,
        enName,
        enLabelContent,
        enCategories,
        enDescription,
        enPrice,
        swName,
        swLabelContent,
        swCategories,
        swDescription,
        swPrice,
      }
    ) => {
      const item = {
        enName,
        enLabelContent,
        enCategories,
        enDescription,
        enPrice,
        swName,
        swLabelContent,
        swCategories,
        swDescription,
        swPrice,
      };
      try {
        const objectId = await ObjectId(id);
        const { db } = await connectToDatabase();
        const collection = await db.collection(MONGO_DB_COLLECTION);
        await collection.replaceOne({ _id: objectId }, item);
      } catch (e) {
        console.log(e);
      }
      return item;
    },
  },
};