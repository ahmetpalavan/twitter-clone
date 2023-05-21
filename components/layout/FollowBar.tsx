import React from "react";

const FollowBar = () => {
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="mt-4 gap-6 flex flex-col">{/* To User List */}</div>
      </div>
    </div>
  );
};

export default FollowBar;
