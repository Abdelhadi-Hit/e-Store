import { Component, OnInit } from '@angular/core';
import {Product} from '../_model/product.model';
import {NgForm} from '@angular/forms';
import {ProductService} from '../_services/product.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FileHandle} from "../_model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";

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
    productActualPrice: 0,
    productImages: []
  };

  constructor(private productService: ProductService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  addProduct(productForm: NgForm){

    const productFormData = this.prepareFormData(this.product);
    this.productService.addProduct(productFormData).subscribe(
        (response: Product) => {
          productForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
    );

  }

  prepareFormData(product: Product) : FormData{
    const formData = new FormData();
    formData.append(
        'product',
              new Blob([JSON.stringify(product)], {type: 'application/json'})
    );


    for (let i = 0; i < product.productImages.length; i++){
      formData.append(
          'imageFile',
          product.productImages[i].file,
          product.productImages[i].file.name );
    }
    return formData;

  }


  onFileSelected(event){

    if (event.target.files){
      const f = event.target.files[0];

      const fileHandle: FileHandle = {
        file: f,
        url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(f)
        )
      };
      this.product.productImages.push(fileHandle);
    }

  }
  removeImages(index : number){
    this.product.productImages.splice(index , 1);
  }




}
