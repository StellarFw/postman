# Postman Specification

This is the specification for the Postman package for Stellar. The idea is to create a simple interface for `nodemailer` that allow developers easily send mails for module or application development.

## Configurations

All the configurations are under the `mailer` namespace, so if you want to set any of the specified configurations followed enumerated you needs to add them inside the namespace.

### server

The server object was all the configurations for to connected with the email server via SMTP protocol.

#### server.host

This is the hostname where the email server lives.

#### server.port

Port used by the SMTP service to communicate with the outside world.

#### server.secure

This is used to identify if the connections must be done using a secure connection.


