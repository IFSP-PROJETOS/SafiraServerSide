const { createNewLancamento } = require('../services/lancamentoService'); 
const { getLancamentoByUser } = require('../services/lancamentoService'); 
const { deleteNewLancamento } = require('../services/lancamentoService'); 

const teste = async (req, res, next) => {

    console.log("entrou na fun��o");

};

const createLancamento = async (req, res, next) => {

    const { value, tipo_de_transacao, userid, categoriaid, titulo_lancamento, comentario, is_repetitivo, is_parcelado, qtd_parcelas, dia_cobranca} = req.body;

    console.log("Dentro do Controller de createlancamento:" +  value + " | " + 
    tipo_de_transacao + " | " +  userid + " | " +  categoriaid+ " | " +  titulo_lancamento  + " | " +  comentario + " | " + 
    is_repetitivo + " | " +  is_parcelado + " | " +  qtd_parcelas + " | " +  dia_cobranca);

    try {
        await createNewLancamento(value, tipo_de_transacao, userid, categoriaid, titulo_lancamento, comentario,  is_repetitivo, is_parcelado, qtd_parcelas, dia_cobranca);
        res.sendStatus(201);
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ success: false, error: { message: 'Nao foi possivel criar o lancamento' + e.message } });
    }
};


const deleteLancamento = async (req, res, next) => {

    const id = req.params.id;

    try {
        await deleteNewLancamento(id);
        res.status(200).send({ message: "Lancamento deletado"});
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e } });
        console.log(e);
    }
}

const getLancamento = async (req, res, next) => {

    const user_id = req.query.user_id;
    const id = req.query.id;
    const categoria_id = req.query.categorias;
    const status = req.query.status;
    const titulo = req.query.titulo;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    console.log("Dentro do Controller de getlancamento:" + user_id + "-" + id + "-" + status +  "-" + titulo + "-" + start_date + "-" + end_date + "-" + categoria_id);

    try {
        result = await getLancamentoByUser( user_id, id, status, titulo, start_date, end_date, categoria_id)
        console.log('controller:');
        console.log(result);
        res.send(result);
        next();
    }
    catch (e) { 
        console.log(e)
        res.send({
            message:e
         });
    }
};

module.exports = {
    createLancamento,
    getLancamento,
    deleteLancamento,
    teste
}