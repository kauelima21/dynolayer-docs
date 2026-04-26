import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component';

@Component({
  selector: 'app-getting-started',
  imports: [CodeBlockComponent, RouterLink],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.css',
})
export class GettingStartedComponent {
  installBasic = `pip install dynolayer`;
  installFull = `pip install dynolayer[full]`;

  configureBasic = `from dynolayer import DynoLayer

DynoLayer.configure(
    region="sa-east-1",
    timestamp_format="iso",
    timestamp_timezone="America/Sao_Paulo",
)`;

  configureLambda = `DynoLayer.configure(timestamp_format="iso")`;

  configureLocalstack = `DynoLayer.configure(
    endpoint_url="http://localhost:4566",
    region="us-east-1",
)`;

  configureProfile = `DynoLayer.configure(profile_name="my-dev-profile")`;

  configureCreds = `DynoLayer.configure(
    aws_access_key_id="AKIAIOSFODNN7EXAMPLE",
    aws_secret_access_key="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    region="us-east-1",
)`;

  modelCode = `from dynolayer import DynoLayer


class User(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="users",                           # Nome da tabela
            required_fields=["email", "name"],        # Campos obrigatórios
            fillable=["id", "email", "name", "role"], # Campos permitidos para mass assignment
            timestamps=True,                          # Gerenciar created_at/updated_at
        )`;

  createCode = `# Usando o método create
user = User.create({
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "role": "admin"
})

# Usando o método save
user = User()
user.id = 1
user.email = "john@example.com"
user.name = "John Doe"
user.role = "admin"
user.save()`;

  autoIdCode = `from dynolayer import DynoLayer


class Product(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="products",
            required_fields=["name"],
            fillable=["id", "name", "price"],
            auto_id="uuid4",  # Gera UUID v4 automaticamente
            partition_key="id",
        )


# ID gerado automaticamente
product = Product.create({"name": "Widget", "price": 29.99})
print(product.id)  # "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"

# Ou forneça manualmente — o auto_id é ignorado
product = Product.create({"id": "custom-id", "name": "Gadget", "price": 49.99})
print(product.id)  # "custom-id"`;

  batchCreateCode = `users = User.batch_create([
    {"id": 1, "email": "john@example.com", "name": "John", "role": "admin"},
    {"id": 2, "email": "jane@example.com", "name": "Jane", "role": "admin"},
])`;

  fetchCode = `# Buscar todos
users = User.all().get()

# Buscar por chave primária
user = User.get_item({"id": 1})

# Buscar ou lançar exceção
user = User.find_or_fail({"id": 1}, "Usuário não encontrado")

# Buscar vários por chave primária (batch)
users = User.batch_find([{"id": 1}, {"id": 2}, {"id": 3}])

# Buscar apenas campos específicos (projeção)
user = User.get_item({"id": 1}, attributes=["name", "email"])

# Query com expression string
admins = (
    User().find("role = :r", r="admin")
    .index("role-index")
    .fetch(True)
)

# Scan geral com find
all_users = User().find().fetch(True)`;

  updateCode = `user = User.get_item({"id": 1})
user.name = "Jane Doe"
user.save()

# Também funciona com sintaxe de dicionário
user["name"] = "Jane Doe"
user.save()`;

  deleteCode = `# Deletar instância
user = User.get_item({"id": 1})
user.destroy()

# Ou deletar por chave
User.delete({"id": 1})

# Deletar em lote
User.batch_destroy([{"id": 1}, {"id": 2}, {"id": 3}])`;
}
