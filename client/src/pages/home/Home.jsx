import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import Admin from "../admin/Admin";

const Home = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  // console.log(user)
  return (
    <div className='min-h-screen'>
      {user?.isAdmin ? (
        <div className=''>
          <Admin />
        </div>
      ) : (
        <>Hello User</>
      )}
    </div>
  );
};

export default Home;
