import graphene
from graphene_django import DjangoObjectType

from user.models import User
from todo.models import Todo, Project


class UsersType(DjangoObjectType):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = "__all__"


class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)
    user_todos_by_id = graphene.List(TodoType, id=graphene.Int(required=True))

    def resolve_user_todos_by_id(self, info, id):
        todos = Todo.objects.all()
        try:
            return todos.filter(user_owner__id=id)
        except Todo.DoesNotExist:
            return None
    """
      {
        userTodosById(id: 1){
          text
          userOwner {
            username
          }
          project {
            title
            repositoryUrl
          }
        }
      }
    """

    def resolve_all_todos(self, info):
        return Todo.objects.all()
    """
      {
        allTodos {
          id
          project {
            title
            repositoryUrl
            users {
              username
              email
            }
          }
          text
          createdDatetime
        }
      }
    """


schema = graphene.Schema(query=Query)
