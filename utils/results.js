function successResponse(results) {
  return {
    ok: true,
    message: "Operation successfull!",
    results,
  };
}
function failureResponse(error) {
  return {
    ok: false,
    message: "Operation failed",
    error,
  };
}

module.exports = { successResponse, failureResponse };
