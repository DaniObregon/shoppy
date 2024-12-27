/**
 * Retarda la ejecución durante un tiempo especificado.
 * @param {number} ms - Milisegundos a esperar.
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = { delay };
