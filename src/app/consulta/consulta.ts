import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from '../cliente';
import { Cliente } from '../cadastro/cliente';

@Component({
  selector: 'app-consulta',
  imports: [MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    MatTableModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta {

  listaClientes: Cliente[] = [];

  constructor(private service: ClienteService) {

  }

  ngOnInit() {
    console.log('Passou por Aqui');
    this.listaClientes = this.service.searchClient('');
    console.log(this.listaClientes);
  }
}
