import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/shared/auth.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';
import { ProductService } from './shared/product.service';

const routes: Routes = [
  {
    path: 'products',
    component: ProductComponent,
    children: [
      { path: '', component: ProductListComponent },
      {
        path: ':productId',
        component: ProductDetailComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductComponent,
  ],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [ProductService],
  bootstrap: [],
})
export class ProductModule {}
