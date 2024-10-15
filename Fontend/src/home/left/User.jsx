import React from 'react'

function User({ user }) {
  return (
    <div>
      <div className="flex space-x-4 px-8 py-7 hover:bg-slate-600 duration-300 cursor-pointer">
      <div className="avatar online">
        <div className="w-14 rounded-full">
          {/* img tag apnu profile aa link ni jagya ae nakhi sakay 6e */}
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <h1 className='font-bold'>{user.name}</h1>
        <span>{user.email}</span>
      </div>
      </div>
    </div>
  )
}

export default User
