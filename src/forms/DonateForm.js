import React, {useState, useEffect} from 'react';
import Step1 from "./Step1.js";
import Step2 from "./Step2.js";

function DonationForm() {
    const [step, setStep] = useState(1); // State to manage form steps
    const [selectedAmt, setSelectedAmt] = useState("50");
    const [custAmt, setCustAmt] = useState("");
    const [pmtType, setPmtType] = useState("onetime");
    const [message, setMessage] = useState("");

    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
  
      if (query.get("success")) {
        setMessage("Order placed! You will receive an email confirmation.");
      }
  
      if (query.get("canceled")) {
        setMessage(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    }, []);
    
    const handleRadioChange = (event) => {
      setSelectedAmt(event.target.value);
      setCustAmt("");
    };

    const handleCustomAmtChange = (event) => {
      var val = event.target.value;
      if(val==="" && val===null){
        val = "";
      }
      setSelectedAmt(val);
      setCustAmt(val);
    };

    const handleAmtTypeChange = (event) => {
      setPmtType(event.target.value);
    };

    const handleNext = () => {
      setStep(2); // Increment step to show the next form section
    };
  
    const handleBack = () => {
      setStep(1); // Decrement step to go back to the previous form section
    };

    const renderStep = () => {
        console.log("Step Value : "+step);
      switch (step) {
        case 1:
          return <Step1 onNext={handleNext} onRadioChange={handleRadioChange} selectedAmt={selectedAmt} pmtType={pmtType} 
          onCustomAmtChange={handleCustomAmtChange} onAmtTypeChange={handleAmtTypeChange} custAmt={custAmt} />;
        case 2:
          return <Step2 selectedAmt={selectedAmt} pmtType={pmtType} onBack={handleBack} onNext={handleNext} />;
        default:
          return null;
      }
    };
    
    const Message = ({ message }) => (
      <section>
        <p>{message}</p>
      </section>
    );

    return (
      <>
        <div className="top-half">
          { step!==1 &&
          <>
          <div style={{width:"36px", height:"36px", left: "20px", position: "relative", top: "32px"}} onClick={handleBack} >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
          </div>
            </>
          }
        </div>
        <div className="p-4 p-md-5 border rounded-5 bg-body-tertiary">	
          <div className="bottom-half">
          {
          message && 
          <Message message={message} />
          }
          </div>
          <form id="donateForm">
          {renderStep()} {/* Render the current step */}
          </form>
        </div>
      </>
    );
  }
  
  export default DonationForm;
  