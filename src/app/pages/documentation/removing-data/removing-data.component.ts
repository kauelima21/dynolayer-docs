import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component';

@Component({
  selector: 'app-removing-data',
  imports: [CodeBlockComponent],
  templateUrl: './removing-data.component.html',
  styleUrl: './removing-data.component.css'
})
export class RemovingDataComponent {
  deleteCode = `
    User.destroy({"id": 1}) # removerá o registro de id 1 da tabela

    user = User.find({"id": 1}) # consulta e instância o item
    user.delete() # remove o registro
  `;

}
