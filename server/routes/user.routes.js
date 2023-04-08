//! routes file
const User = require("../controllers/user.controller");


module.exports = (app)=>{
    app.get("/api/User",User.getAll)
    app.post("/api/User/Register",User.register)
    app.post("/api/User/Login",User.login)
    app.get("/api/User/loggedUser",User.loggedUser)
    app.get("/api/User/logout",User.logout)
    app.delete("/api/User/delete/:id",User.delete)
}

//! routes file end