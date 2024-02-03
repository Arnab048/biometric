import { useEffect, useState } from "react";

const AllUser = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center font-semibold text-black text-3xl mb-5 italic">
        HERE ARE ALL THE USERS
      </h1>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="font-bold text-lg text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Serial</th>
              <th>Gender</th>
              <th>Finger ID</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody className="font-semibold text-black text-center">
            {userData.map((user) => (
              <tr key={user.fingerprint_id}>
                <th>{user.fingerprint_id}</th>
                <td>{user.username}</td>
                <td>{user.serialnumber}</td>
                <td>{user.gender}</td>
                <td>{user.fingerprint_id}</td>
                <td>{user.regDate}</td>
                <td>{user.timein}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
