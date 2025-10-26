import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const { firstName, lastName, username } = user || {};
  let email = "";
  if (user && user.emailAddresses && user.emailAddresses.length > 0) {
    email = user.emailAddresses[0].emailAddress;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-primary border border-amber-300">
      <UserButton afterSignOutUrl="/sign-in" />
      <div className="flex flex-col items-center justify-center">
        <h1>First Name: {firstName}</h1>
        <h1>Last Name: {lastName}</h1>
        <h1>Username: {username}</h1>
        <h1>Email: {email}</h1>
      </div>
    </div>
  );
}
