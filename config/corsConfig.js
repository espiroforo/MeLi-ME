const corsOptions = {
    origin: ["http://localhost.com", "https://localhost.com", "*"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



module.exports = corsOptions;