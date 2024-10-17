import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage";
import Loading from "../../components/Loading";

function Messages() {
  const {message, loading} = useGetMessage();

  console.log(message);
  const lastMessageRef = useRef()
  useEffect(() => {
      setTimeout(() => {
       if(lastMessageRef.current){
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" })
       }
      }, 100);
  },[message]);
  
  return (
    <>

{loading? (<Loading></Loading>): (message.length>0 && message.map((message) =>{

 return <Message key= {message._id} message={message} />

}))}

     <div className="" style={{minHeight: 'calc(88vh - 10vh)'}}>
     
     {!loading && message.length ===  0 && <div><p className="text-center font-sans mt-[20%]">Say! Hi</p></div>}
   
     
     </div>
    </>
  );
}

export default Messages;
