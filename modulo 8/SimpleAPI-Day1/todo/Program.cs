// Crea un Builder/extesion - core de la app 
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Aqui corre el builder
var app = builder.Build();

var todos = new List<Todo> {

};

// Get de la data - endpoint
TodoEndpoints.Map(app, todos);

// Corre tu applicacion
app.Run();

public record Todo (
    int Id,
    string Titulo,
    DateTime Caducidad,
    bool Completado
);