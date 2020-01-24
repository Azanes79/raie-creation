import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ScheduleModule, AgendaService, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { NgModule } from '@angular/core';
 
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ScheduleModule, MaterialModule, BrowserAnimationsModule, HttpClientModule
],
providers: [AgendaService, DayService, WeekService, WorkWeekService, MonthService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
