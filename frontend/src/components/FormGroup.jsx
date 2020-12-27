import React from 'react';
import { Form } from 'react-bootstrap';

const FormGroup = ({controlId, label, type, placeholder, value, onChange, isDisabled}) => {
    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                disabled={isDisabled}
            ></Form.Control>
        </Form.Group>
    )
}

FormGroup.defaultProps = {isDisabled: false}

export default FormGroup;

