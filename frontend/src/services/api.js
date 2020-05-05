//provem a conexao com servicos externos

import axios from 'axios';

const api = axios.create({      //recebe a url padrao
    baseURL: 'http://localhost:3333',
})

export default api;
