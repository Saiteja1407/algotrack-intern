import React from 'react';
import { Navigate } from "react-router-dom";
import './AddSensor.css'

function AddSensor(){
    const devicetypeoptions=["one","two","three"];
    const sensortypeoptions=["one","two","three"];
    const dhvoptions=["one","two","three"];
    const dfvoptions=["one","two","three"];
    const devicemanufactureroptions=["one","two","three"];
    const simtypeoptions=["one","two","three"];
    const serviceprovideroptions=["one","two","three"];
    function dropDown(option){
        return <option>{option}</option>
    }
    function handleclick(){
        //Navigate
    }
    return <div>
        <div className='add-sensor-wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
            <div className='add-sensor-login shadow'>
            <h2 className='add-sensor-heading mb-3'>Add Sensor</h2>
            <form className='needs validation' noValidate>
                <div className="form-floating was-validated mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Warehouse ID" required/>
                    <label for="floatingInput">Warehouse ID</label>
                    <div className='invalid-feedback'>Enter the Warehouse ID</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Sensor device ID" required/>
                    <label for="floatingInput">Sensor device ID</label>
                    <div className='invalid-feedback'>Enter the Sensor device ID</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Sensor device name" required/>
                    <label for="floatingInput">Sensor device name</label>
                    <div className='invalid-feedback'>Enter the Sensor device name</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Device UID" required/>
                    <label for="floatingInput">Device UID</label>
                    <div className='invalid-feedback'>Enter the Device UID</div>
                </div>

                <div className="was-validated mb-3">
                    <select className="form-select form-select-lg" id="validationCustom04" required>
                        <option selected disabled value="">Device Type</option>
                        {devicetypeoptions.map(dropDown)}
                    </select>
                    <div className='invalid-feedback'>Select a valid Device Type</div>
                </div>

                <div className="was-validated mb-3">
                    <select className="form-select form-select-lg" required>
                        <option selected disabled value="">Sensor Type</option>
                        {sensortypeoptions.map(dropDown)}
                    </select>
                    <div className='invalid-feedback'>Select a valid Sensor Type</div>
                </div>

                <div className="was-validated mb-3">
                    <select className="form-select form-select-lg" required>
                        <option selected disabled value="">Device Hardware version</option>
                        {dhvoptions.map(dropDown)}
                    </select>
                    <div className='invalid-feedback'>Select a valid Device Hardware version</div>
                </div>

                <div className="was-validated mb-3">
                    <select className="form-select form-select-lg" required>
                        <option selected disabled value="">Device Firmware version</option>
                        {dfvoptions.map(dropDown)}
                    </select>
                    <div className='invalid-feedback'>Select a valid Device Firmware version</div>
                </div>

                <div className="was-validated mb-3">
                    <select className="form-select form-select-lg" required>
                        <option selected disabled value="">Device Manufacturer</option>
                        {devicemanufactureroptions.map(dropDown)}
                    </select>
                    <div className='invalid-feedback'>Select a valid Device Manufacturer</div>
                </div>

                <h2 className='addsensorheading mb-3'>SIM</h2>
                <div className="form-floating was-validated mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Device UID" required/>
                    <label for="floatingInput">Device UID</label>
                    <div className='invalid-feedback'>Enter the Device UID</div>
                </div>

                <div className=" was-validated mb-3">
                    <select className="form-select form-select-lg" required>
                        <option selected disabled value="">Sim Type</option>
                        {simtypeoptions.map(dropDown)}
                    </select>
                    <div className='invalid-feedback'>Select a valid Sim Type</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <input type="number" className="form-control" id="floatingInput" placeholder="XXXXXXXXXX" required/>
                    <label for="floatingInput">Phone Number</label>
                    <div className='invalid-feedback'>Enter the Phone Number</div>
                </div>

                <div className="was-validated mb-3">
                    <select className="form-select form-select-lg" required>
                        <option selected disabled value="">Service Provider</option>
                        {serviceprovideroptions.map(dropDown)}
                    </select>
                    <div className='invalid-feedback'>Select a valid Service Provider</div>
                </div>
                
                <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Submit</button>
            </form>
            </div>
        </div>
    </div>
}
export default AddSensor;