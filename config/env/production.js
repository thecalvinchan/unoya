module.exports = {
    db: process.env.MONGOHQ_URL,
    app: {
        name: "Unoya - Let us think beautifully"
    },
    facebook: {
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        clientID: process.env.TWT_CLIENT_ID,
        clientSecret: process.env.TWT_CLIENT_SECRET,
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
