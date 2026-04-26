import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component';

@Component({
  selector: 'app-advanced',
  imports: [CodeBlockComponent],
  templateUrl: './advanced.component.html',
})
export class AdvancedComponent {
  configLambda = `from dynolayer import DynoLayer

DynoLayer.configure(
    timestamp_format="iso",
    timestamp_timezone="America/Sao_Paulo",
)`;

  configLocal = `DynoLayer.configure(
    endpoint_url="http://localhost:4566",
    region="us-east-1",
)`;

  configProfile = `DynoLayer.configure(profile_name="my-dev-profile")`;

  configCreds = `DynoLayer.configure(
    aws_access_key_id="AKIAIOSFODNN7EXAMPLE",
    aws_secret_access_key="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    region="us-east-1",
)`;

  configRetry = `DynoLayer.configure(
    retry_max_attempts=5,       # Padrão: 3
    retry_mode="adaptive",      # "standard" ou "adaptive" (padrão)
)`;

  tsEnable = `class User(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="users",
            required_fields=["email"],
            fillable=["id", "email", "name"],
            timestamps=True,
            partition_key="id",
        )`;

  tsConfigGlobal = `DynoLayer.configure(timestamp_format="numeric")`;

  tsOverride = `class Metrics(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="metrics",
            fillable=["id", "value", "metric_name"],
            timestamps=True,
            timestamp_format="numeric",  # Apenas este model usa numeric
            partition_key="id",
        )

class Logs(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="logs",
            fillable=["id", "message", "level"],
            timestamps=True,
            partition_key="id",
            # Usa o formato global (padrão: "iso")
        )`;

  tsExamples = `# Com timestamp_format="iso" (padrão)
log = Logs.create({
    "id": 1,
    "message": "User logged in",
    "level": "info"
})
print(log.created_at)  # "2026-04-05T14:30:00-03:00"
print(log.updated_at)  # "2026-04-05T14:30:00-03:00"

# Com timestamp_format="numeric"
metric = Metrics.create({
    "id": 1,
    "metric_name": "requests",
    "value": 100
})
print(metric.created_at)  # 1735132800`;

  tsTimezone = `# Via configuração
DynoLayer.configure(timestamp_timezone="UTC")

# Ou via env var
# export TIMESTAMP_TIMEZONE=UTC`;

  autoIdUuid = `class Product(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="products",
            required_fields=["name"],
            fillable=["id", "name", "price"],
            auto_id="uuid4",
            partition_key="id",
        )


product = Product.create({"name": "Widget"})
print(product.id)  # "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"`;

  autoIdUuidShort = `class Product(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="products",
            fillable=["id", "name"],
            auto_id="uuid4",
            auto_id_length=16,  # 16 caracteres hex
            partition_key="id",
        )


product = Product.create({"name": "Widget"})
print(product.id)  # "a1b2c3d4e5f64a7b"`;

  autoIdNumericTable = `Table name: dynolayer_sequences  (ou nome customizado)
Partition key: entity (String)`;

  autoIdNumericUse = `class Order(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="orders",
            required_fields=["total"],
            fillable=["id", "total", "status"],
            auto_id="numeric",
            partition_key="id",
        )


order1 = Order.create({"total": 100, "status": "pending"})
order2 = Order.create({"total": 200, "status": "pending"})
print(order1.id)  # 1
print(order2.id)  # 2`;

  autoIdCustomTable = `class Order(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="orders",
            fillable=["id", "total"],
            auto_id="numeric",
            auto_id_table="my_sequences",  # Override por model
            partition_key="id",
        )`;

  autoIdGlobalTable = `DynoLayer.configure(auto_id_table="my_sequences")`;

  batchCreate = `users = User.batch_create([
    {"id": 1, "email": "john@example.com", "name": "John", "role": "admin"},
    {"id": 2, "email": "jane@example.com", "name": "Jane", "role": "admin"},
    {"id": 3, "email": "bob@example.com", "name": "Bob", "role": "common"},
])

# Retorna lista de instâncias do model
for user in users:
    print(f"{user.name} criado com sucesso")`;

  batchFind = `users = User.batch_find([{"id": 1}, {"id": 2}, {"id": 3}])

# Retorna Collection
for user in users:
    print(user.name)

emails = users.pluck("email")`;

  batchDestroy = `User.batch_destroy([{"id": 1}, {"id": 2}, {"id": 3}])`;

  createVsSave = `# create() — PutItem: sempre substitui o item inteiro
user = User.create({"id": 1, "email": "john@example.com", "name": "John"})

# save() — UpdateItem: atualiza apenas os campos definidos
user = User()
user.id = 1
user.email = "john@example.com"
user.save()  # Cria se não existe, atualiza se existe`;

  createUnique = `from dynolayer.exceptions import ConditionalCheckException

try:
    user = User.create({"id": 1, "email": "john@example.com", "name": "John"}, unique=True)
except ConditionalCheckException:
    print("Registro com id=1 já existe!")`;

  saveCondition = `from boto3.dynamodb.conditions import Attr

user = User.find({"id": 1})
user.name = "Jane"

# Só atualiza se o role for "admin"
user.save(condition=Attr("role").eq("admin"))`;

  transactWrite = `from dynolayer import DynoLayer

DynoLayer.transact_write([
    User.prepare_put({"id": 1, "email": "john@example.com", "name": "John"}),
    Order.prepare_put({"id": 100, "user_id": 1, "total": 50}),
    CartItem.prepare_delete({"id": 1}),
])`;

  transactRead = `results = DynoLayer.transact_get([
    (User, {"id": 1}),
    (Order, {"id": 100}),
])

user = results[0]   # Instância de User (ou None)
order = results[1]  # Instância de Order (ou None)`;

  pagAuto = `# Buscar todos os registros de todas as páginas
all_users = User.all().get(all=True, paginate=True)`;

  pagManual = `limit = 50
user = User()

# Contar total (otimizado — não carrega dados na memória)
total_count = user.all().count()

# Construir query
query = user.all().limit(limit)

# Aplicar offset se fornecido pelo cliente
last_evaluated_key = request.get('last_evaluated_key')
if last_evaluated_key:
    query = query.offset(last_evaluated_key)

# Executar query (all=True → Collection, sem seguir páginas)
results = query.fetch(all=True)

# Dados de paginação
results_count = user.get_count()
next_key = user.last_evaluated_key()

# Construir resposta da API
response = {
    'total_count': total_count,
    'results': results.to_list(),
    'results_count': results_count,
    'last_evaluated_key': next_key
}`;

  countOpt = `# Contar todos os registros
total = User.all().count()

# Contar com filtro
admins = User.where("role", "admin").index("role-index").count()`;

  overrideValidation = `from dynolayer import DynoLayer


class User(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="users",
            required_fields=["email"],
            fillable=["id", "email", "name"],
            partition_key="id",
        )

    def save(self):
        # Validação customizada antes de salvar
        if not self._is_valid_email(self.email):
            return False

        # Chamar o save do pai
        return super().save()

    def _is_valid_email(self, email):
        return "@" in email and "." in email`;

  overrideBusiness = `class Order(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="orders",
            required_fields=["user_id", "total"],
            fillable=["id", "user_id", "items", "total", "status"],
            timestamps=True,
            partition_key="id",
        )

    def save(self):
        # Auto-calcular total
        if hasattr(self, 'items') and self.items:
            self.total = sum(item['price'] * item['quantity'] for item in self.items)

        # Status padrão
        if not hasattr(self, 'status'):
            self.status = "pending"

        return super().save()

    def mark_as_paid(self):
        self.status = "paid"
        return self.save()`;

  fillableExample = `class User(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="users",
            required_fields=["email"],
            fillable=["id", "email", "name"],
            partition_key="id",
        )


user = User.create({
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "is_admin": True  # IGNORADO (não está em fillable)
})

print(hasattr(user, 'is_admin'))  # False`;

  nestedObjects = `user = User.create({
    "id": 1,
    "email": "john@example.com",
    "profile": {
        "age": 30,
        "city": "São Paulo",
        "preferences": {
            "theme": "dark",
            "language": "pt-BR"
        }
    }
})

print(user.profile)`;

  lists = `user = User.create({
    "id": 1,
    "email": "john@example.com",
    "phones": ["11 91234-5678", "11 95678-1234"],
    "tags": ["premium", "verified"]
})`;

  decimal = `product = Product.create({
    "id": 1,
    "name": "Widget",
    "price": 29.99  # Convertido automaticamente para Decimal
})`;

  lambdaKeys = `# partition_key="id" é o padrão — não precisa declarar
class User(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="users",
            fillable=["id", "email", "name"],
        )

# Para tabelas com partition key diferente, declare explicitamente
class Event(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="events",
            fillable=["user_id", "timestamp", "type", "payload"],
            partition_key="user_id",
            sort_key="timestamp",
        )`;

  projectionFind = `user = User.find({"id": 1}, attributes=["name", "email"])`;

  streamCode = `# Ruim — carrega todos em memória
all_users = User.all().get(all=True, paginate=True)

# Bom — processa um por um, página por página
for user in User.all().stream():
    process(user)

# Também funciona com filtros
for user in User.where("role", "admin").index("role-index").stream():
    send_notification(user)`;

  dictAccess = `user = User.find({"id": 1})

# Acesso seguro — nunca colide com métodos
user["data"]           # → valor do campo "data"
user["save"]           # → valor do campo "save"

# Atribuição
user["name"] = "Ana"   # Equivalente a user.name = "Ana"

# Verificar existência
if "email" in user:
    print(user["email"])

# Deletar campo
del user["role"]`;

  raiseEnable = `class User(DynoLayer):
    raise_on_error = True

    def __init__(self):
        super().__init__(
            entity="users",
            required_fields=["email", "name"],
            fillable=["id", "email", "name", "role"],
            partition_key="id",
        )`;

  failClass = `# Usando como class method
user = User.get_item({})
if user is None:
    error = User.fail()
    print(f"Erro: {error}")  # Ex: ValidationException

# Usando como instance method
user = User()
user.email = "invalid"
result = user.save()
if result is False:
    error = user.fail()
    print(f"Erro: {error}")`;

  silentPipeline = `for data in batch:
    result = User.create(data)
    if result is None:
        logger.warning(f"Falha ao criar usuário: {User.fail()}")
        continue
    process(result)`;
}
