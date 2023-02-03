import {Col, Container, Row} from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function FormularioSuscripcion() {
    const initialState = {
        'matricula':'',
        'nombre':'',
        'tipo':'',
        'password':'',
    }

    const [datos, setDatos] = useState(initialState);
    const { matricula, nombre, tipo, password } = datos;

    function handleChange(e) {
        setDatos({
            ...datos, [e.target.name]:e.target.value
        })

    }
    const handleSubmit = (e) =>{
      e.preventDefault();
      const formData = new FormData(); //file-upload --> express
      
      formData.append("matricula", datos.matricula);
      formData.append("nombre", datos.nombre);
      formData.append("tipo", datos.tipo);
      formData.append("password", datos.password);

axios.post('http://127.0.0.1:5000/alumnos/agregar',formData)
  .then(function (response) {
    // handle success
    setDatos(initialState);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });


    }
    
  return (
    <Container>
        <Row>
            <Col></Col>
            <Col>
            <Form onSubmit={ handleSubmit }>
      <Form.Group className="mb-3" controlId="matricula">
        <Form.Label>Matricula</Form.Label>
        <Form.Control type="text" placeholder="Ingresa Matricula" name="matricula" 
        value={matricula}
        onChange = {handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingresa nombre" name="nombre" 
        value={nombre}
        onChange = {handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="tipo">
        <Form.Label>Tipo</Form.Label>
        <Form.Control type="text" placeholder="Ingresa tipo usuario" name="tipo" 
        value={tipo}
        onChange = {handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" 
        value={password}
        onChange = {handleChange}/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
            </Col>
            <Col></Col>
        </Row>
    </Container>
    
  );
}

export default FormularioSuscripcion;