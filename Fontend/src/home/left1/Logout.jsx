import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider"; // Import the auth context

function Logout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth(); // Get the authUser setter from context

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/v1/logout");
      sessionStorage.removeItem("messenger");
      Cookies.remove("jwt");

      toast.success("Logout Successfully");

      // Set authUser to null or false to reflect logged-out state
      setAuthUser(null);

      setLoading(false);

      // Redirect to login page after logout
      navigate("/login");

    } catch (error) {
      toast.error("Failed to Logout");
      setLoading(false);
    }
  };

  return (
    <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
      <div className="p-3 align-bottom">
        <button onClick={handleLogout} disabled={loading}>
          <TbLogout2 className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300" />
        </button>
      </div>
    </div>
  );
}

export default Logout;
