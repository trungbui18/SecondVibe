package org.example.secondvibe_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.secondvibe_backend.dto.request.CheckQuantityProductRequest;
import org.example.secondvibe_backend.dto.request.ProductCreateRequest;
import org.example.secondvibe_backend.dto.request.ProductUpdateRequest;
import org.example.secondvibe_backend.dto.response.CheckQuantityProductResponse;
import org.example.secondvibe_backend.dto.response.ProductInProfile;
import org.example.secondvibe_backend.dto.response.ProductResponse;
import org.example.secondvibe_backend.exception.BadRequestException;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.ProductService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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

    @GetMapping("/get_all_by_idseller/{idSeller}")
    public ApiResponse<List<ProductResponse>> getAll(@PathVariable int idSeller) {
        List<ProductResponse> productResponseList = productService.getAllProductsByIdSeller(idSeller);
        return ApiResponseBuilder.success("Get all products", productResponseList);
    }

    @GetMapping("/get_by_idproduct/{idProduct}")
    public ApiResponse<ProductResponse> getById(@PathVariable int idProduct) {
        ProductResponse productResponse = productService.getProductById(idProduct);
        return ApiResponseBuilder.success("Get product", productResponse);
    }

    @GetMapping("/get_all")
    public ApiResponse<List<ProductResponse>> getAll() {
        List<ProductResponse> productResponseList = productService.getAll();
        return ApiResponseBuilder.success("Get all products", productResponseList);
    }

    @GetMapping("/get_all_by_userId/{idUser}")
    public ApiResponse<List<ProductInProfile>> getAllByUserId(@PathVariable int idUser) {
        List<ProductInProfile> ds=productService.getProductByIdUser(idUser);
        return ApiResponseBuilder.success("Get all products by user", ds);
    }

//    @PostMapping("/check")
//    public ApiResponse<CheckQuantityProductResponse> check(@RequestBody CheckQuantityProductRequest request) {
//        CheckQuantityProductResponse response=productService.checkQuantityProduct(request);
//        return ApiResponseBuilder.success("Check product", response);
//    }

    @PostMapping(value="/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ProductResponse> createProduct(@RequestParam("product") String jsonProduct,
                                                      @RequestParam List<MultipartFile> images) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ProductCreateRequest productCreateRequest  = mapper.readValue(jsonProduct, ProductCreateRequest.class);
            ProductResponse productResponse = productService.createProduct(productCreateRequest,images);
            return ApiResponseBuilder.success("Create Product Successfully", productResponse);
        } catch (IOException e) {
            throw new BadRequestException(e.getMessage());
        }
    }

//    @PreAuthorize("has_authoried and authentication.principal.idUser(au.principal)")
    @PutMapping(value="/update/{idProductUpdate}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ProductResponse> updateProduct(@PathVariable int idProductUpdate,
                                                      Authentication au,
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

}
