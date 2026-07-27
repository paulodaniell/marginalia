const AppError = require('../utils/AppError');

function errorHandler(error, req, res, next) {
    console.error("Erro capturado pelo Handler:", error);

    
    if (error instanceof AppError) {
        return res.status(error.status).json({
            status: "error",
            erro: error.message
        });
    }

    
    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            status: "error",
            erro: "Este registro (e-mail ou dado único) já está cadastrado."
        });
    }

    
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: "error",
            erro: "Token inválido."
        });
    }

    
    return res.status(500).json({
        status: "error",
        erro: "Erro interno no servidor. Tente novamente mais tarde."
    });
}

module.exports = errorHandler;