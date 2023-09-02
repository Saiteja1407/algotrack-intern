import React,{useState} from 'react';
import { Navigate } from "react-router-dom";
import './UpdateSensor.css'

function UpdateSensor(){
    const [inputs,setInputs]=useState({
        warehouseID:"",
        sensorDeviceID:"",
        sensorDeviceName:"",
        deviceUID:"",
        simID:"",
        phoneNumber:"",
        deviceType:"",
        sensorType:"",
        deviceHardwareVersion:"",
        deviceFirmwareVersion:"",
        deviceManufacturer:"",
        simType:"",
        serviceProvider:""
    })
    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    function handleSubmit(e){
        console.log(inputs)
        e.preventDefault();
    }
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
        <div className='update-sensor-wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
            <div className='update-sensor-login shadow'>
            <h2 className='update-sensor-heading mb-3'>Update Sensor</h2>
            <form className='needs validation' noValidate onSubmit={handleSubmit}>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='warehouseID' type="text" className="form-control" id="floatingInput" placeholder="Warehouse ID" value={inputs.warehouseID} required/>
                    <label for="floatingInput">Warehouse ID</label>
                    <div className='invalid-feedback'>Enter the Warehouse ID</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='sensorDeviceID' type="text" className="form-control" id="floatingInput" placeholder="Sensor device ID" value={inputs.sensorDeviceID} required/>
                    <label for="floatingInput">Sensor device ID</label>
                    <div className='invalid-feedback'>Enter the Sensor device ID</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='sensorDeviceName' type="text" className="form-control" id="floatingInput" placeholder="Sensor device name" value={inputs.sensorDeviceName} required/>
                    <label for="floatingInput">Sensor device name</label>
                    <div className='invalid-feedback'>Enter the Sensor device name</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='deviceUID' type="text" className="form-control" id="floatingInput" placeholder="Device UID" value={inputs.deviceUID} required/>
                    <label for="floatingInput">Device UID</label>
                    <div className='invalid-feedback'>Enter the Device UID</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <select onChange={handleChange} name='deviceType' className="form-select" id="validationCustom04" value={inputs.deviceType} required>
                        <option selected disabled value="">Select the Device Type</option>
                        {devicetypeoptions.map(dropDown)}
                    </select>
                    <label for="floatingSelect">Device Type</label>
                    <div className='invalid-feedback'>Select a valid Device Type</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <select onChange={handleChange} name='sensorType' className="form-select" value={inputs.sensorType} required>
                        <option selected disabled value="">Select the Sensor Type</option>
                        {sensortypeoptions.map(dropDown)}
                    </select>
                    <label for="floatingSelect">Sensor Type</label>
                    <div className='invalid-feedback'>Select a valid Sensor Type</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <select onChange={handleChange} name='deviceHardwareVersion' className="form-select" value={inputs.deviceHardwareVersion} required>
                        <option selected disabled value="">Select the Device Hardware version</option>
                        {dhvoptions.map(dropDown)}
                    </select>
                    <label for="floatingSelect">Device Hardware version</label>
                    <div className='invalid-feedback'>Select a valid Device Hardware version</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <select onChange={handleChange} name='deviceFirmwareVersion' className="form-select" value={inputs.deviceFirmwareVersion} required>
                        <option selected disabled value="">Select the Device Firmware version</option>
                        {dfvoptions.map(dropDown)}
                    </select>
                    <label for="floatingSelect">Device Firmware version</label>
                    <div className='invalid-feedback'>Select a valid Device Firmware version</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <select onChange={handleChange} name='deviceManufacturer' className="form-select" value={inputs.deviceManufacturer} required>
                        <option selected disabled value="">Select the Device Manufacturer</option>
                        {devicemanufactureroptions.map(dropDown)}
                    </select>
                    <label for="floatingSelect">Device Manufacturer</label>
                    <div className='invalid-feedback'>Select a valid Device Manufacturer</div>
                </div>

                <h2 className='addsensorheading mb-3'>SIM</h2>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='simID' type="text" className="form-control" id="floatingInput" placeholder="Sim ID" value={inputs.simID} required/>
                    <label for="floatingInput">Sim ID</label>
                    <div className='invalid-feedback'>Enter the Sim ID</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <select onChange={handleChange} name='simType' className="form-select" value={inputs.simType} required>
                        <option selected disabled value="">Select the Sim Type</option>
                        {simtypeoptions.map(dropDown)}
                    </select>
                    <label for="floatingSelect">Sim Type</label>
                    <div className='invalid-feedback'>Select a valid Sim Type</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='phoneNumber' type="number" className="form-control" id="floatingInput" placeholder="XXXXXXXXXX" value={inputs.phoneNumber} required/>
                    <label for="floatingInput">Phone Number</label>
                    <div className='invalid-feedback'>Enter the Phone Number</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <select onChange={handleChange} name='serviceProvider' className="form-select" value={inputs.serviceProvider} required>
                        <option selected disabled value="">Select the Service Provider</option>
                        {serviceprovideroptions.map(dropDown)}
                    </select>
                    <label for="floatingSelect">Service Provider</label>
                    <div className='invalid-feedback'>Select a valid Service Provider</div>
                </div>
                <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Submit</button>
            </form>
            </div>
        </div>
    </div>
}
export default UpdateSensor;