// 1 - Importando o Fastify
import Fastify from 'fastify';

//1.1 - Instanciando o objeto fastify o qual poderemos acessar os métodos http

const fastify = Fastify({
    logger: true
});

// 2 - Declarando a rota
fastify.get('/', (request, reply) => {
    return 'Oi! chamado a partir da raiz!'
});

// 3 - Iniciando o servidor
fastify.listen({ port: 3000 }); 

/*4 - Executando o server.js para perceber as mudanças usar a flag --watch
node -watch --server.js */
