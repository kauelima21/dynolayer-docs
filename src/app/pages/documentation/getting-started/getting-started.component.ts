import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component';

@Component({
  selector: 'app-getting-started',
  imports: [CodeBlockComponent],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.css'
})
export class GettingStartedComponent {
  modelCode = `class User(DynoLayer):
    def __init__(self):
        super().__init__(
            entity="users",
            required_fields=["first_name", "email", "role"],
            fillable=["id", "first_name", "last_name", "email"],
            timestamps=True
        )`;

}
