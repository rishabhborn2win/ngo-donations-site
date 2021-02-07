import React, {useState, useEffect} from "react";
import icon from "./assests/image 21.svg";
import axios from 'axios';

const Feed = () => {
  const [response, setResponse] = useState({
  });
  var res;
  const getList = async () => {
   res = await axios.get(`http://localhost:5000/requests/getlist/${localStorage.loc}`);
   setResponse(res);
  };


  
  useEffect(() => {
    setResponse({res});
    console.log(res)
  }, [res])
  
  return (
    <>
    <div>
    <button className="btn btn-warning mt-5 feed-card-btn" onClick={() => getList()}>
              Refresh the requests!
            </button>
    {response.data !== undefined ? (response.data.map((data) => {
      return (
      <div className="container col-10">
      <div className="card mt-5 feed-card">
        <div className="row">
          <div className="col-md-2">
            <img src={icon} className="feed-img" alt="Feed" />
          </div>
          <div className="col-md-8">
            <p className="mt-3 mb-3 text-center feed-title">Ratings</p>
            <p className="text-center feed-para">
              {data._id} {" "} { data.desc}
            </p>
          </div>
          <div className="col-md-2">
            <button className="btn btn-warning mt-5 feed-card-btn">
              {data.donateTo ? data.donateTo : "Donate to is not def"}
            </button>
          </div>
        </div>
      </div>
      </div>
      )
    })) : ""}
    </div>
      
      <br/><br/><br/>
    </>
  );
};

export default Feed;
