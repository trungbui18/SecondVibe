package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.request.CheckQuantityProductRequest;
import org.example.secondvibe_backend.dto.request.ProductCreateRequest;
import org.example.secondvibe_backend.dto.request.ProductUpdateRequest;
import org.example.secondvibe_backend.dto.response.CheckQuantityProductResponse;
import org.example.secondvibe_backend.dto.response.ProductInProfile;
import org.example.secondvibe_backend.dto.response.ProductResponse;
import org.example.secondvibe_backend.entity.*;
import org.example.secondvibe_backend.entity.enums.ProductStatus;
import org.example.secondvibe_backend.exception.BadRequestException;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.mapper.ProductMapper;
import org.example.secondvibe_backend.mapper.ProductSizeMapper;
import org.example.secondvibe_backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final ConditionRepository conditionRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductMapper productMapper;
    private final ProductSizeMapper productSizeMapper;
    private final ProductSizeRepository productSizeRepository;
    private final ReservationRepository reservationRepository;
    private final S3Service s3Service;

    public ProductService(ProductRepository productRepository, BrandRepository brandRepository,
                          ConditionRepository conditionRepository, SubCategoryRepository subCategoryRepository, ProductImageRepository productImageRepository,
                          ProductMapper productMapper, ProductSizeMapper productSizeMapper, ProductSizeRepository productSizeRepository, ReservationRepository reservationRepository, S3Service s3Service) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.conditionRepository = conditionRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productImageRepository = productImageRepository;
        this.productMapper = productMapper;
        this.productSizeMapper = productSizeMapper;
        this.productSizeRepository = productSizeRepository;
        this.reservationRepository = reservationRepository;
        this.s3Service = s3Service;
    }

    public List<ProductResponse> getAllProductsByIdSeller(int idSeller) {
        List<Product> products = productRepository.findBySeller_IdAndStatusNot(idSeller, ProductStatus.DELETED);
        return products.stream()
                .map(productMapper::toProductResponse)
                .collect(Collectors.toList());
    }

    public List<ProductInProfile> getProductByIdUser(int id){
        List<Product> products=productRepository.findAllBySellerId(id).orElseThrow(()->new BaseException("Khong co san pham"));
        List<ProductInProfile> productInProfiles=products.stream().map(productMapper::toProductInProfile).toList();
        return productInProfiles;
    }

    public List<ProductResponse> getAll() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productMapper::toProductResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(int id) {
        Product product = productRepository.findById(id).orElseThrow(()->new BadRequestException("not found product"));
        return productMapper.toProductResponse(product);

    }


    public ProductResponse createProduct(ProductCreateRequest productCreateRequest, List<MultipartFile> images) throws IOException {
        Product product = productMapper.toProduct(productCreateRequest);
        List<ProductImage> Saved=new ArrayList<>();
        for (ProductSize ps : product.getProductSizes()) {
            ps.setProduct(product);
        }
        for(MultipartFile image:images){
            ProductImage productImage=new ProductImage();
            String urlImage=s3Service.uploadFile(image);
            productImage.setUrlImage(urlImage);
            productImage.setProduct(product);
            Saved.add(productImage);
        }
        product.setImages(Saved);
        Product savedProduct = productRepository.save(product);
        Optional<Product> fullProduct = productRepository.findWithAllDetailsById(savedProduct.getId());

        return productMapper.toProductResponse(fullProduct.orElse(null));
    }

    public ProductResponse updateProduct(int idProduct, ProductUpdateRequest productUpdateRequest,
                                         List<MultipartFile> images, List<Integer> imagesDeleted) throws IOException {
        Product product = productRepository.findById(idProduct).orElseThrow(()->new BadRequestException("Product not found"));
        Brand brand=brandRepository.findById(productUpdateRequest.getBrand()).orElseThrow(()->new BadRequestException("Brand not found"));
        Condition condition=conditionRepository.findById(productUpdateRequest.getCondition()).orElseThrow(()->new BadRequestException("Condition not found"));
        SubCategory subCategory=subCategoryRepository.findById(productUpdateRequest.getSubCategory()).orElseThrow(()->new BadRequestException("SubCategory not found"));

        product.setName(productUpdateRequest.getName());
        product.setDescription(productUpdateRequest.getDescription());
        product.setPrice(productUpdateRequest.getPrice());
        product.setStatus(productUpdateRequest.getStatus());
        product.setProductSizes(product.getProductSizes());
        product.setBrand(brand);
        product.setCondition(condition);
        product.setSubCategory(subCategory);

// Xóa toàn bộ productSizes cũ khỏi DB (vì orphanRemoval = true)
        product.getProductSizes().clear();

// Tạo list mới
        List<ProductSize> updatedSizes = productSizeMapper.toEntityList(productUpdateRequest.getProductSizes());
        List<ProductSize> newProductSize = new ArrayList<>();

        for (ProductSize size : updatedSizes) {
            ProductSize ps = new ProductSize();
            ps.setProduct(product);
            ps.setQuantity(size.getQuantity());
            ps.setSize(size.getSize());
            newProductSize.add(ps);
        }

// Gán lại list mới
        product.getProductSizes().addAll(newProductSize);


        for(MultipartFile image:images){
            ProductImage productImage=new ProductImage();
            String urlImage=s3Service.uploadFile(image);
            productImage.setUrlImage(urlImage);
            productImage.setProduct(product);
            if (product.getImages() == null) {
                product.setImages(new ArrayList<>());
            }
            product.getImages().add(productImage);

        }

        if(imagesDeleted!=null){
            for(Integer idImageDeleted: imagesDeleted){
                ProductImage productImage = productImageRepository.findById(idImageDeleted).orElseThrow(() -> new RuntimeException("Product image not found"));
                String fileUrl = productImage.getUrlImage();
                String fileKey = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
                s3Service.deleteFile(fileKey);
                productImageRepository.delete(productImage);
            }
        }
        productRepository.save(product);
        return productMapper.toProductResponse(product);

    }

//    public CheckQuantityProductResponse checkQuantityProduct(CheckQuantityProductRequest productCheck) {
//        ProductSize productSize=productSizeRepository.findByProduct_IdAndAndSize_Id(productCheck.getIdProduct(),productCheck.getSizeId()).orElseThrow(()->new BaseException("Not found size in Product"));
//        int reserved=reservationRepository.getTotalQuantityByProductId(productCheck.getIdProduct(),productCheck.getSizeId());
//        int inventory=productSize.getQuantity();
//        int stock=inventory-reserved;
//        CheckQuantityProductResponse response=new CheckQuantityProductResponse();
//        response.setStock(stock);
//        if(productCheck.getQuantity()>stock){
//            response.setMessage("Not enough stock");
//            response.setEnough(false);
//        }else{
//            response.setMessage(" Enough stock");
//            response.setEnough(true);
//        }
//        return response;
//
//    }


}
