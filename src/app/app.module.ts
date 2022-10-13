import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './layout/home/home.component';
import { McuComponent } from './layout/mcu/mcu.component';

import { RouterModule, Routes } from '@angular/router';
import { OnOffComponent } from './layout/on-off/on-off.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mcu',
    component: McuComponent,
  },
  {
    path: 'onOff/:id',
    component: OnOffComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    McuComponent,
    OnOffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
