import React from 'react';
import './index.scss';
import board from '../../static/images/board.png';

const Started = ({ goToInvitation }) => {
  return (
    <div className="started-container">
      <div className="board">
        <img src={board} alt="board" />
      </div>
      <div className='btn-started' onClick={goToInvitation}>
        <p>Buka Undangan</p>
      </div>
      </div>
  );
};

export default Started;

