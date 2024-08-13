"use server";

import { CheckUserExistsParams, CreateUserParams } from "@/types";
import { connectToDatabase } from "../databases";
import User from "../databases/models/user.model";
import { handleError } from "../utils";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    // check if the user already exists
    const alreadyExists = await User.findOne({ email: user.email });
    if (alreadyExists) throw new Error("User already exists!");

    const newUser = await User.create(user);
    if (!newUser) throw new Error("User not created!");
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getCurrentUser(userId: string | undefined) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found!");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function checkUserExists({
  email,
  password,
}: CheckUserExistsParams) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    console.log("User: ", user);
    if (!user) throw new Error("User not found!");
    if (user.password !== password) throw new Error("Password incorrect!");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("Wrong password");
  }
}

export async function getUserEmail(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found!");

    console.log("User in get email: ", user);

    return JSON.parse(JSON.stringify(user.email));
  } catch (error) {
    console.log("Error: ", error);
    handleError(error);
  }
}
