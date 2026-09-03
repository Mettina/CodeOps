import React from 'react';
import PropTypes from 'prop-types';

function Card({ children }) {
  return (
    <div className="exercise-card-wrapper" style={{ border: '2px dotted #34495e', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
      {/* Exercise 3: Renders whatever child component is wrapped inside */}
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;
