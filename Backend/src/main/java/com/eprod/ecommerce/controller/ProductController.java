package com.eprod.ecommerce.controller;

import com.eprod.ecommerce.entity.Product;
import com.eprod.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/product/add")
    public Product addNewProduct(@RequestBody Product product){
        return productService.addNewProduct(product);

    }
}
