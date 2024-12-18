import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";

const Home = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  // console.log(user)
  return (
    <div className='min-h-screen'>
      {user?.isAdmin ? (
        <div className='mx-4 w-1/2 my-4'>
          <Sidebar />
        </div>
      ) : (
        <>Hello User</>
      )}
    </div>
  );
};

export default Home;
