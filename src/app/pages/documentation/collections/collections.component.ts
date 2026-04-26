import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component';

@Component({
  selector: 'app-collections',
  imports: [CodeBlockComponent],
  templateUrl: './collections.component.html',
})
export class CollectionsComponent {
  whatIs = `users = User.where("role", "admin").get()
# users é uma instância de Collection`;

  iterating = `users = User.all().get()

for user in users:
    print(f"{user.name} - {user.email}")`;

  first = `users = User.where("role", "admin").get()
admin = users.first()

if admin:
    print(admin.name)`;

  count = `users = User.where("role", "admin").get()
print(f"Found {users.count()} admins")`;

  lenCode = `users = User.all().get()
print(f"Total users: {len(users)}")`;

  pluck = `users = User.all().get()

# Pegar todos os emails como lista
emails = users.pluck("email")
# ["john@example.com", "jane@example.com", ...]

# Pegar todos os IDs
ids = users.pluck("id")
# [1, 2, 3, ...]`;

  pluckMissing = `users = User.all().get()
roles = users.pluck("role")
# ["admin", None, "moderator", ...]`;

  toList = `users = User.where("role", "admin").get()
data = users.to_list()

# [
#     {"id": 1, "name": "John", "email": "john@example.com", "role": "admin"},
#     {"id": 2, "name": "Jane", "email": "jane@example.com", "role": "admin"},
# ]`;

  toListJson = `import json

users = User.all().get()
json_data = json.dumps(users.to_list())`;

  individual = `users = User.where("role", "admin").get()

for user in users:
    # Acessar atributos diretamente
    print(user.id)
    print(user.name)
    print(user.email)

    # Pegar dados como dict
    user_data = user.data()

    # Modificar e salvar
    user.status = "verified"
    user.save()`;

  exExist = `users = User.where("email", "contains", "@example.com").get()

if users.count() > 0:
    print(f"Found {users.count()} users with @example.com emails")
else:
    print("No users found")`;

  exFirstDefault = `admin = User.where("role", "admin").get().first()

if admin is None:
    print("No admin found")
else:
    print(f"Admin: {admin.name}")`;

  exExtract = `# Pegar todos os emails de admin
admins = User.where("role", "admin").get()
admin_emails = admins.pluck("email")

# Enviar notificação para todos os admins
for email in admin_emails:
    send_notification(email)`;

  exTransform = `users = User.where("status", "active").get()

# Construir dicionário lookup
user_lookup = {user.id: user.name for user in users}

# Ou criar um summary
summary = [
    {"id": user.id, "email": user.email}
    for user in users
]`;

  exCombine = `from datetime import datetime, timedelta, timezone

yesterday = int((datetime.now(timezone.utc) - timedelta(days=1)).timestamp())
today = int(datetime.now(timezone.utc).timestamp())

recent_users = (
    User.where_between("created_at", yesterday, today)
    .limit(10)
    .get()
)

response = {
    "count": recent_users.count(),
    "users": recent_users.to_list()
}`;

  empty = `users = User.where("role", "nonexistent").get()

users.first()      # None
users.count()      # 0
len(users)         # 0
users.pluck("id")  # []
users.to_list()    # []

for user in users: # Loop não executa
    print(user)`;
}
