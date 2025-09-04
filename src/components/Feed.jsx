import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const getFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.data));
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  if (!feed) return <div className="flex justify-center my-10">Loading...</div>;

  if (!Array.isArray(feed) || feed.length <= 0)
    return (
      <h1 className=" flex justify-center m-52 text-3xl">No more users!!!!</h1>
    );
  return (
    <div className="flex flex-col items-center gap-4 my-5">
      {feed.map((user) => <UserCard key={user._id} user={user} />)}
    </div>
  );
};

export default Feed;
