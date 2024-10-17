import React from "react";
import useConversation from "../../statemanage/useConversation";

function Chatuser() {

  const {selectedConversation} = useConversation()
  console.log(selectedConversation);

  return (
    <>
     <div className=" pl-5 pt-5 h-[10vh] flex space-x-4 bg-gray-950 hover:bg-gray-700 duration-300">
     <div>
      <div className="avatar online">
        <div className="w-14 rounded-full">
          {/* img tag apnu profile aa link ni jagya ae nakhi sakay 6e */}
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      </div>

      <div>
        <h1 className="text-xl">{selectedConversation.name}</h1>
        {/* <h1 className="text-xl">Nitin</h1> */}
        <span className="text-sm">Online</span>
      </div>
     </div>
    </>
  );
}

export default Chatuser;
