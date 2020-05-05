import React from 'react';
import App from './App';

//Sempre que quiser injetar uma variavel/funcao do js dentro do html do componente, adiciona {}
function Header(props){
    return(
        <header>
            <h1>{props.title}</h1> 
        </header>
    );
}

export default App;    //tambem pode ser feito 'export default function' ...