import React, { useState, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import VerificarToken from './VerificarToken';
import { SessionContext } from './SessionContext';


const initialState = {
  'matricula':'',
  'password':'',
}
export const FormularioIngreso =  ()=> {
  const [datos, setDatos] = useState(initialState);
  const {matricula, password} = datos;

  const { setLogged } = useContext(SessionContext)


  const handleChange = (e) => {
      setDatos({
        ...datos, [e.target.name]:e.target.value
      })
  }

  const handleSubmit = (e) =>{
     console.log(datos);
    e.preventDefault();
      // const formData = new FormData(); //file-upload --> express
      
      // formData.append("matricula", datos.matricula);
      // formData.append("password", datos.password);

axios.post('http://127.0.0.1:5000/alumnos/acceder',{
  matricula: datos.matricula,
  password: datos.password
})
  .then(function (response) {
    if(response.data.auth){
      localStorage.setItem('token', response.data.resultado);
      
    }
    setDatos(initialState);

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    setLogged(true)
  });
  }



  return(
<Container>
       <Row className='mt-5'>
         <Col></Col>
                <Col>
                <Form onSubmit={ handleSubmit }>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Matricula</Form.Label>
        <Form.Control name='matricula' type="text" placeholder="ingresa matricula" value={matricula} onChange={handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your matricula with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" value={password} onChange={handleChange} />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Ingresar
      </Button>
    </Form>
    </Col>
    <Col></Col>
    </Row>
    <Row>
      <Col>
      <VerificarToken/>
      </Col>
    </Row>
        </Container>

 )
}

 export default FormularioIngreso;
                
           
