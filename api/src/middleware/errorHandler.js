function errorHandler(err, req, res, next) {
  console.error('Error:', err); // ne pas logger de secrets

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.publicMessage || 'Erreur serveur',
  });
}

module.exports = errorHandler;
