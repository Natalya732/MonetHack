"use client";

import { useUser } from "@clerk/nextjs";

const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4 max-w-screen-2xl mx-auto ">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome Back, {`${isLoaded && user?.firstName}`}
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your personal Financial Overview Report.
      </p>
    </div>
  );
};

export default WelcomeMsg;
