import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests,removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status,_id) =>{
    try{
        const res = await axios.post(
            BASE_URL + "/request/review/" + status + "/" + _id
    ,{},{withCredentials: true});
    dispatch(removeRequest(_id));
    }catch(err){

    }
  }
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

if (!requests) return <div className="flex justify-center my-10">Loading...</div>;

if (!Array.isArray(requests) || requests.length === 0)
    return (
        <div className="flex  justify-center h-screen">
            <h1 className="text-white text-2xl font-semibold my-8">
                No Requests Found
            </h1>
        </div>
    );

return (
    <div className="text-center my-10">
        <h1 className="font-bold text-white text-3xl mb-6">Connection Requests</h1>

        {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
                request.fromUserId;

            return (
                <div
                    key={_id}
                    className="flex flex-col md:flex-row justify-between items-center m-4 p-4 rounded-lg bg-base-300 shadow-lg w-11/12 md:w-2/3 mx-auto transition-transform transform hover:scale-105"
                >
                    <div className="mb-4 md:mb-0">
                        <img
                            alt="photo"
                            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                            src={photoUrl}
                        />
                    </div>
                    <div className="text-left mx-4 flex-1">
                        <h2 className="font-bold text-2xl text-white">
                            {firstName + " " + lastName}
                        </h2>
                        {age && gender && (
                            <p className="text-gray-400">{age + ", " + gender}</p>
                        )}
                        <p className="text-gray-300 mt-2">{about}</p>
                    </div>
                    <div className="flex space-x-4">
                        <button className="btn btn-error px-6 py-2 text-sm font-semibold" onClick={()=> reviewRequest("rejected",request._id)}>
                            Reject
                        </button>
                        <button className="btn btn-success px-6 py-2 text-sm font-semibold" onClick={()=> reviewRequest("accepted",request._id)}>   
                            Accept
                        </button>
                    </div>
                </div>
            );
        })}
    </div>
);
};
export default Requests;