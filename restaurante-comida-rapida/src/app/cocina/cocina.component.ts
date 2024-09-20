import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService, Pedido } from '../pedido.service';

@Component({
  selector: 'app-cocina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocina.component.html',
  styles: []
})
export class CocinaComponent implements OnInit {
  pedidosPendientes: Pedido[] = [];
  pedidoEnCoccion: Pedido | null = null;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.pedidosPendientes = pedidos.filter(pedido => pedido.estado === 'pendiente');
      this.pedidoEnCoccion = this.pedidoService.getPedidoEnCoccion();
    });
  }

  iniciarCoccion(pedido: Pedido) {
    if (this.pedidoService.iniciarCoccion(pedido.numero)) {
      this.pedidoEnCoccion = pedido;
    }
  }

  finalizarCoccion() {
    this.pedidoService.finalizarCoccion();
    this.pedidoEnCoccion = null;
  }
}
