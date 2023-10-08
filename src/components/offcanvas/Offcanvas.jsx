import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Offcanvas, Form } from "react-bootstrap";
import axios from "axios";
import { Logo } from "../logo";

const ModalContato = () => {
  return (
    <>
      {["end"].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} />
      ))}
    </>
  );
};

const OffCanvasExample = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isEmailForm, setIsEmailForm] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsFormSubmitted(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const getContacts = async () => {
    try {
      const { data } = await axios.get(
        `https://prossima-be.vercel.app/contacts`
      );
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkFields = (value, isEmail = false) => {
    setShowErrorMessage(!value);

    if (isEmail) {
      const re = /\S+@\S+\.\S+/;
      setIsEmailForm(re.test(value));
    }
  };

  const addNewContacts = async () => {
    if (!name || !email) {
      setShowErrorMessage(true);
      return;
    }
    const data = { Name: name, Email: email };

    try {
      const { data: newContacts } = await axios.post(
        `https://prossima-be.vercel.app/contacts`,
        data
      );
      setContacts([...contacts, newContacts]);
      setName("");
      setEmail("");
      setIsFormSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <Button variant="primary" className="rounded-5" onClick={handleShow}>
        Contact Us
      </Button>

      <Offcanvas
        className="offcanvasCss"
        show={show}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Logo
              Width="243"
              Height="21.88"
              className="logo-form"
              alt="Prossima Art logo"
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {isFormSubmitted ? (
            <div>
              <h4>Form Submitted Successfully!</h4>
              <p className="text-secondary">
              Thank you for contacting us.
              </p>
            </div>
          ) : (
            <div>
              <h4>Interested in seeing more? We'd love to have you</h4>
              <p className="text-secondary">
                Reach out to us by filling out the contact form below. We look
                forward to hearing from you!
              </p>

              <Form className="mb-5">
                <Form.Group className="row-md-2 mx-2">
                  <Form.Label htmlFor="name" column sm="4">
                    Your name
                  </Form.Label>
                  <Form.Control
                    className="rounded-5 mb-3"
                    as="input"
                    placeholder="your name"
                    type="text"
                    id="name"
                    name="name"
                    required=""
                    rows={2}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      checkFields(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="row-md-3 mx-2 ">
                  <Form.Label column sm="4" htmlFor="email">
                    Email address
                  </Form.Label>
                  <Form.Control
                    className="rounded-5  mb-4"
                    type="email"
                    placeholder="name@example.com"
                    id="email"
                    name="email"
                    required=""
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      checkFields(e.target.value, true);
                    }}
                  />
                </Form.Group>
                {showErrorMessage && <p>Please fill in the blanks above and click to send.</p>}
                <Button
                  className="rounded-5"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                  variant="primary"
                  disabled={!isEmailForm}
                  onClick={addNewContacts}
                >
                  Join The Waitlist!
                </Button>
              </Form>
            </div>
          )}
        </Offcanvas.Body>
        <p className="text-secondary text-center mb-5">
          Prefer email?{" "}
          <a href="mailto:prossima.art@gmail.com" className="text-primary">
            prossima.art@gmail.com{" "}
          </a>
        </p>
      </Offcanvas>
    </>
  );
};

export { ModalContato, OffCanvasExample };
