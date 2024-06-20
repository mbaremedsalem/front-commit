import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageStatistiqueComponent } from './pages/page-statistique/page-statistique.component';
import { PageArticlesComponent } from './pages/articles/page-articles/page-articles.component';
import { TransferComponent } from './pages/transfer/transfer.component';

const routes: Routes = [
  {
    path:'login',
    component:PageLoginComponent
  },
  {
    path:'inscrire',
    component:PageInscriptionComponent
  },
  {
    path:'',
    component:PageDashboardComponent,
    children:[
      {
        path:'statistique',
        component:PageStatistiqueComponent,
      },
      {
        path:'articles',
        component:PageArticlesComponent,
      },
      {
        path:'transfer',
        component:TransferComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
