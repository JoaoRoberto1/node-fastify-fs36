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

// Rota para atualizar um pastel (PATCH)
fastify.patch('/pastel/:id', (request, reply) => {
    const id = parseInt(request.params.id);
    const updates = request.body;

    const pastel = pasteis.find(p => p.id === id);

    if (!pastel) {
        return reply.status(404).send({
            error: 'Not Found',
            message: `Nenhum pastel encontrado com o ID: ${id}`
        });
    }

    // Atualiza apenas os campos fornecidos
    Object.assign(pastel, updates);

    return {
        data: pastel,
        message: `Pastel com ID: ${id} atualizado com sucesso!`
    };
});

// Rota para substituir um pastel (PUT)
fastify.put('/pastel/:id', (request, reply) => {
    const id = parseInt(request.params.id);
    const novoPastel = request.body;

    const index = pasteis.findIndex(p => p.id === id);

    if (index === -1) {
        return reply.status(404).send({
            error: 'Not Found',
            message: `Nenhum pastel encontrado com o ID: ${id}`
        });
    }

    // Substitui o pastel pelo novo
    pasteis[index] = { id, ...novoPastel };

    return {
        data: pasteis[index],
        message: `Pastel com ID: ${id} substituído com sucesso!`
    };
});

// Rota para deletar um pastel (DELETE)
fastify.delete('/pastel/:id', (request, reply) => {
    const id = parseInt(request.params.id);

    const index = pasteis.findIndex(p => p.id === id);

    if (index === -1) {
        return reply.status(404).send({
            error: 'Not Found',
            message: `Nenhum pastel encontrado com o ID: ${id}`
        });
    }

    // Remove o pastel do array
    pasteis.splice(index, 1);

    return reply.status(204).send({
        data: pasteis,
        qtd: pasteis.length,
        message: `Pastel com ID: ${id} deletado com sucesso!`
    });
});


// 3 - Iniciando o servidor
fastify.listen({ port: 3000 });