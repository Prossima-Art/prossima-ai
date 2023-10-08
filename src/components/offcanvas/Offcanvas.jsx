import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Offcanvas, Form } from "react-bootstrap";
import axios from "axios";
import { Logo } from "../logo";

export function ModalContato() {
  return (
    <>
      {["end"].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} />
      ))}
    </>
  );
}

export function OffCanvasExample({ ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Contacts, setContacts] = useState([]);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");

  const getContacts = async () => {
    const { data } = await axios.get(`https://prossima-be.vercel.app/contacts`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

    setContacts(data);
  };

  const addNewContacts = async () => {
    if (!Name || !Email) {
      return alert("Preencha os campos !");
    }
    const data = { Name, Email };

    const { data: newContacts} = await axios.post(
      `https://prossima-be.vercel.app/contacts`,
      data
    )
    .then((response) => response.data)
    .catch((error) => console.log(error))
    ;

    setContacts([...Contacts, newContacts]);
    setName("");
    setEmail("");
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
          <h4>Interested in seeing more? We'd love to have you</h4>
          <p class="text-secondary">
            Reach out to us by filling out the contact form below. We look
            forward to hearing from you!
          </p>

          <Form className="mb-5" onSubmit={addNewContacts}>
            <Form.Group className="row-md-2 mx-2">
              <Form.Label for="name" column sm="4">
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
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="row-md-3 mx-2 ">
              <Form.Label column sm="4" for="email">
                Email address
              </Form.Label>
              <Form.Control
                className="rounded-5  mb-4"
                type="email"
                placeholder="name@example.com"
                id="email"
                name="email"
                required=""
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button
              className="rounded-5"
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              variant="primary"
              type="submit"
              // onClick={() => send2DB(Name, Email)}
            >
              Join The Waitlist!
            </Button>
          </Form>
        </Offcanvas.Body>
        <p class="text-secondary text-center mb-5">
          Prefer email?{" "}
          <a href="mailto:prossima.art@gmail.com" class="text-primary">
            prossima.art@gmail.com{" "}
          </a>
        </p>
      </Offcanvas>
    </>
  );
}
