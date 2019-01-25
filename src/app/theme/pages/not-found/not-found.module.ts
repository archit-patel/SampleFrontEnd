import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { DefaultComponent } from '../default/default.component';
import { LayoutModule } from '../../layouts/layout.module';

const routes: Routes = [
  {
    'path': '',
    'component': DefaultComponent,
    'children': [
      {
        'path': '',
        'component': NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule,
  ], exports: [
    RouterModule,
  ], declarations: [
    NotFoundComponent,
  ],
})
export class NotFoundModule {
}
