import React from "react";
import PropTypes from "prop-types";

import Button from "@ui-components/Button";

class CancelButton extends React.Component {
  deleteVideoFile() {
    if (
      window.confirm("Are you sure you want to delete this video file and go to previous step?")
    ) {
      this.props.onCancel();
    }
  }

  render() {
    return (
      <div className="buttons-header__item-wrapper">
        <Button theme="gray" onClick={() => this.deleteVideoFile()}>
          Set other parameters
        </Button>
      </div>
    );
  }
}

CancelButton.propTypes = {
  onCancel: PropTypes.func,
};

export default CancelButton;
