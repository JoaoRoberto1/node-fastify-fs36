// 1 - Importando o Fastify
import Fastify from 'fastify';
import { pasteis } from './db/db.pasteis.js';

// 1.1 - Instanciando o objeto fastify
const fastify = Fastify({
    logger: true
});

// 2 - Declarando as rotas

// Rota raiz
fastify.get('/', (request, reply) => {
    return { message: 'Oi! chamado a partir da raiz!' };
});

// Rota para adicionar um pastel
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

// Rota para retornar todos os pasteis
fastify.get('/pasteis', (request, reply) => {
    return {
        data: pasteis,
        qtd: pasteis.length,
        message: 'Retornou todos os pastéis!'
    };
});

// Rota para retornar um pastel pelo ID
fastify.get('/pastel/:id', (request, reply) => {
    const id = parseInt(request.params.id);
    const pastel = pasteis.find(p => p.id === id);

    if (!pastel) {
        // Tratamento para ID não encontrado
        return reply.status(404).send({
            error: 'Not Found',
            message: `Nenhum pastel encontrado com o ID: ${id}`
        });
    }

    return {
        data: pastel,
        message: `Retornou o pastel com o ID: ${id}`
    };
});

// 3 - Iniciando o servidor
fastify.listen({ port: 3000 });
