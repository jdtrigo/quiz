var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name   = (url[6] || null);
var user      = (url[2] || null);
var pwd       = (url[3] || null);
var protocol  = (url[1] || null);
var dialect   = (url[1] || null);
var port      = (url[5] || null);
var host      = (url[4] || null);
var storage   = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD sqlite3 o postgres
var sequelize = new Sequelize(DB_name, user, pwd,
	{
		dialect:  protocol,
		protocol: protocol,
		port:     port,
		host:     host,
		storage:  storage,  // solo SQLite (en .env)
		omitNull: true      // solo para postgres
});


//Importar la definición de la tablas en quiz.js
var Quiz 		= sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; 				// exporta la definición de la tabla Quiz
exports.Comment = Comment;	// exporta la definición de la tabla Comment

// sequelize.sync() crea e inicializa la tabla de preguntas en la DB
sequelize.sync().then(function() {
  Quiz.count().then(function(count) {
      if (count===0) {
        Quiz.create({ pregunta: 'Capital de Alemania',
                      respuesta: 'Berlín',
											tema: 'Geografía'
                    });
				Quiz.create({ pregunta: 'Capital de Inglaterra',
                      respuesta: 'Londres',
											tema: 'Geografía'
                    })
            .then(function(){console.log('Base de datos inicializada')});
      } else {console.log('Base de datos ya existente'); };
  });
});
