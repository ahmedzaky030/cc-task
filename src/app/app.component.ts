import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, interval, of, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { FinanceService } from './finance.service';
import { StockFinancial, ToggleEvent } from './quote.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy{
  title = 'cc-stock';
  activeStockSymbols = ['AAPL', 'TSLA', 'GOOG', 'MSFT']; // Companies Symbols in the stock, ['Apple', 'Tesla','Alphabet','Microsoft'] respectively 
  disabledStockSymbols = [];
  cachedStockData : StockFinancial[] = [];
  stockData: StockFinancial[];
  killTrigger: Subject<boolean> = new Subject();
  constructor(private financeService: FinanceService){}

  ngOnInit(){
    // simulating new prices or data coming from server every 5 seconds instead of websocket
    interval(5000).pipe(takeUntil(this.killTrigger),switchMap(() => this.fetchLatestStockData())).subscribe(result => {
      let improvedResult = result as StockFinancial[];
      improvedResult.forEach(v => v.isActive = true);
      this.stockData = [...improvedResult, ...this.cachedStockData];
    });
  }

  fetchLatestStockData(){
    const requests$ = [];
    this.activeStockSymbols.forEach(v => {v:requests$.push(this.financeService.getFinanceHistory(v))} );
    return forkJoin(
      requests$
    )
  }

  OnStockToggleClicked($event: ToggleEvent){
    if($event.isOpen) { 
      this.activeStockSymbols = [ ...this.activeStockSymbols, $event.symbol];
      this.disabledStockSymbols = this.disabledStockSymbols.filter(v => v !== $event.symbol);
      this.cachedStockData = this.cachedStockData.filter(v => v.symbol !== $event.symbol); 
    } else {
      this.disabledStockSymbols = [ ...this.disabledStockSymbols, $event.symbol];
      this.activeStockSymbols = this.activeStockSymbols.filter(v => v !== $event.symbol);
      this.cachedStockData = [...this.stockData.filter(v => v.symbol === $event.symbol), ...this.cachedStockData];
    }                    
    this.fetchLatestStockData();
  }

  ngOnDestroy(){
    this.killTrigger.next(true);
  }
}


