import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component';

@Component({
  selector: 'app-query-builder',
  imports: [CodeBlockComponent],
  templateUrl: './query-builder.component.html',
})
export class QueryBuilderComponent {
  findBasic = `# Scan geral (todos os registros)
users = User().find().fetch(True)

# Query por partition key
users = User().find("role = :r", r="admin").index("role-index").fetch(True)

# Múltiplas condições
users = User().find(
    "role = :r AND status = :s",
    r="admin", s="active"
).index("role-index").fetch(True)`;

  findExamples = `# Between
orders = Order().find(
    "created_at between :start and :end",
    start="2024-01-01", end="2024-12-31"
).fetch(True)

# Exists / Not exists (sem placeholder)
users = User().find("email exists").fetch(True)
users = User().find("phone not_exists").fetch(True)

# Combinação complexa
addresses = Address().find(
    "user_id = :uid AND email exists AND NOT status = :s",
    uid="123", s="deleted"
).index("user-index").limit(50).fetch(True)

# Com paginação
page1 = User().find("role = :r", r="admin").index("role-index").limit(10).fetch()
last_key = User().last_evaluated_key

page2 = User().find("role = :r", r="admin").index("role-index").limit(10).offset(last_key).fetch()`;

  whereSimple = `# Single condition
users = User.where("role", "admin").get()

# With comparison operators
users = User.where("age", ">", 18).get()`;

  whereAnd = `users = (
    User.where("role", "admin")
    .and_where("status", "active")
    .and_where("age", ">=", 18)
    .get()
)`;

  whereOr = `users = (
    User.where("role", "admin")
    .or_where("role", "moderator")
    .get()
)`;

  whereNot = `# Exclude specific values
users = User.where_not("status", "banned").get()

# Combine with OR
users = (
    User.where("role", "admin")
    .or_where_not("status", "pending")
    .get()
)`;

  whereBetween = `from datetime import datetime, timedelta, timezone

yesterday = int((datetime.now(timezone.utc) - timedelta(days=1)).timestamp())
today = int(datetime.now(timezone.utc).timestamp())

users = (
    User.where("role", "admin")
    .where_between("created_at", yesterday, today)
    .get()
)`;

  whereIn = `users = (
    User.where("role", "admin")
    .where_in("status", ["active", "pending", "trial"])
    .get()
)`;

  whereString = `# Begins with
users = (
    User.where("role", "admin")
    .and_where("email", "begins_with", "john")
    .get()
)

# Contains
users = User.where("name", "contains", "Smith").get()`;

  indexes = `# Query usando GSI
users = (
    User.where("role", "admin")
    .index("role-index")
    .get()
)

# Composite index (GSI com partition + sort key)
users = (
    User.where("role", "admin")
    .and_where("email", "begins_with", "john")
    .index("role-email-index")
    .get()
)`;

  limits = `# Apenas 10 registros
users = User.where("role", "admin").limit(10).get()

# Combinado com outras condições
users = (
    User.where("status", "active")
    .and_where("role", "admin")
    .limit(50)
    .get()
)`;

  projection = `# Atributo único
emails = User.all().attributes_to_get("email").get()

# Múltiplos atributos
users = User.all().attributes_to_get(["id", "email", "name"]).get()`;

  forceScan = `# Force scan (útil para OR ou filtros sem chave)
users = (
    User.where("age", ">", 18)
    .or_where("status", "premium")
    .force_scan()
    .get()
)`;

  getFetch = `users = User.where("role", "admin").get()
# Idêntico a
users = User.where("role", "admin").fetch()`;

  pagination = `# Pegar todos os resultados de todas as páginas
all_users = User.where("role", "admin").get(all=True, paginate=True)`;

  completeExample = `from datetime import datetime, timedelta, timezone


class User(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="users",
            required_fields=["email"],
            fillable=["id", "email", "name", "role", "status", "created_at"],
            timestamps=True,
            partition_key="id",
        )


# Query complexa
yesterday = int((datetime.now(timezone.utc) - timedelta(days=1)).timestamp())
today = int(datetime.now(timezone.utc).timestamp())

active_admins = (
    User.where("role", "admin")
    .and_where("status", "active")
    .where_between("created_at", yesterday, today)
    .where_not("email", "contains", "test")
    .index("role-index")
    .limit(100)
    .attributes_to_get(["id", "email", "name"])
    .get()
)

print(f"Found {active_admins.count()} active admins")`;
}
