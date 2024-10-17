const express = require('express');
const app = express();

app.use(express.json());

const students = [
    {id: 1, name:'Linares', age: 25, isPaid: false, numeroCedula: '123-553412-0'},
    {id: 2, name:'Cleyrol', age: 29, isPaid: false, numeroCedula: '154-567812-2'},
    {id: 3, name:'Pichardo', age: 24, isPaid: false, numeroCedula: '001-513112-1'},
    {id: 4, name:'Minaya', age: 20, isPaid: false, numeroCedula: '333-098412-4'}
];

app.get('/',(req,res) => {
    res.send ('node js api')
});

app.get('/api/students',(req,res) =>{
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(x=> x.id === parseInt(req.params.id));
    if(!student) return res.status(204).render(`No existe el estudiante ${req.params.id} solicitado`)
        else(res.send(student)); //(res.send(req));
});

app.post('/api/students/', (req, res) =>{
    
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        isPaid: req.body.isPaid,
        numeroCedula: req.body.numeroCedula
    };

    students.push(student);

    //res.status(201).render('Se a creado correctamente el estudiante')

    res.status(201).send('Estudiante agregado')

});

app.delete('/api/students/:id', (req, res) =>{
    const student = students.find((x) => x.id === parseInt(req.params.id));
    if(!student){
        return res
        .status(204)
        .render(`No existe el estudiante: ${req.params.id} Solicitud`)
    }

    const index = student.indexOf(student);

    student.splice(index, 1)

    res.send(student);

});

const port = process.env.port || 5000;

app.listen(port, ()=> console.log (`Estoy arriba port: ${port}....`))