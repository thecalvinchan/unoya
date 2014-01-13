module.exports = {
    db: "mongodb://localhost/unoya-dev",
    app: {
        name: "Unoya - Let us Live Beautifully"
    },
    facebook: {
        clientID: "519672091465468",
        clientSecret: "b2c026fd306843d06d8c8686aced65a0",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }
}
