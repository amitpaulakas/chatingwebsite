import React from 'react'
import Grouplist from '../Component/Homepagecomponent/GroupList/Grouplist'
import Friends from '../Component/Homepagecomponent/NewFriend/Friends'
import Userlist from '../Component/Homepagecomponent/Userlist/Userlist'
import FriendRequest from '../Component/Homepagecomponent/Friend Request/FriendRequest'
import MyGroups from "../Component/Homepagecomponent/MyGroups/MyGroups"
import BlockUser from "../Component/Homepagecomponent/BlockUsers/BlockUsers"
import Search from '../Component/HomeComponet/HomeComponent/HomepageCommonComponent/Search'
const ChatHonePage = () => {
  return (
   <div>
     <div>
      <Search className={"w-full"} />
    </div>
    <div className=' flex  justify-evenly   align-bottom flex-wrap'>
      <Grouplist/>
      <Friends/>
      <Userlist/>
    <FriendRequest/>
    <MyGroups/>
    <BlockUser/>
    </div>
   </div>
  )
}

export default ChatHonePage
