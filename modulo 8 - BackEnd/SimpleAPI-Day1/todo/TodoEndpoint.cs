using Microsoft.AspNetCore.Http.HttpResults;

public static class TodoEndpoints
{

    public static void Map(WebApplication app, ITodoRepository todoRepository)
    {

        app.MapGet("/", () => "Bienvenido a mi hola mundo");

        app.MapGet("/todos", () => todoRepository.GetAll());



        // Uno solo
        app.MapPost("/todos", Results<Created<Todo>, BadRequest> (Todo todo) =>
        {

            try
            {
                var newTodo = todoRepository.Create(todo);
                return TypedResults.Created("/todos/{id}", newTodo);
            }
            catch (Exception)
            {
                return TypedResults.BadRequest();
            }


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

            var todo = todoRepository.Get(id);

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
            try
            {
                var todos = todoRepository.CreateMany(todosMany);
                return TypedResults.Created("/manytodos/{todosMany}", todos.Select(t => t.Titulo));
            }

            catch (Exception)
            {

                return TypedResults.BadRequest();
            }

        });


        app.MapPut("/todos/{id}", Results<Ok<Todo>, IResult> (int id, Todo newTodoParam) =>
        {

            var todo = todoRepository.Update(id, newTodoParam);

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
                return TypedResults.Ok(todo);
            }

        });



        app.MapDelete("/todos/{id}", Results<NoContent, NotFound> (int id) =>
        {

            var isDeleted = todoRepository.Delete(id);

            if (!isDeleted)
            {
                return TypedResults.NotFound();
            }

            return TypedResults.NoContent();

            /* en el delete Agregar un endpoint filter si la propiedad completada
            es igual a false no me debe dejar borrar el registro */

        }).AddEndpointFilter(async (context, next) =>
        {
            var id = context.GetArgument<int>(0);
            var todo = todoRepository.GetAll().FirstOrDefault(todo => todo.Id == id);

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
