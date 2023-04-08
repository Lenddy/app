const person = require("../controllers/Person.controller")


module.exports = (app)=>{
    app.get("/api/People",person.getAll)
    app.get("/api/People/:id",person.getOne)
    app.post("/api/People/new",person.addOne)
    app.put("/api/People/update/:id",person.updateOne)
    app.delete("/api/People/delete/:id",person.deleteOne)
    app.get("/api/People/Full/Name/:PersonFullName",person.getByFullName)
}