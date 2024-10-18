// import React, { useEffect, useRef } from "react";
// import Message from "./Message";
// import useGetMessage from "../../context/useGetMessage";
// import Loading from "../../components/Loading";

// function Messages() {
//   const {loading, message } = useGetMessage();

//   console.log(message);


//   const lastMsgRef = useRef();
//   useEffect(() => {
//     setTimeout(() => {
//       if (lastMsgRef.current) {
//         lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//     }, 100);
//   }, [message]);

//   return (
//     <div className="flex-1 overflow-y-auto" 
//     style={{ minHeight: "calc(88vh - 10vh)" }}
//     >
  
//       {loading ? (
//         <Loading />
//       ) : (
//         message.length > 0 &&
//         message.map((message) => {
//           <div key={message._id} ref={lastMsgRef}>
//             <Message message={message} />
//           </div>
//         })
//       )}

      
//         {!loading && message.length === 0 && (
//           <div>
//             <p className="text-center font-sans mt-[20%]">
//               Say! Hi to start the conversation
//               </p>
//           </div>
//         )}
//       </div>
//   );
// }

// export default Messages;


import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage";
import Loading from "../../components/Loading";
import useGetSocketMessage from "../../context/useGetSocketMessage";

function Messages() {
  const { loading, message } = useGetMessage();
  useGetSocketMessage();
  console.log(message);

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [message]);

  return (
    <div className="flex-1 overflow-y-auto" 
      style={{ minHeight: "calc(88vh - 10vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        message.length > 0 &&
        message.map((msg, index) => (
          <div key={msg._id ||index} ref={index === message.length - 1 ? lastMsgRef : null}>
            <Message message={msg} ind={index} />
          </div>
        ))
      )}

      {!loading && message.length === 0 && (
        <div>
          <p className="text-center font-sans mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
