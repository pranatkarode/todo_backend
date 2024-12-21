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

function createdResponse(id) {
  return {
    ok: true,
    message: "Record created successfully!",
    id,
  };
}

function updatedResponse() {
  return {
    ok: true,
    message: "Record updated successfully!",
  };
}

function deleteResponse() {
  return {
    ok: true,
    message: "Record delted successfully!",
  };
}

module.exports = {
  successResponse,
  failureResponse,
  createdResponse,
  updatedResponse,
  deleteResponse,
};
