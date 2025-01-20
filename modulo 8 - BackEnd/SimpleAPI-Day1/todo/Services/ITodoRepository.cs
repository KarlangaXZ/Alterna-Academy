public interface ITodoRepository {
    List<Todo> GetAll();
    Todo Get(int id);
    List<Todo> Search(string searchSting);
    Todo Create(Todo todo);
    List<Todo> CreateMany(List<Todo> todos);
    Todo Update(int id, Todo newTodo);
    bool Delete(int id);
}