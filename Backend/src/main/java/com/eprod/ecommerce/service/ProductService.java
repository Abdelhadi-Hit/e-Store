package com.eprod.ecommerce.service;


import com.eprod.ecommerce.dao.ProductDao;
import com.eprod.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    public Product addNewProduct(Product product){
       return productDao.save(product);
    }
}
