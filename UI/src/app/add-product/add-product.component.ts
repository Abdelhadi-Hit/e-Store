import { Component, OnInit } from '@angular/core';
import {Product} from '../_model/product.model';
import {NgForm} from '@angular/forms';
import {ProductService} from '../_services/product.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = {
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  addProduct(productForm: NgForm){
    this.productService.addProduct(this.product).subscribe(
        (response: Product) => {
          console.log(response);
          productForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
    );

  }

}
