import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component';

@Component({
  selector: 'app-retrieving-data',
  imports: [CodeBlockComponent],
  templateUrl: './retrieving-data.component.html',
  styleUrl: './retrieving-data.component.css'
})
export class RetrievingDataComponent {
  allMethodExample = `
    users = User.all()

    print(users) # [{"id": 1, "first_name": "John"}, ...]
  `;

  findMethodExample = `
    user = User.find({"id": 1})

    print(isinstance(user, User)) # True
  `;

  queryBuilder = `
    users = User.where("status", "active").and_where("email", "begins_with", "contact").fetch()

    print(users) # [{"id": 1, "first_name": "John"}, ...]
  `;

  queryBuilderIndex = `
    users = User.where("role", "admin").and_where("email", "begins_with", "contact").index("role-email-index").fetch()

    print(users) # [{"id": 1, "first_name": "John"}, ...]
  `;

}
