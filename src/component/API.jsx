import { useState } from "react";

 function App(){
    const [data , setData] = useState('');

    useEffect ( () =>{
        axios.get('http/abcd')
        .then(response => setData(response.data))
        .catch( error => console.log('error',error))
    },[]);
     

    return(

        <div>
            Json.signify(data)
        </div>
    );
    
 }