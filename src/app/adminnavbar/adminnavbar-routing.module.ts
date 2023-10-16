import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageplansComponent } from './manageplans/manageplans.component';
import { NewrequestComponent } from './newrequest/newrequest.component';
import { RechargesComponent } from './recharges/recharges.component';
import { AdminnavbarComponent } from './adminnavbar.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{
  path:'adminhome',
  component:HomeadminComponent},{
  path:'manageplans',
  component:ManageplansComponent
},{
  path:'newrequest',
  component:NewrequestComponent
},
{
  path:'recharges',
  component:RechargesComponent
},

  { path: 'create-plan', component: CreateComponent },
  { path: 'edit-plan/:id', component: EditComponent },
  {
    path:'viewplan',component:ManageplansComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminnavbarRoutingModule { }
