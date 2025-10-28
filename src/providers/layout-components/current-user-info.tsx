import { UserType } from "@/interfaces";
import { useClerk } from "@clerk/nextjs";
import { Button, Divider, Drawer, message } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

const CurrentUserInfo = ({
  currentUser,
  setCurrentUserInfo,
  showCurrentUserInfo,
}: {
  currentUser: UserType | null;
  setCurrentUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  showCurrentUserInfo: boolean;
}) => {
  const [loading, setLoading] = React.useState(false);
  const { signOut } = useClerk();
  const router = useRouter();

  const onLogout = async () => {
    try {
      setLoading(true);
      setCurrentUserInfo(false);
      await signOut();
      message.success("Logged out successfully");

      router.push("/sign-in");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProperty = (key: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-700">{key}</span>
        <span className="text-gray-600">{value}</span>
      </div>
    );
  };

  return (
    <Drawer
      open={showCurrentUserInfo}
      onClose={() => setCurrentUserInfo(false)}
      title="Profile Information"
    >
      {currentUser && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <Image
              src={currentUser?.profilePicture}
              alt="Profile"
              width={110}
              height={110}
              quality={100}
              className="rounded-full object-cover"
            />
            <span className="text-gray-700 cursor-pointer">
              Change Profile Picture
            </span>
          </div>
          <Divider className="my-1 border-gray-200" />
          <div className="flex flex-col gap-5">
            {getProperty("Name", currentUser.name)}
            {getProperty("Username", currentUser.userName)}
            {getProperty("ID", currentUser._id)}
            {getProperty(
              "Joined On",
              dayjs(currentUser.createdAt).format("DD MMMM YYYY hh:mm A")
            )}
          </div>
          <div className="mt-5">
            <Button
              className="w-full"
              block
              loading={loading}
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default CurrentUserInfo;
