import { useEffect,useRef,useState} from 'react';
import "../css/canvas.css";
import {Modal} from "react-bootstrap";

const Canvas = (prop) => {
  const [modal,setModal]=useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [conten,setcontent]=useState("");
    const [tt,settt]=useState(0);
    var content,url;
    if(prop.act==0){
      content="Login Verification";
      url="verify";
    }
    else if (prop.act==1){
      content="Update Registered";
      url="update";

    }
    else if(prop.act==2){
      content="New Registrations";
      url="newreg";
    }
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
      if (canvasRef.current){
        
       const canvas=canvasRef.current;
      const video=videoRef.current;
       var  context=canvas.getContext("2d");
  context.beginPath();
  context.arc(canvas.width/2,canvas.height/2,canvas.width/2,0,2*Math.PI);
  context.lineWidth = 2;
    context.strokeStyle = 'white';
    context.stroke();
  setInterval(function(){
      context.drawImage(video,0,0,canvas.width,canvas.height);

      // context.beginPath();
      // context.globalCompositeOperation="destination-in"
      // context.arc(canvas.width/2,canvas.height/2,canvas.width/2,0,2*Math.PI);

      // context.fill();
      // context.globalCompositeOperation="source-over";
  },100)
      }
         



        })
        .catch((error) => {
          
          console.error('Error accessing media devices.', error);
        });
    }, []);
    const send = () => {
      if (canvasRef.current && videoRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      //  document.getElementById("try").src=canvas.toDataURL();
       console.log(tt);
      
        fetch("https://10.5.2.4:8000/"+url, {
          body: JSON.stringify({ "image_data": JSON.stringify(canvas.toDataURL()),"data":prop.data,"tt":tt}),
          headers: { "content-type": "application/json" },
          method: "POST"
        })
          .then((res) => (res.json()))
          .then((data) => { 
            setModal(false)
            console.log(data); 
            if(prop.act==0){
              prop.check(data["verification"])

            }
            else{
              
              if(data["message"]==1){
                if(tt==5){
                  prop.close(false)
                  prop.check(0);
                }
                
                else if(tt<5){
                  settt(tt+1);
                  document.getElementById("heading").innerText="PHOTO"+tt;

                }
                
              }
              else{
                document.getElementById("heading").innerText=data["message"];
                
              }
            }
            
        })
          .catch((err) => {setModal(false); console.log(err) })
      }
    };
  
    return (
      <>
        <div id="mainc" class="row">
          {/* <img id="try" src=""></img> */}
          <div id="sfa2" class="col-md-8 p-0 col-sm-12 mx-auto">
          
            <div id="shoot" class="">
            <h3 id="heading"> {content}</h3>

              <video id="video" ref={videoRef}>

              </video>
              <canvas id="canvas" ref={canvasRef}></canvas>
            </div>
            <div id="controls" class="">
              <div id="shutter" onClick={()=>{send();setModal(true)}} class="m-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-send" viewBox="0 0 16 16">
                  <path
                    d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              </div>
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
  };
  export {Canvas};