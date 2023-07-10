import { Form, Dropdown, DropdownButton, Button, FloatingLabel, InputGroup } from "react-bootstrap";
import "../css/form.css";
const Update = (prop) => {
    const datafill=(e)=>{
        e.preventDefault();
        console.log(prop.log)
        prop.data({
            user:prop.log,
            class:document.forms[0][0].value,
            branch:document.forms[0][1].value,
            section:document.forms[0][2].value
        })
        
    }
    var heading;
    if(prop.togle==1){
        heading="Update Registered";
    }
    else{
        heading="New Registrations";
    }
    
    const classes=["N18","N19","N20"];
    const branch=["cse","ece"]
    const section=["cse1","cse2","cse3","cse4","cse5","cse6"];
    return (

        <>
        
            <Form id="form" className="">
            <h3 className="text-center text-primary text-uppercase mt-3"><a href="#" target="blank">
               {heading}
               </a>
            </h3>

                
                <InputGroup size="md" className="group mb-3 mt-3 col-md-8 m-auto">
                    <InputGroup.Text className="grouptext" id="inputGroup-sizing-md"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-rolodex" viewBox="0 0 16 16">
                        <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                    </svg></InputGroup.Text>
                    <FloatingLabel controlId="floatingInput" label="Class">
                    <Form.Select required aria-label="Floating label select example">
        { classes.map((i)=>{
            return(
                <option value={i}>{i}</option>
            )
        })

        }
       
    </Form.Select>
                    </FloatingLabel>
                </InputGroup>
                <InputGroup size="md" className="group mb-3 mt-3 col-md-8 m-auto">
                    <InputGroup.Text className="grouptext" id="inputGroup-sizing-md"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-rolodex" viewBox="0 0 16 16">
                        <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                    </svg></InputGroup.Text>
                    <FloatingLabel controlId="floatingInput" label="Branch">
                    <Form.Select required aria-label="Floating label select example">
        { branch.map((i)=>{
            return(
                <option value={i}>{i}</option>
            )
        })

        }
       
    </Form.Select>
                    </FloatingLabel>
                </InputGroup>
                <InputGroup size="md" className="group mb-3 mt-3 col-md-8 m-auto">
                    <InputGroup.Text className="grouptext" id="inputGroup-sizing-md"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-rolodex" viewBox="0 0 16 16">
                        <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                    </svg></InputGroup.Text>
                    <FloatingLabel controlId="floatingInput" label="Section">
                    <Form.Select required aria-label="Floating label select example">
        { section.map((i)=>{
            return(
                <option value={i}>{i}</option>
            )
        })

        }
       
    </Form.Select>
                    </FloatingLabel>
                </InputGroup>
              
               
                <InputGroup className="group mb-3">
                <button type="Submit" onClick={(e)=>{datafill(e)}} id="submit" className="btn btn-primary d-block">
                NEXT
                </button></InputGroup>

               


            </Form>

        </>
    )

}
export default Update;