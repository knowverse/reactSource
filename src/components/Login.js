import { Form, Modal,Dropdown, DropdownButton, Button, FloatingLabel, InputGroup } from "react-bootstrap";
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Button from "react-bootstrap/Button";
// import { Dropdown,DropdownButton } from 'react-bootstrap';
import { useState } from "react";
import "../css/form.css";
const Login = (prop) => {
    const [content,setcontent]=useState("Login Credentials");
    const [modal,setModal]=useState(false);
    const datafill=(e)=>{
        e.preventDefault();
       
        fetch("https://10.5.2.4:8000/login", {

            body: JSON.stringify({ "username":document.forms[0][0].value, password: document.forms[0][1].value }),
            headers: { "content-type": "application/json" },
            method: "POST"
        }).then((res) => (res.json()))
        .then((res) => {setModal(false);console.log(res);if(res["Login"]===1){prop.data(document.forms[0][0].value)}else{setcontent("Invalid credentials")}} )
            .catch((err) => { setModal(false);setcontent("error Credentials"+err) })
      
    }
        
    
    
    return (

        <>
        
            <Form id="form" className="">
            <h3 className="text-center text-uppercase mt-3">{content}</h3>

                <InputGroup size="md" className="group mb-3 mt-3 col-md-8 m-auto">
                    <InputGroup.Text className="grouptext" id="inputGroup-sizing-md"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-rolodex" viewBox="0 0 16 16">
                        <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                    </svg></InputGroup.Text>
                    <FloatingLabel controlId="floatingInput" label="Username">
                        <Form.Control type="text" required name="username" placeholder="name@example.com" />
                    </FloatingLabel>
                    {/* <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" /> */}
                </InputGroup>
                <InputGroup size="md" className="group mb-3 mt-3 col-md-8 m-auto">
                    <InputGroup.Text className="grouptext" id="inputGroup-sizing-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        </svg>
                    </InputGroup.Text>
                    <FloatingLabel controlId="floatingInput" label="Password">
                        <Form.Control required name="password" type="password" placeholder="name@example.com" />
                    </FloatingLabel>
                    {/* <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" /> */}
                </InputGroup>
               
                <InputGroup className="group mb-3">
                <button type="Submit" id="submit" className="btn btn-primary d-block" onClick={(e)=>{datafill(e);setModal(true)}}>
                Submit
                </button></InputGroup>

               


            </Form>
            <Modal show={modal} centered style={{width:"250px",margin:"auto",left:"50%",transform:"translateX(-50%)"}}size="sm" aria-labelledby="contained-modal-title-vcenter"
    >
    
    <Modal.Body className="m-auto">
        <button className="btn btn-primary mx-auto text-center" type="button" disabled>
        <span className="spinner-border justify-content-center text-warning spinner-border-sm" role="status" aria-hidden="true">
        </span>
          <h3>Loading.....</h3>
        </button>
    </Modal.Body>
    </Modal>



            

        </>
    )

}
export {Login};