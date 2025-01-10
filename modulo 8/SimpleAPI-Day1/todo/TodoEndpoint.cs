using Microsoft.AspNetCore.Http.HttpResults;

public static class TodoEndpoints
{

    public static void Map(WebApplication app, List<Todo> todos)
    {

        app.MapGet("/", () => "Bienvenido a mi hola mundo");

        app.MapGet("/todos", () => todos);



        // Uno solo
        app.MapPost("/todos", Results<Created<Todo>, BadRequest> (Todo todo) =>
        {

            if (todo is null || string.IsNullOrWhiteSpace(todo.Titulo))
            {
                return TypedResults.BadRequest();
            }

            int idCount = todos.Any() ? todos.Max(t => t.Id) + 1 : 1;
            todo = todo with { Id = idCount };

            todos.Add(todo);
            return TypedResults.Created("/todos/{id}", todo);

        }).AddEndpointFilter(async (context, next) =>
        {
            var todo = context.GetArgument<Todo>(0);

            var errors = new Dictionary<string, string[]>();

            if (todo.Caducidad < DateTime.Now)
            {
                errors.Add("Caducidad", new[] { "La fecha de caducidad no puede ser menor a la fecha actual" });
            }

            if (todo.Caducidad.Year > 2025)
            {
                errors.Add("Caducidad", new[] { "La fecha de caducidad debe ser en este aÃ±o" });
            }

            if (todo.Completado)
            {
                errors.Add("Completado", new[] { "El campo completado no puede ser verdadero" });
            }

            if (errors.Any())
            {
                return Results.ValidationProblem(errors);
            }

            return await next(context);
        });

        app.MapGet("/todos/{id}", Results<Ok<Todo>, IResult> (int id) =>
        {

            var todo = todos.FirstOrDefault(todo => todo.Id == id);

            if (todo is null)
            {
                return TypedResults.NotFound();
            }
            else if (todo.Id == 0)
            {
                return TypedResults.InternalServerError();
            }
            else
            {
                return TypedResults.Ok(todo);
            }
        });

        // Varios
        app.MapPost("/manytodos", Results<Created<IEnumerable<string>>, BadRequest> (List<Todo> todosMany) =>
        {

            if (todosMany is null || !todosMany.Any())
            {
                return TypedResults.BadRequest();
            }

            foreach (var todo in todosMany)
            {
                int idCount = todos.Any() ? todos.Max(t => t.Id) + 1 : 1;
                todos.Add(new Todo(idCount, todo.Titulo, todo.Caducidad, todo.Completado));
            }

            return TypedResults.Created("/manytodos/{todosMany}", todosMany.Select(t => t.Titulo));

        });


        app.MapPut("/todos/{id}", Results<Ok<Todo>, IResult> (int id, Todo newTodoParam) =>
        {

            var todo = todos.FirstOrDefault(todo => todo.Id == id);

            if (todo is null)
            {
                return TypedResults.NotFound();
            }
            else if (string.IsNullOrEmpty(newTodoParam.Titulo))
            {
                return TypedResults.BadRequest();
            }
            else
            {

                todos.Remove(todo);
                var newTodo = new Todo(id, newTodoParam.Titulo, todo.Caducidad, todo.Completado);
                todos.Add(newTodo);

                return TypedResults.Ok(newTodo);
            }

        });



        app.MapDelete("/todos/{id}", Results<NoContent, NotFound> (int id) =>
        {

            var todo = todos.FirstOrDefault(todo => todo.Id == id);

            if (todo is null)
            {
                return TypedResults.NotFound();
            }

            todos.Remove(todo);
            return TypedResults.NoContent();
            /* en el delete Agregar un endpoint filter si la propiedad completada
            es igual a false no me debe dejar borrar el registro */
        }).AddEndpointFilter(async (context, next) =>
        {
            var id = context.GetArgument<int>(0);
            var todo = todos.FirstOrDefault(todo => todo.Id == id);

            if (todo is null)
            {
                return TypedResults.NotFound();
            }

            if (!todo.Completado)
            {
                return TypedResults.BadRequest(new { Error = "No se puede borrar un registro que no está completado." });
            }

            return await next(context);

        });


    }

}
