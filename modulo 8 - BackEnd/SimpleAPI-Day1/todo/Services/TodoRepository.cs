
public class TodoRepository : ITodoRepository
{
    List<Todo> _todos = new();
    public Todo Create(Todo todo)
    {
        if (todo is null || string.IsNullOrWhiteSpace(todo.Titulo))
        {
            throw new Exception("The todos is Empty or the todos has not title");
        }

        int idCount = _todos.Any() ? _todos.Max(t => t.Id) + 1 : 1;
        todo = todo with { Id = idCount };

        _todos.Add(todo);
        return todo;
    }

    public List<Todo> CreateMany(List<Todo> todos)
    {
        var newTodos = new List<Todo>();

        if (todos is null || !todos.Any())
        {
            throw new Exception("No todos in the collections.");
        }

        foreach (var todo in todos)
        {
            int idCount = todos.Any() ? todos.Max(t => t.Id) + 1 : 1;
            var newTodo = new Todo(idCount, todo.Titulo, todo.Caducidad, todo.Completado);
            newTodos.Add(newTodo);
            _todos.Add(newTodo);
        }
        return newTodos;
    }

    public bool Delete(int id)
    {
       var todo = _todos.FirstOrDefault(todo => todo.Id == id);

       if (todo is null)
        {
            return false;
        }
         _todos.Remove(todo);
         return true;
    }

    public Todo Get(int id)
    {
        return _todos.FirstOrDefault(todo => todo.Id == id);

    }

    public List<Todo> Search(string searchSting){
        return _todos.Where(t=> t.Titulo.Contains(searchSting)).ToList();
    }
    public List<Todo> GetAll()
    {
        return _todos;
    }

    public Todo Update(int id, Todo updatedTodo)
    {
        var todo = _todos.FirstOrDefault(todo => todo.Id == id);

        if (todo is null)
        {
            return null;
        }

        _todos.Remove(todo);
        var newTodo = new Todo(id, updatedTodo.Titulo, updatedTodo.Caducidad, updatedTodo.Completado);
        _todos.Add(newTodo);
        return newTodo;
    }
}