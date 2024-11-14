import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import NavMenu from "../layout/navMenu";
import StatsNavMenu from "../layout/statsNavMenu";

function Settings() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isUpdateButtonVisible, setIsUpdateButtonVisible] = useState(false);
  const [isPassButtonVisible, setIsPassButtonVisible] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("accessToken");
        if(!token){
          alert("No Authentication token found.");
          return;
        }

        const response = await fetch("/api/settings/getUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        const data = await response.json();
        if (response.ok) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmailAddress(data.emailAddress);
          setUsername(data.username);
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("An error occurred when fetching your data.");
      }
    };
    fetchUserData();
  }, []);

  const toggleForm = () => {
    setIsEditFormVisible(!isEditFormVisible);
  };

  const toggleButton = () => {
    setIsUpdateButtonVisible(!isUpdateButtonVisible);
  };
  const toggleButtonPass = () => {
    setIsPassButtonVisible(!isPassButtonVisible);
  };

  const togglePass = () => {
    setIsPassVisible(!isPassVisible);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      if((firstName!="") && (lastName!="") && (emailAddress!="") && (username!="")){
      const token = Cookies.get("accessToken");
      const updateData = {
        firstName,
        lastName,
        emailAddress,
        username,
      };


      const response = await fetch("/api/settings/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const data = await response.json();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmailAddress(data.emailAddress);
        setUsername(data.username);
        setPassword(""); 

        alert("User updated successfully! Logging you out.");
        handleLogout();
      } else {
        alert("Failed to update user.");
      }
    }else{
      alert("Please fill in all fields");
    }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    try {
      if(password != ""){
      const token = Cookies.get("accessToken");
      const response = await fetch("/api/settings/updateUserPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setPassword(""); 
        alert("Password Updated Successfully");
      } else {
        alert("Failed to update password.");
      }
    }
    else{
      alert("Password cannot be empty!");
    }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <section id="settings">
        <StatsNavMenu/>
        <div id="updateContainer">
          <div className="updateForm">
            <div id="top">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  readOnly
                />
                <input type="text" name="lastName" value={lastName} readOnly />
                <input
                  type="email"
                  name="emailAddress"
                  value={emailAddress}
                  readOnly
                />
                <input type="text" name="username" value={username} readOnly />
              </div>
              <form onSubmit={handleUpdate}>
                <div
                  id="editForm"
                  className={`${
                    isEditFormVisible ? "show" : "hide"
                  } updateForm`}
                >
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    name="emailAddress"
                    id="email"
                    placeholder="Email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <button
                  type="button"
                    id="changePass"
                    onClick={() => {
                      toggleButtonPass();
                      togglePass();
                    }}
                    className="button"
                  >
                    Change Password
                  </button>
                </div>
                <button
                  type="submit"
                  id="update"
                  className={`${
                    isUpdateButtonVisible ? "show" : "hide"
                  } button`}
                >
                  Update User
                </button>
              </form>
              <form
                id="passForm"
                className={`${isPassVisible ? "show" : "hide"} updateForm`}
                onSubmit={handlePasswordUpdate}
              >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="New Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  id="passUpdate"
                  className={`${isPassButtonVisible ? "show" : "hide"} button`}
                >
                  Update Password
                </button>
              </form>
            </div>
            <div id="updateButton">
              <button
                id="change"
                onClick={() => {
                  toggleButton();
                  toggleForm();
                }}
                className="button"
              >
                Change Details
              </button>

              <button className="button" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;
