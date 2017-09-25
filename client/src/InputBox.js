import React from 'react';

export default ({ zip }) => {
  return(
    <div>
      <input {...zip} placeholder="Zip Code" />
    </div>
  );
}
