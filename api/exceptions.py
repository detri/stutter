from flask import jsonify

class RequestException(Exception):

  def response(self):
    err_response = jsonify({
      "error": self.args[0]
    })
    err_response.status = "400"
    return err_response

class RegistrationException(RequestException):
  pass

class ThumbException(RequestException):
  pass