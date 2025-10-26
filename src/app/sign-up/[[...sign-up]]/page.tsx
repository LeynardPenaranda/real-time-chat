import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-[#31304D] h-screen flex items-center justify-center">
      <SignUp />
    </div>
  );
}
