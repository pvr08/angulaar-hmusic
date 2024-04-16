import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { CardItemComponent } from './card-item/card-item.component';
import { CardItemGridComponent } from './card-item-grid/card-item-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    CardItemComponent,
    CardItemGridComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
