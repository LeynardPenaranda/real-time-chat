import { connectToDB } from "@/config/db-config";
import { GetCurrentUserFromDB } from "@/server-actions/users";
import { UserButton } from "@clerk/nextjs";

connectToDB();

export default async function Home() {
  const user = await GetCurrentUserFromDB();

  const { name, userName } = user || {};
  let email = "";
  if (user && user.email) {
    email = user.email;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-primary border border-amber-300">
      <UserButton afterSignOutUrl="/sign-in" />
      <div className="flex flex-col items-center justify-center">
        <h1>Name: {name}</h1>
        <h1>Username: {userName}</h1>
        <h1>Email: {email}</h1>
      </div>
    </div>
  );
}
