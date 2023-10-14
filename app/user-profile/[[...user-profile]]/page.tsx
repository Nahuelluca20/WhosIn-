import {UserProfile} from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="w-screen flex justify-center">
    <UserProfile path="/user-profile" routing="path" />
  </div>
);

export default UserProfilePage;
