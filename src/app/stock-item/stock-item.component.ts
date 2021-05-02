import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StockFinancial, ToggleEvent } from '../quote.model';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
  @Input() stockDetails: StockFinancial;
  @Output() OnToggleClicked: EventEmitter<ToggleEvent> = new EventEmitter();
  @Input() isActive: boolean = true;
  constructor() { }
  
  ngOnInit(): void {
  }

  toggleChange(change: MatSlideToggleChange){
    this.OnToggleClicked.emit({symbol: this.stockDetails.symbol, isOpen:change.checked})
  }

}
