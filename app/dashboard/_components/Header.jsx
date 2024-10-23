import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Image src="/favicon.svg" alt="logo" width={30} height={100} />
      <UserButton />
    </div>
  );
};

export default Header;
