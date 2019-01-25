import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { IndexModule } from './pages/index/index.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: ThemeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "index",
        loadChildren: () => IndexModule,
      },
      {
        path: "user",
        loadChildren: () => UserModule,
      },
      {
        path: "roles",
        loadChildren: () => RoleModule,
      },
      {
        path: "404",
        loadChildren: () => NotFoundModule,
      },
      {
        path: "",
        "redirectTo": "index",
        "pathMatch": "full"
      }
    ]
  },
  {
    path: "**",
    "redirectTo": "404",
    "pathMatch": "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
