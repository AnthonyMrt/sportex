import Unauthorized from "@/components";
import HeaderCoach from "@/components/global/HeaderCoach";
import { getCurrentCoach } from "@/data";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    coachId: string;
    specialityId: string;
  };
};

const layout = async ({ children, params }: Props) => {
  const authUser = await getCurrentCoach();

  if (!authUser) return <Unauthorized />;

  return (
    <div className="w-full">
      <HeaderCoach params={params} user={authUser.User} />
      <div className="overflow-x-hidde">{children}</div>
    </div>
  );
};

export default layout;
