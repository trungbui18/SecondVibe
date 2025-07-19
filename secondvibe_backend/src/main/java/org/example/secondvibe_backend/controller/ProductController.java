package org.example.secondvibe_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.secondvibe_backend.dto.request.CheckQuantityProductRequest;
import org.example.secondvibe_backend.dto.request.ModerationProductRequest;
import org.example.secondvibe_backend.dto.request.ProductCreateRequest;
import org.example.secondvibe_backend.dto.request.ProductUpdateRequest;
import org.example.secondvibe_backend.dto.request.FilterProductRequest;
import org.example.secondvibe_backend.dto.request.CheckMultiProductQuantityRequest;
import org.example.secondvibe_backend.dto.response.*;
import org.example.secondvibe_backend.entity.enums.ProductStatus;
import org.example.secondvibe_backend.exception.BadRequestException;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.ProductService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/public/get_all_by_idseller/{idSeller}")
    public ApiResponse<List<ProductResponse>> getAll(@PathVariable int idSeller) {
        List<ProductResponse> productResponseList = productService.getAllProductsByIdSeller(idSeller);
        return ApiResponseBuilder.success("Get all products", productResponseList);
    }

    @GetMapping("/client/me")
    public ApiResponse<List<MyProductResponse>> getAllByMe(Authentication authentication) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            int idUser = ((Long)jwt.getClaim("idUser")).intValue();
            List<MyProductResponse> productResponseList = productService.getMyProducts(idUser);
            return ApiResponseBuilder.success("Get all products", productResponseList);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/client/rejected")
    public ApiResponse<List<AllProductRejectedResponse>> getAllProductRejected(Authentication authentication) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            int idUser = ((Long)jwt.getClaim("idUser")).intValue();
            List<AllProductRejectedResponse> productResponseList = productService.getMyProductsRejected(idUser);
            return ApiResponseBuilder.success("Get all products rejected", productResponseList);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/public/get_by_idproduct/{idProduct}")
    public ApiResponse<ProductResponse> getById(@PathVariable int idProduct) {
        ProductResponse productResponse = productService.getProductById(idProduct);
        return ApiResponseBuilder.success("Get product", productResponse);
    }

    @GetMapping("/public/get_all")
    public ApiResponse<List<ProductViewResponse>> getAll() {
        List<ProductViewResponse> productResponseList = productService.getAll();
        return ApiResponseBuilder.success("Get all products", productResponseList);
    }

    @GetMapping("/public/get_all_by_userId/{idUser}")
    public ApiResponse<List<ProductViewResponse>> getAllByUserId(@PathVariable int idUser) {
        List<ProductViewResponse> ds=productService.getProductByIdUser(idUser);
        return ApiResponseBuilder.success("Get all products by user", ds);
    }

    @GetMapping("/admin/count")
    public ApiResponse<Integer> count() {
        int count= productService.countProducts();
        return ApiResponseBuilder.success("Count products", count);
    }

    @GetMapping("/admin/get_all")
    public ApiResponse< List<AllProductAdminResponse>> AllProductInAdmin() {
        List<AllProductAdminResponse> ds= productService.getAllProductInAdmin();
        return ApiResponseBuilder.success("Count products", ds);
    }

    @PutMapping("/admin/moderation_product")
    public ApiResponse<String> moderationProduct(@RequestBody ModerationProductRequest moderationProductRequest) {
        String res=productService.moderationProduct(moderationProductRequest);
        return ApiResponseBuilder.success("Moderation Product", res);
    }

    @PutMapping("/client/delete/{id}")
    public ApiResponse<ProductStatus> deleteProduct(@PathVariable int id) {
        ProductStatus status=productService.deleteProduct(id);
        return ApiResponseBuilder.success("Delete product", status);
    }


    @PostMapping(value="/public/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ProductResponse> createProduct(@RequestParam("product") String jsonProduct,
                                                      @RequestParam List<MultipartFile> images) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ProductCreateRequest productCreateRequest  = mapper.readValue(jsonProduct, ProductCreateRequest.class);
            ProductResponse productResponse = productService.createProduct(productCreateRequest,images);
            return ApiResponseBuilder.success("Create Product Successfully", productResponse);
        } catch (IOException e) {
            e.printStackTrace();
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping("/public/search_key/{key}")
    public ApiResponse<List<String>> searchKeyProduct(@PathVariable String key) {
        List<String> res=productService.searchKeyProduct(key);
        return ApiResponseBuilder.success("Search Product", res);
    }

    @GetMapping("/public/search/{key}")
    public ApiResponse<List<ProductViewResponse>> searchProduct(@PathVariable String key) {
        List<ProductViewResponse> res=productService.searchProduct(key);
        return ApiResponseBuilder.success("Search Product", res);
    }

    @PostMapping("/public/check_quantity")
    public ApiResponse<CheckQuantityProductResponse> checkQuantityProduct(@RequestBody CheckQuantityProductRequest request,Authentication authentication) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            int idUser = ((Long)jwt.getClaim("idUser")).intValue();
            CheckQuantityProductResponse response = productService.checkQuantityProduct(idUser,request);
            return ApiResponseBuilder.success("Check quantity product", response);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/public/check_multi_quantity")
    public ApiResponse<List<String>> checkMultiProductQuantity(@RequestBody CheckMultiProductQuantityRequest request) {
        List<String> notEnough = productService.checkMultiProductQuantity(request.getItems());
        return ApiResponseBuilder.success("Check multi product quantity", notEnough);
    }


    @PutMapping(value="/public/update/{idProductUpdate}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ProductResponse> updateProduct(@PathVariable int idProductUpdate,
                                                      @RequestPart("product") String jsonProduct,
                                                      @RequestPart(value = "imagesUploaded",required = false) List<MultipartFile> imagesUploaded,
                                                      @RequestParam(value = "imagesDeleted",required = false) List<Integer> IdimagesDeleted){
        try {
            if(imagesUploaded==null)
                imagesUploaded=new ArrayList<>();
            if(IdimagesDeleted==null)
                IdimagesDeleted=new ArrayList<>();

            ObjectMapper mapper = new ObjectMapper();
            ProductUpdateRequest productUpdateRequest  = mapper.readValue(jsonProduct, ProductUpdateRequest.class);
            ProductResponse productResponse=productService.updateProduct(idProductUpdate,productUpdateRequest,imagesUploaded,IdimagesDeleted);
            return ApiResponseBuilder.success("Update Product Successfully", productResponse);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BadRequestException(e.getMessage());
        }

    }

    @PostMapping("/public/filter")
    public ApiResponse<List<ProductViewResponse>> filterProducts(@RequestBody FilterProductRequest request) {
        try {
            List<ProductViewResponse> products = productService.filterProducts(request);
            return ApiResponseBuilder.success("Filter products", products);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/public/product_by_brand")
    public ApiResponse<List<ProductViewResponse>> getAllProductByBrands(@Param("brand")String brand) {
        List<ProductViewResponse> ds=productService.getAllProductByBrands(brand);
        return ApiResponseBuilder.success("Get all products by brand", ds);
    }



}
