// import React from "react";
// import User from "./User";
// import userGetAllUser from "../../context/userGetAllUser";

// function Users() {
//   const [allUsers, loading] = userGetAllUser();
//   console.log(allUsers);

//   return (
//     <div
//       className=" py-2 flex-nitin overflow-y-auto"
//       style={{ maxHeight: "calc(84vh - 1vh)" }}

//     >
      
//       {allUsers.map((user, index) => {
//         return <User key={index} user={user} />
//       })}

//     </div>
//   );
// }

// export default Users;


import React from "react";
import User from "./User";
import userGetAllUser from "../../context/userGetAllUser";

function Users() {
  const [allUsers, loading] = userGetAllUser();
  console.log(allUsers);

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Ensure allUsers is an array
  if (!Array.isArray(allUsers)) {
    return <div>Error: Data is not an array</div>;
  }

  return (
    <div
      className="py-2 flex-nitin overflow-y-auto"
      style={{ maxHeight: "calc(84vh - 1vh)" }}
    >
      {allUsers.map((user, index) => (
        <User key={user._id} user={user} /> // Use user._id as key for better performance
      ))}
    </div>
  );
}

export default Users;
