import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.css'
})
export class PosComponent {
  nuevoPedido = {
    nombre: '',
    descripcion: '',
    cantidad: 1
  };

  constructor(private pedidoService: PedidoService) {}

  onSubmit() {
    if (this.nuevoPedido.nombre && this.nuevoPedido.descripcion && this.nuevoPedido.cantidad > 0) {
      this.pedidoService.agregarPedido(this.nuevoPedido);
      this.nuevoPedido = { nombre: '', descripcion: '', cantidad: 1 };
    }
  }
}
