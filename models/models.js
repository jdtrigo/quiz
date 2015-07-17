var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD sqlite3
var sequelize = new Sequelize(null, null, null,
                      {dialect: "sqlite", storage: "quiz.sqlite"}
                    );

//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exporta la definición de la tabla Quiz

// sequelize.sync() crea e inicializa la tabla de preguntas en la DB
sequelize.sync().then(function() {
  Quiz.count().then(function(count) {
      if (count===0) {
        Quiz.create({ pregunta: 'Capital de Portugal',
                      respuesta: 'Lisboa'
                    })
            .then(function(){console.log('Base de datos inicializada')});
      };
  });
});
