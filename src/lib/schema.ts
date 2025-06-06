import {pgTable, serial, varchar, timestamp} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    id: serial("id").primaryKey(),
    firstName: varchar("firstName"),
    lastName: varchar("lastName"),
    age: varchar("age"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
