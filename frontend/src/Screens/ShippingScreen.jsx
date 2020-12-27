import React, { useState } from 'react';
import pincodeDirectory from 'india-pincode-lookup';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import FormGroup from '../components/FormGroup';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { saveShippingAddress } from '../actions/cartAction';

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [pinCode, setPinCode] = useState(shippingAddress.pinCode);
    const [state, setState] = useState(shippingAddress.state);
    const [country, setCountry] = useState('INDIA');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const pinCodeHandler = (e) => {
        setPinCode(e.target.value);
        const fetchedAddress = pincodeDirectory.lookup(e.target.value);
        if(fetchedAddress.length !== 0){
            setState(fetchedAddress[0].stateName);
        }
        if((e.target.value).length !== 6 ){
            setMessage('Pin Code should be of six digit long');
        } else if(fetchedAddress.length === 0){
            setMessage('Please enter valid pin code');
        } else {
            setMessage(null);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, pinCode, state, country }));
        history.push('/payment');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup 
                    controlId='address'
                    label='Address'
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <FormGroup 
                    controlId='city'
                    label='City'
                    tyep='text'
                    placeholder='Enter city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <FormGroup 
                    controlId='pinCode'
                    label='Pin Code'
                    type='number'
                    placeholder='Enter six digit area pin code'
                    value={pinCode}
                    onChange={pinCodeHandler}
                />
                {message && <Message variant='danger'>{message}</Message>}
                <FormGroup 
                    controlId='state'
                    label='State'
                    type='text'
                    placeholder='Enter State'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    isDisabled={true}
                />
                <FormGroup 
                    controlId='country'
                    label='Country'
                    type='text'
                    placeholder='Enter Country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    isDisabled={true}
                />
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;
