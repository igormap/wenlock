import React, { useEffect } from "react";
import { Outlet } from "react-router";
// import { useRedux } from '@/storage/hooks';

const LayoutAuth = () => {
  // const { user } = useRedux((s) => s.session);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate('/dash');
  //   }
  // }, [user]);

  return (
    <div className="bg-slate-900 w-full grid grid-cols-2 h-full">
      <Outlet />
    </div>
  );
};

export { LayoutAuth };
