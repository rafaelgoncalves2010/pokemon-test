import React, {useState, useEffect} from 'react';
import api from '../../../../service/api';

import './style.scss';

function Forms(props) {
    const [forms,setForms] = useState([]);
    const [load, setload] = useState(false);

    useEffect(() => {
        if(!load){
            
          const url = props.url.substr(26,props.url.length);

          api.get(url).then(res => {
                const response = res.data.forms_names;
                if(response > 0){
                    setForms(response);
                }
                setload(true);
            });

        }
    },[load, props.url])

  return (
    <>
       {load ? (
         <h5 className="forms-item">
            {forms.length > 0 ? (  
                <>               
                    { forms.map(element => 
                        <span> {element} </span> 
                    )} 
                </>        
                ):(
                    <span> Form names está vazio.</span>
                )} 
         </h5>
       ):(
           <p>Carregando...</p>
       )}
    </>
  );
}

export default Forms;