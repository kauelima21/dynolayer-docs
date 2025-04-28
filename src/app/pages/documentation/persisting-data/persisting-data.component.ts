import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component';

@Component({
  selector: 'app-persisting-data',
  imports: [CodeBlockComponent],
  templateUrl: './persisting-data.component.html',
  styleUrl: './persisting-data.component.css'
})
export class PersistingDataComponent {
  createMethodCode = `
    class User(DynoLayer):
      def __init__(self):
          super().__init__(
              entity="users",
              fillable=["id", "first_name", "last_name"]
          )

    # atributo 'email' será ignorado
    user_input = {"id": 1, "first_name": "John", "last_name": "Doe", "email": "john@mail.com"}
    User.create(user_input)
  `;

  saveMethodCode = `
    user = User()
    user.id = 999 # o id não existe na tabela
    user.first_name = "Jane"

    user.save() # insere o novo item
  `;

  updateExample = `
    user = User()
    user.id = 1 # usuário existente na tabela
    user.first_name = "Jane"

    user.save() # atualiza o campo 'first_name' do registro
  `;
}
