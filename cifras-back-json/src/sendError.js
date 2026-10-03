function sendError(response, statusCode, message) {
  return response.status(statusCode).json({ statusCode, message });
}

module.exports = { sendError };
