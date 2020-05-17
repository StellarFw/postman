exports.default = {
  name: "postman.sendMail",
  description: "Send a new email using text or HTML",

  inputs: {
    from: {
      description: "Define the source of the email",
      type: "string",
      default: api => api.config.postman.mail.form,
    },

    to: {
      description: "Define the destine of the email",
      type: "string",
      required: true,
    },

    subject: {
      description: "Define the email subject",
      type: "string",
      required: true,
    },

    body: {
      description: "Email body",
      type: "string",
      required: true,
    },

    format: {
      description: "Format of the data",
      type: "string",
      validator: "in:text,html",
      default: "text"
    }
  },

  async run (api, { params, response }) {
    const contentObject = params['format'] === 'html' ? { html: params['body'] } : { text: params['body'] };

    const configParams = ["form", "to", "subject"];
    let mailObj = configParams.reduce((prev, cur) => ({...prev, [cur]: params[cur]}), {
      ...api.config.postman.mail,
      ...contentObject,
    });

    const info = await api.postman.sendMail(mailObj);
    response.info = info;
  }
}
