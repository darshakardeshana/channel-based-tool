import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const NotificationAlert = ({ message, variant, show, onClose }) => {
  if (!show) return null;

  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
};

NotificationAlert.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'danger', 'warning', 'info']),
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

NotificationAlert.defaultProps = {
  variant: 'info',
  onClose: () => {},
};

export default NotificationAlert;
