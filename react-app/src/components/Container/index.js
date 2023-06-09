// import React from 'react';
// import Members from '../Members';
// import CurrentChannel from '../CurrentChannel';
// import "./Container.css";
// import Sidebar from '../Sidebar';

// const ParentContainer = () => {
//   return (
//     <div className="parent-container">
//       <CurrentChannel className="current-channel" />
//       <Members className="members_list" />
//     </div>
//   );
// };

// export default ParentContainer;

import React from 'react';
import Members from '../Members';
import CurrentChannel from '../CurrentChannel';
import "./Container.css";
import Sidebar from '../Sidebar';
import Channels from '../Channels';

const ParentContainer = () => {
  return (
    <div className="parent-container">
      <Channels className="channels" />
      <CurrentChannel className="current-channel" />
      <Members className="members_list" />
    </div>
  );
};

export default ParentContainer;
