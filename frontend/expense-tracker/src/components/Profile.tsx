import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { getCurrentUser } from "../api/auth";

import './Profile.scss';

function Login() {
  const [name, setName] = useState("");

  const getUser = async () => {
    try {
      const res = await getCurrentUser();

      setName(res.data.username);
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile-container">
      <Avatar sx={{ bgcolor: "#71ac71" }}>
        {name.charAt(0).toUpperCase()}
      </Avatar>
      <div className="profile-container__name">{name}</div>
    </div>
  );
}

export default Login;
