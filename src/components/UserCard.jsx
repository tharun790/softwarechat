import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import React from "react";
const UserCard = ({ user }) => {

  console.log("UserCard received user:", user);

  const dispatch = useDispatch();

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  //const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    console.log("Sending request to userId:", userId);

    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err.response?.data || err.message);
      alert("Error: " + (err.response?.data || err.message || "Something went wrong"));
    }
  };

  return (
    <div
      className="flex justify-center items-center h-[calc(100vh-8rem)]" // Adjust height to fit between navbar and footer
    >
      <div
        className="card w-96 bg-base-300 shadow-xl border border-base-300 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl max-h-full overflow-auto"
      >
        <figure>
          <img
            src={photoUrl}
            alt="User"
            className="rounded-t-lg object-cover"
            style={{ height: "300px", width: "100%" }} // Adjusted height for better fit
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg font-bold text-primary">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-white-800 font-bold">
              {age + ", " + gender}
            </p>
          )}
          <p className="text-sm text-primary font-bold italic mt-2">{about}</p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-outline btn-error w-32"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary w-32"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard; 