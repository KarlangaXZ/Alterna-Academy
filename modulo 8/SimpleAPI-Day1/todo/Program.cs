//crea un Builder/extesiion - core de la aplicacion
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);

//Corre la aplicacion (corre el builder)
var app = builder.Build();

var todos = new List<Todo>
{
    new Todo(Id: 1, todo: "Aprender C#"),
    new Todo(Id: 2, todo: "Aprender .NET"),
    new Todo(Id: 3, todo: "Aprender ASP.NET Core")
};

//Get de la data - endpoint
app.MapGet("/", () => "Hello my web app is running");

app.MapGet("/todos", () => todos);

app.MapGet("/todos/{id}",Results<Ok<Todo>, InternalServerError>(int id) =>{

    //FirstOrDefault - busca el primer elemento que cumpla con la condicion
    var todo = todos.FirstOrDefault(todo => todo.Id == id);

    return todo is not null ? TypedResults.Ok(todo) : TypedResults.InternalServerError();
} );


//corre la aplicacion
app.Run();

public record Todo(
    int Id,
    string todo
);