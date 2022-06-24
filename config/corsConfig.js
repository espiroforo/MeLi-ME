const corsOptions = {
    origin: ["http://localhost.com", "https://localhost.com"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



module.exports = corsOptions;