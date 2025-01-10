// 1 - Importando o Fastify
import Fastify from 'fastify'
import { pasteis } from './db/db.pasteis.js';

// 1.1 - Instanciando o objeto fastify o qual poderemos acessar os métodos http
const fastify = Fastify({
    logger: true
});

//2 - Declarando a rota
fastify.get('/', (request, reply) => {
    return { message: 'Oi! chamado a partir da raiz!' }
});

fastify.post('/pastel', (request, reply) => {
    const pastel = request.body;

    // Verifica se o pastel com o mesmo id já existe
    const existe = pasteis.find(p => p.id === pastel.id);

    if (existe) {
        return reply.status(409).send({
            message: `O pastel de id: ${pastel.id} já existe`
        });
    }

    // Adiciona o novo pastel ao array
    pasteis.push(pastel);

    // Retorna todos os pastéis e a quantidade
    return {
        data: pasteis,
        qtd: pasteis.length,
        message: 'Pastel adicionado com sucesso!'
    };
});

fastify.get('/pasteis', (request, reply) => {
    return {
        data: pasteis,
        qtd: pasteis.length,
        message: 'Retornou todos os pastéis!'
    }
});

fastify.get('/pastel/:id', (request, reply) => {
    //console.log('Request', request.params.id);
    const id = parseInt(request.params.id);
    const produtosBd = pasteis.find(p => p.id === id);

    return {
        data: produtosBd || null,
        qtd: produtosBd ? 1 : 0,
        message: produtosBd ? `Retornou o pastel com o id: ${id}` : `Não encontrado pastel com o id: ${id}`
    }
})

// 3 - Iniciando o servidor
fastify.listen({ port: 3000 });


/* 4 - Executando o server.js para perceber as mudanças usar a flag --watch
 node --watch -- server.js */


//const { nome, valor, tamanho, viagem, imagem } = request.body;