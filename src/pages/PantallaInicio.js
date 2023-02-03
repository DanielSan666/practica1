import React from 'react'
import BarraSuperior  from './../components/BarraSuperior'
import { useContext,useState } from 'react'
import { SessionContext } from '../components/SessionContext'
import { Button } from 'react-bootstrap'
import axios from 'axios'


 const PaginaPrincipal = ()=> {

    const [photo,setPhoto] = useState()

    const {user,setUser} = useContext(SessionContext)


    const handleFileUpload = async()=> {

        const formData = new FormData()

        formData.append("avatar", photo);

       const data = await axios.put(`http://localhost:5000/alumnos/${user.idAlumno}/photo`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        alert(data.data.message)
        setUser(prev=>({...prev,avatar:data.data.fileName}))
        
    }

    const handleFileSelect =(e)=> {
        const files = e.target.files
        setPhoto(files[0])
    }

    
return <>
    <BarraSuperior/>
    <div>
        <h3>Hola, {user.nombre ?? "JOHN DOE"}</h3>
    </div>
    <br/>
    <br/>
    
    {!!user.avatar ?  <img src={`http://localhost:5000/alumnos/avatar/${user?.avatar}`} style={{
        height: '200px',
        width: '200px'
    }} alt='avatar'></img> : null}
    <div >
        <h4>{!!user.avatar? "Actualiza tu fotografia": "Sube una foto de avatar"}</h4>
        <br/>
    <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg" onChange={handleFileSelect}/>
    </div>
    <br/>
    <br/>
    <Button variant="primary" onClick={handleFileUpload}>Subir foto</Button>
</>

}


export default PaginaPrincipal
