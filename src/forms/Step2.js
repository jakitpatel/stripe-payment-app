import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {API_URL} from './../const.js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe("pk_test_c2f9X4lVVMx1votQUZ3UbpUM");

function Step2({ onBack, onNext, pmtType, selectedAmt }) {
    const handleDonationSubmit = async (event) => {
      console.log("On Submit Donation, Create Checkout Session");
      event.preventDefault();
      const stripe = await stripePromise;

      const pmtData = {
        priceAmt: selectedAmt,
        pmtType: pmtType,
      };

      const res = await fetch(API_URL+"./checkout.php", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json', // Specify the content type if sending JSON data
          // Add other headers if necessary
        },
        body: JSON.stringify(pmtData) // Convert data to JSON format
      });
      const data = await res.json();
      // When Checkout session created & session is retrieved, redirect to checkout page
      const result = await stripe.redirectToCheckout({
        sessionId: data.id
      });
      if(result.error){
        // If redirecttoCheckout fails due to browser or network
        //Display locallized error msg to your customer using result.error.message
      }
    }
    return (
        <div id="detailsForm">
        <h2 className='text-center mb-4'>Information</h2>
        <div className="row-cols-lg-auto">
            <div className="row">
              <div className="mb-3 col-md-6">
                  <label className="visually-hidden" htmlFor="firstName">First Name</label>
                    <div className="input-group">
                      <input type="text" className="form-control" id="firstName" placeholder="First Name" />
                    </div>
                   </div>
                   <div className="mb-3 col-md-6">
                    <label className="visually-hidden" htmlFor="lastName">Last Name</label>
                    <div className="input-group">
                      <input type="text" className="form-control" id="lastName" placeholder="Last Name" />
                    </div>
              </div>
             </div>
            <div className="row">
              <div className="mb-3 col-md-8">
                <label className="visually-hidden" htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Email" required="" />
              </div>
              <div className="mb-3 col-md-4">
                    <label className="visually-hidden" htmlFor="phone">Phone</label>
                    <div className="input-group">
                      <input type="text" className="form-control" id="phone" placeholder="Phone" />
                    </div>
              </div>
            </div>
            <><hr /></>
            <div className="row">
              <div className="mb-3 col-md-8">
                <label className="visually-hidden" htmlFor="street">Street</label>
                <input type="text" className="form-control" id="street" name="street" placeholder="Street Address" required="" />
              </div>
              <div className="mb-3 col-md-4">
                <label className="visually-hidden" htmlFor="apt">Apt</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="apt" placeholder="Apt,Suite" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="visually-hidden" htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" name="city" placeholder="City" required="" />
              </div>
              <div className="mb-3 col-md-6">
                <label className="visually-hidden" htmlFor="state">State</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="phone" placeholder="State / Province / Region" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="visually-hidden" htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" name="zip" placeholder="Zip / Postal Code" required="" />
              </div>
              <div className="mb-3 col-md-6">
                <label className="visually-hidden" htmlFor="country">Country</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="country" placeholder="Country" />
                </div>
              </div>
            </div>
            <div className="d-grid">
                <button onClick={handleDonationSubmit} className="btn btn-donate btn-lg">Submit Dontation</button>
            </div>
        </div>
      </div>
    );
  }
  
  export default Step2;
  