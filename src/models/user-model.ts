import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String },
    profilePicture: { type: String, required: false },
    bio: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

// Check if the model already compiled, if yes delete it
if (mongoose.models && mongoose.models["users"]) {
  mongoose.deleteModel("users");
}
// if not then compile a new model name "users"
const UserModel = mongoose.model("users", userSchema);

export default UserModel;
