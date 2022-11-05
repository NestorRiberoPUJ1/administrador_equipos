const Player = require("../models/player.model");


//Controlador para crear objetos en la colección
module.exports.create_player = (req, res) => {
    Player.create(req.body)
        .then(player => res.json(player))
        .catch(err => res.status(400).json(err));
}

//Controlador para traer todas las instacias de una colección, se usa para Listar
module.exports.get_all = (req, res) => {
    Player.find()
        .then(players => res.json(players))
        .catch(err => res.status(404).json({ message: "Error" + err }));
}

//Obtener un solo objeto de la colección basado en la condición,se usa para detallar
module.exports.get_player = (req, res) => {
    Player.findOne({ _id: req.params.id })
        .then(player => res.json(player))
        .catch(err => res.status(404).json({ message: "Error" + err }));
}

//Actualizar un objeto en especifico
module.exports.update_player = (req, res) => {
    Player.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(player => res.json(player))
        .catch(err => res.status(400).json(err));
}

//Borrar un objeto en específico
module.exports.delete_player = (req, res) => {
    Player.deleteOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => res.status(400).json({ message: "Error" + err }));
}

