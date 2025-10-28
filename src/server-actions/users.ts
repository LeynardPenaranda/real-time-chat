"use server";

import { connectToDB } from "@/config/db-config";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

connectToDB();

export const GetCurrentUserFromDB = async () => {
  try {
    const clerkUser = await currentUser();
    // Check if the user is already in the database based on the Clerk User ID
    const mongoUser = await UserModel.findOne({
      clerkUserId: clerkUser?.id,
    });

    if (mongoUser) {
      return JSON.parse(JSON.stringify(mongoUser));
    }

    // if there's no email then will put empty string
    let email = "";
    if (clerkUser?.emailAddresses) {
      email = clerkUser.emailAddresses[0]?.emailAddress || "";
    }

    // If the user is not in the database, create a new user in the database
    const newUserPayload = {
      clerkUserId: clerkUser?.id,
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      userName: clerkUser?.username || "user_" + Date.now(),
      email,
      profilePicture: clerkUser?.imageUrl,
    };

    const newUser = await UserModel.create(newUserPayload);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
