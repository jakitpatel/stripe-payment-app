import React from 'react';
import "./Step1.css";
function Step1({ onNext, onRadioChange, selectedAmt, onAmtTypeChange, pmtType, onCustomAmtChange, custAmt }) {
    let donateBtnText = "DONATE - $"+selectedAmt+" ONE TIME";
    return (
    <div id="amountSelection">
        <div className="btn-group mb-3" style={{width:"100%"}} role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="paymentType" id="onetime" autoComplete="off" value="onetime" checked={pmtType === "onetime"}
          onChange={onAmtTypeChange} />
            <label className="btn rdBtn btn-outline-warning btn-lg" htmlFor="onetime">ONE TIME</label>

            <input type="radio" className="btn-check" name="paymentType" id="monthly" autoComplete="off" value="monthly" checked={pmtType === "monthly"}
          onChange={onAmtTypeChange} />
            <label className="btn rdBtn btn-outline-warning btn-lg" htmlFor="monthly">MONTHLY</label>
        </div>
          <div className="row mb-3">
            <div className='col-md-4 d-grid'>
                <input type="radio" className="btn-check" name="amtoptions" id="amount25" autoComplete="off" value="25" checked={selectedAmt === "25"}
          onChange={onRadioChange} />
                <label className="btn rdBtn btn-outline-warning btn-lg" htmlFor="amount25">$25</label>
            </div>
            <div className='col-md-4 d-grid'>
                <input type="radio" className="btn-check" name="amtoptions" id="amount50" autoComplete="off" value="50" checked={selectedAmt === "50"}
          onChange={onRadioChange} />
                <label className="btn rdBtn btn-outline-warning btn-lg" htmlFor="amount50">$50</label>
            </div>
            <div className='col-md-4 d-grid'>
                <input type="radio" className="btn-check" name="amtoptions" id="amount100" autoComplete="off" value="100" checked={selectedAmt === "100"}
          onChange={onRadioChange} />
                <label className="btn rdBtn btn-outline-warning btn-lg" htmlFor="amount100">$100</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className='col-md-4 d-grid'>
                <input type="radio" className="btn-check" name="amtoptions" id="amount250" autoComplete="off" value="250" checked={selectedAmt === "250"}
          onChange={onRadioChange} />
                <label className="btn rdBtn btn-outline-warning btn-lg" htmlFor="amount250">$250</label>
            </div>
            <div className='col-md-4 d-grid'>
                <input type="radio" className="btn-check" name="amtoptions" id="amount500" autoComplete="off" value="500" checked={selectedAmt === "500"}
          onChange={onRadioChange} />
                <label className="btn rdBtn btn-outline-warning btn-lg" htmlFor="amount500">$500</label>
            </div>
            <div className='col-md-4 d-grid'>
                <input type="radio" className="btn-check" name="amtoptions" id="amount1000" autoComplete="off" value="1000" checked={selectedAmt === "1000"}
          onChange={onRadioChange} />
                <label className="btn rdBtn btn-outline-warning btn-lg" htmlFor="amount1000">$1000</label>
            </div>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input type="number" value={custAmt} onFocus={onCustomAmtChange} onChange={onCustomAmtChange} step={0.01} min={1} className="form-control" aria-label="Amount (to the nearest dollar)" placeholder='Enter Custom Amount' />
        </div>
        <div className="d-grid">
          <button onClick={onNext} className="btn btn-donate btn-lg">{donateBtnText}</button>
          </div>
      </div>
    );
  }
  
  export default Step1;
  