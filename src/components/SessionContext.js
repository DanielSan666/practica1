import React from 'react'
import axios from 'axios'


export const SessionContext = React.createContext({})



export const SessionProvider = ({children})=> {

    const [user,setUser] = React.useState(null)
    const   [isLogged, setLogged] = React.useState(false)

    React.useEffect(()=> {
       const getUserData = async ()=> {

        const token = localStorage.getItem('token')

        if (token) {
            console.log(token);
         const data = await axios
            .get("http://localhost:5000/alumnos/isAuth", {
              headers: {
                "x-access-token": token,
              },
            })

            if(data)
            setUser(data.data)
            setLogged(true)

        } else {
            console.log("No hay token");
          setUser(null)
          setLogged(false)
        }
       }

       getUserData()

       window.addEventListener('storage',getUserData)


        return ()=> {
            window.removeEventListener('storage', getUserData)
        }
    }
    ,[])


    return <SessionContext.Provider value={{user,isLogged,setLogged,setUser}}>
        {children}
    </SessionContext.Provider>

}

