//crea un Builder/extesiion - core de la aplicacion
var builder = WebApplication.CreateBuilder(args);

//Corre la aplicacion (corre el builder)
var app = builder.Build();

//
app.MapGet("/", () => "Hello my web app is running");



app.Run();
