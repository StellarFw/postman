let api = null;

/**
 * All data associated with the Postman instance.
 */
let postman = {
  transport: null
};

const getNodemailer = () => require("nodemailer");

/**
 * Initialize a new Postman transport.
 */
const initTransport = () => {
  const nodemailer = getNodemailer();
  const serverConfig = api.config.postman.server;
  const newTransport = nodemailer.createTransport(serverConfig)

  postman = {
    ...postman,
    transport: newTransport
  }
}

/**
 * Send a new email.
 * 
 * @param {object} data Data that composes a email
 */
const sendMail = data => postman.transport.sendMail(data)

const fnsToExport = {
  initTransport,
  sendMail,
};

exports.default = class {
  load(_api, next) {
    api = _api;
    next();
  }

  start(_, next) {
    if (api.config.postman.enabled === false) {
      return next()
    }

    api.postman = fnsToExport;

    // Initialize the Postman transport protocol.
    initTransport()

    next();
  }
}
