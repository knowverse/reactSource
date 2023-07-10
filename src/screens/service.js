import {useRef,useEffect,useState} from "react";
import { Carousel,Modal } from "react-bootstrap";
import "../css/service2.css";
import a from "./a.jpeg";
const Service=(prop)=>{
    const [modal,setModal]=useState(false);
    const videoRef=useRef(null);
    const shutterRef=useRef(null);
    const controlsRef=useRef(null);
    const sheetRef=useRef(null);
    const carouselRef=useRef(null);
    const [abs,setabs]=useState([]);
    const [imag,setimag]=useState([]);
    const handleShutterClick = (element) => {
        if (shutterRef.current) {
          shutterRef.current.style.display = 'flex';
        }
        if (videoRef.current) {
          videoRef.current.pause();
        }
        if (element.parentElement) {
          element.parentElement.style.display = 'none';
        }
        const retakeElement = document.getElementById('retake');
        retakeElement.style.display = 'block';
        const nextElement = document.getElementById('next');
        nextElement.style.display = 'block';
        const sendElement = document.getElementById('send');
        sendElement.style.display = 'block';
      };
      const handleControlClick = (element) => {
        if (controlsRef.current) {
          controlsRef.current.style.display = 'block';
        }
        if (videoRef.current) {
          videoRef.current.play();
        }
        if (element.parentElement) {
          element.parentElement.style.display = 'none';
        }
        const retakeElement = document.getElementById('retake');
        retakeElement.style.display = 'none';
        const nextElement = document.getElementById('next');
        nextElement.style.display = 'none';
        const sendElement = document.getElementById('send');
        sendElement.style.display = 'none';
      };
    
    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({ video:{facingMode:{exact:"environment"}}})
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((error) => {
          console.error('Error accessing media devices.', error);
        });

    },[]);

    
    const send = () => {
        if (videoRef.current) {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext('2d');
          const video = videoRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          

          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          console.log("hello");
          fetch("https://192.168.121.149:8000/identify", {
            body: JSON.stringify({ "image_data": JSON.stringify(canvas.toDataURL()),"data":prop.data }),
            headers: { "content-type": "application/json" },
            method: "POST"
          })
            .then((res) => (res.json()))
            .then((data) => { 
                setModal(false);
                if(data["image"]!=0){
                if(imag.length>0){
                    console.log(imag.length);
                setimag([...imag,data["image"]])
                console.log(imag)
                }
                else{
                    setimag([data["image"]])
                }
                setabs([...abs,data["findings"]])
            }
             })
            .catch((err) => { setModal(false);console.log(err) })
        }
      };
    return(
        <>
        <div id="service" class="row container-fluid p-0">
        <div id="sfa" class="col-md-8 p-0 col-sm-12 mx-auto">
            <div id="shoot" class="">
                <video id="video" ref={videoRef}></video>
            </div>
            <div id="controls" ref={controlsRef}>
            <div id="shutter" onClick={(element) => handleShutterClick(element.target)} className="m-auto"></div>

            </div>
            <div id="secondControl" ref={shutterRef}>
                <div id="retake"  onClick={(element)=>handleControlClick(element.target)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-camera" viewBox="0 0 16 16">
                        <path
                            d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                        <path
                            d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                    </svg>
                    <span>RETAKE</span>
                </div>
                <div id="send" onClick={()=>{console.log("hello");setModal(true);send();}} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-send" viewBox="0 0 16 16">
                        <path
                            d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                    </svg>
                    <span>send</span>

                </div>
                <div id="next" onClick={(element)=>{handleControlClick(element.target)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-camera2" viewBox="0 0 16 16">
                        <path d="M5 8c0-1.657 2.343-3 4-3V4a4 4 0 0 0-4 4z" />
                        <path
                            d="M12.318 3h2.015C15.253 3 16 3.746 16 4.667v6.666c0 .92-.746 1.667-1.667 1.667h-2.015A5.97 5.97 0 0 1 9 14a5.972 5.972 0 0 1-3.318-1H1.667C.747 13 0 12.254 0 11.333V4.667C0 3.747.746 3 1.667 3H2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1h.682A5.97 5.97 0 0 1 9 2c1.227 0 2.367.368 3.318 1zM2 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zM14 8A5 5 0 1 0 4 8a5 5 0 0 0 10 0z" />
                    </svg>
                    <span>nextShot</span>
                </div>

            </div>
            <div id="closeshoot" onClick={()=>{videoRef.current.pause();prop.close(false);prop.ver(0)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"
                    viewBox="0 0 16 16">
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
               
            </div>
            <div id="record" onClick={(()=>{if (sheetRef.current){sheetRef.current.style.transform="rotate(90deg) scale(1)"}})}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                    <path
                        d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                    <path
                        d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                </svg>
                <span>presents</span>

            </div>
            <div id="image" onClick={(()=>{if(carouselRef.current){carouselRef.current.style.transform="rotate(90deg) scale(1)"}})}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-card-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path
                        d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                </svg>
                <span>images</span>
            </div>
            <div id="sheet" ref={sheetRef}>
                <div>
                <h3 class="border border-bottom border-black sticky-top"><b>cse-1</b><span onClick={(()=>{if(sheetRef.current){sheetRef.current.style.transform="scale(0)";}})}>-</span>
                </h3>
            </div>
                {abs.map((_id,i)=>(
                    <li>{_id}</li>
                ))

                }
            </div>
            <div id="carousel" ref={carouselRef}>
            <h3>images sent<span onClick={(()=>{if(carouselRef.current){carouselRef.current.style.transform="scale(0)";}})}>-</span></h3>

            <Carousel id="caro" fade controls variant="dark">
                {imag.map((_id,i)=>{
                    if(_id){
                    return(
                        
                    <Carousel.Item interval={1000}> 
                    <img className="d-block w-100" src={_id}
                            alt="First slide" />
                      
                    </Carousel.Item>

                )}})}
    {/* <Carousel.Item interval={1000}> 
    <img className="d-block w-100" src={a}
            alt="First slide" />
        <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={500}> 
    <img className="d-block w-100" src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Second slide" />
        <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item> 
        <img className="d-block w-100" src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide" />
        <Carousel.Caption>
            <h3>Third slide label</h3>
            <p> Praesent commodo cursus magna, vel scelerisque nisl consectetur. </p>
        </Carousel.Caption>
    </Carousel.Item> */}
</Carousel>
            </div>


        </div>
    </div>
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
export {Service};