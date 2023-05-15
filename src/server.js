const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const dao = require('./dao.js');

app.all('*', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    next();
});


app.use(express.static('../SistemaVotacion/dist/sistema-votacion/'));
app.use(express.json());

app.get('/student', (req, res) => {
    dao.getStudent(1, '1A', (err, row) => {
        if (err) {
            console.log("dio error");
            res.json(err);
        } else {
            res.json(row);        
        }
    });
});

app.get('/students', (req, res) => {
    // console.log("entro a /students");
    // res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    dao.getStudents((err, rows) => {
        if (err) {
            console.log("dio error");
            console.log(err);
            res.json(err);
        } else {
          //  console.log(rows);
            res.json(rows);        
        }
    });
});

app.get('/section', (req, res) => {
    dao.getSection('1A', (err, row) => {
        if (err) {
            console.log("dio error");
            res.json(err);
        } else {
            res.json(row);        
           // console.log(result);
        }
    });
});

app.get('/sections', (req, res) => {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    dao.getSections((err, rows) => {
        if (err) {
            console.log("dio error");
            res.json(err);
        } else {
            res.json(rows);        
           // console.log(result);
        }
    });
});

app.get('/parties', (req, res) => {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    dao.getParties((err, rows) => {
        if (err) {
            console.log("dio error");
            console.log(err);
            res.json(err);
        } else {
            res.json(rows);        
        }
    });
});

app.get('*', (req, res) => {
    console.log('entro al get');
    //res.send('GET RESPONSE');
    res.sendFile(path.resolve('../SistemaVotacion/dist/sistema-votacion/index.html'))
});

app.get('/favicon', (req, res) => {
    res.sendFile(path.resolve( '../SistemaVotacion/dist/sistema-votacion/favicon.ico'));
});

app.post('/vote', (req, res) => {
    console.log("enytro al post");
    console.log(req.body);
    dao.postVote(req.body, (error) => {
        console.log("despues del postVote");
        console.log(error);
        if (error != null) {
            res.json({"error": error});
        } else {
            res.json({"error": "no hubo error"});
        }
    });
});

app.listen(port, () => {
    console.log(`Listenning on ${port}`);
});