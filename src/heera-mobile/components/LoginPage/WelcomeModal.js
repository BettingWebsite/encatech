import React, { Component } from "react";

import { Modal, Button, Card } from "react-bootstrap";
class WelcomeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { show } = this.props;
    return (
      <Modal
        show={show}
        style={{ opacity: 1 }}
        onHide={() => this.props.ModalClose()}
        size="lg"
      >
        <Modal.Header
          closeButton
          className="text-white"
          className="bg"
        ></Modal.Header>

        <Modal.Body>
          <Card className="px-3 mt-2">
            <div className="px-1 mt-2">
              <h5>Dear Client,</h5>
              <p className=" font-weight-normal  mb-1">
                You are requested to login with our official site{" "}
                <a
                  href="http://encabook.com/"
                  className="text-primary nav-item ml-2, mr-1"
                >
                  'encabook.com'
                </a>
                only. Please check the site name before you login.
                <br></br> Thanks for your support. <br></br>
                Team encabook
              </p>
            </div>
          </Card>
          <Card className="px-3 mt-2 card1">
            <div className="px-1 mt-2">
              <h5> प्रिय ग्राहक, </h5>
              <p className=" font-weight-normal mb-1">
                आपसे अनुरोध है कि केवल हमारी आधिकारिक साइट{" "}
                <a
                  href="http://encabook.com/"
                  className="text-primary nav-item ml-2, mr-1"
                >
                  'encabook.com'
                </a>{" "}
                से लॉगिन करें। लॉगइन करने से पहले साइट का नाम जरूर देख लें।
                <br></br> आपके समर्थन के लिए धन्यवाद। <br></br>
                टीम encabook
              </p>
            </div>
          </Card>
          <div className="d-flex justify-content-end mt-2">
            {" "}
            <Button
              className="bg-primary px-3"
              onClick={() => this.props.ModalClose()}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default WelcomeModal;
