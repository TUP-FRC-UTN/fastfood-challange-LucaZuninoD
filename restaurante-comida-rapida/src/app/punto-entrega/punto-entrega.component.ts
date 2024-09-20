import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService, Pedido } from '../pedido.service';

@Component({
  selector: 'app-punto-entrega',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto-entrega.component.html',
  styles: []
})
export class PuntoEntregaComponent implements OnInit {
  pedidosListos: Pedido[] = [];
  pedidosEntregados: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.pedidosListos = pedidos.filter(pedido => pedido.estado === 'listo');
      this.pedidosEntregados = pedidos.filter(pedido => pedido.estado === 'entregado');
    });
  }

  entregarPedido(pedido: Pedido) {
    this.pedidoService.entregarPedido(pedido.numero);
  }
}
