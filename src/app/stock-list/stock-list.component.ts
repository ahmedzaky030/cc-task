import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockFinancial, ToggleEvent } from '../quote.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  @Input() stockData: StockFinancial[];
  @Output() OnStockChanged: EventEmitter<ToggleEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onStockChange($event){
    this.OnStockChanged.emit($event);
  }

}
