import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import mongoose from "npm:mongoose@7.6.3";
import { typeDefs } from "./gql/schema.ts";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { Person } from "./resolvers/Persons.ts";
import { Pet } from "./resolvers/Pet.ts";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();
const MONGO_URL = env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error("Please provide a MongoDB connection string");
}

// Connect to MongoDB
await mongoose.connect(MONGO_URL);

console.info("🚀 Connected to MongoDB");

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Person,
        Pet
    },
});

const { url } = await startStandaloneServer(server);
console.info(`🚀 Server ready at ${url}`);    