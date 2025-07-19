package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.request.*;
import org.example.secondvibe_backend.dto.response.*;
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
    private final ReservationItemRepository reservationItemRepository;
    private final S3Service s3Service;
    private final ClientRepository clientRepository;
    private final CartDetailRepository cartDetailRepository;
    private final CartRepository cartRepository;
    private final  SizeRepository sizeRepository;
    public ProductService(ProductRepository productRepository, BrandRepository brandRepository,
                          ConditionRepository conditionRepository, SubCategoryRepository subCategoryRepository, ProductImageRepository productImageRepository,
                          ProductMapper productMapper, ProductSizeMapper productSizeMapper, ProductSizeRepository productSizeRepository , ReservationItemRepository reservationItemRepository, S3Service s3Service, ClientRepository clientRepository, CartDetailRepository cartDetailRepository, CartRepository cartRepository, SizeRepository sizeRepository) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.conditionRepository = conditionRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productImageRepository = productImageRepository;
        this.productMapper = productMapper;
        this.productSizeMapper = productSizeMapper;
        this.productSizeRepository = productSizeRepository;
        this.reservationItemRepository = reservationItemRepository;
        this.s3Service = s3Service;
        this.clientRepository = clientRepository;
        this.cartDetailRepository = cartDetailRepository;
        this.cartRepository = cartRepository;
        this.sizeRepository = sizeRepository;
    }

    public int countProducts(){
        int count=productRepository.countByStatus(ProductStatus.APPROVED);
        return count;
    }

    public String moderationProduct(ModerationProductRequest req){
        Product p=productRepository.findById(req.getIdProduct()).orElseThrow(()->new BaseException("Product not found"));
        p.setStatus(req.getStatus());
        p.setRejectionReason(req.getReason());
        String res="Product "+p.getName()+ " was moderated: "+p.getStatus();
        productRepository.save(p);
        return res;
    }

    public List<ProductResponse> getAllProductsByIdSeller(int idSeller) {
        List<Product> products = productRepository.findBySeller_IdAndStatusNot(idSeller, ProductStatus.DELETED);
        return products.stream()
                .map(productMapper::toProductResponse)
                .collect(Collectors.toList());
    }

    public List<AllProductAdminResponse> getAllProductInAdmin(){
        List<Product> products=productRepository.findAll();
        return productMapper.toAllProductAdminResponse(products);
    }

    public List<ProductViewResponse> getProductByIdUser(int id){
        List<Product> products=productRepository.findAllBySellerIdAndStatusNotIn(id,List.of(ProductStatus.DELETED, ProductStatus.REJECTED));
        return productMapper.toProductViewResponses(products);
    }

    public List<MyProductResponse> getMyProducts(int id){
        List<Product> products=productRepository.findAllBySellerIdAndStatusNotIn(id,List.of(ProductStatus.DELETED, ProductStatus.REJECTED));
        List<MyProductResponse>ds=new ArrayList<>();
        for(Product product:products){
            Integer totalQuantity= productSizeRepository.sumQuantity(product.getId());
            int quantity = totalQuantity != null ? totalQuantity : 0;
            MyProductResponse res=productMapper.toMyProductResponse(product);
            res.setQuantity(quantity);
            ds.add(res);
        }
        return ds;
    }

    public List<AllProductRejectedResponse> getMyProductsRejected(int id){
        List<Product> products=productRepository.findByStatus(ProductStatus.REJECTED);
        return productMapper.toAllProductRejectedResponse(products);
    }

    public List<ProductViewResponse> getAll() {
        List<Product> products = productRepository.findAllByStatus(ProductStatus.APPROVED);
        return products.stream()
                .map(productMapper::toProductViewResponse)
                .collect(Collectors.toList());
    }



    public ProductResponse getProductById(int id) {
        Product product = productRepository.findById(id).orElseThrow(()->new BadRequestException("not found product"));
        ProductResponse rs= productMapper.toProductResponse(product);
        return rs;

    }

    public List<String> searchKeyProduct(String key){
        List<Product> products=productRepository.findTop10ByNameContainingIgnoreCaseAndStatus(key, ProductStatus.APPROVED);
        return products.stream().map(Product::getName).toList();
    }

    public List<ProductViewResponse> searchProduct(String key){
        List<Product> products=productRepository.findTop10ByNameContainingIgnoreCaseAndStatus(key, ProductStatus.APPROVED);
        List<ProductViewResponse> res=productMapper.toProductViewResponses(products);
        return res;
    }
    public ProductStatus deleteProduct(int id){
        Product p=productRepository.findById(id).orElseThrow(()->new BaseException("not found product"));
        p.setStatus(ProductStatus.DELETED);
        productRepository.save(p);
        return p.getStatus();
    }


    public ProductResponse createProduct(ProductCreateRequest productCreateRequest, List<MultipartFile> images) throws IOException {
        Product product = productMapper.toProduct(productCreateRequest);
        
        // Map thủ công các entity liên quan để có đầy đủ thông tin
        Brand brand = brandRepository.findById(productCreateRequest.getBrand()).orElseThrow(() -> new BadRequestException("Brand not found"));
        Condition condition = conditionRepository.findById(productCreateRequest.getCondition()).orElseThrow(() -> new BadRequestException("Condition not found"));
        SubCategory subCategory = subCategoryRepository.findById(productCreateRequest.getSubCategory()).orElseThrow(() -> new BadRequestException("SubCategory not found"));
        Client seller = clientRepository.findById(productCreateRequest.getSeller()).orElseThrow(() -> new BadRequestException("Seller not found"));
        
        product.setBrand(brand);
        product.setCondition(condition);
        product.setSubCategory(subCategory);
        product.setSeller(seller);
        
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
        Optional<Product> fullProduct = productRepository.findById(savedProduct.getId());

        return productMapper.toProductResponse(fullProduct.orElse(null));
    }

    public ProductResponse updateProduct(int idProduct, ProductUpdateRequest productUpdateRequest,
                                         List<MultipartFile> images, List<Integer> imagesDeleted) throws IOException {
        Product product = productRepository.findById(idProduct).orElseThrow(()->new BadRequestException("Product not found"));
        Brand brand=brandRepository.findByName(productUpdateRequest.getBrand()).orElseThrow(()->new BadRequestException("Brand not found"));
        Condition condition=conditionRepository.findByDescription(productUpdateRequest.getCondition()).orElseThrow(()->new BadRequestException("Condition not found"));
        SubCategory subCategory=subCategoryRepository.findByName(productUpdateRequest.getSubCategory()).orElseThrow(()->new BadRequestException("SubCategory not found"));

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
                System.out.println(idImageDeleted);
                ProductImage productImage = productImageRepository.findById(idImageDeleted).orElseThrow(() -> new RuntimeException("Product image not found"));
                String fileUrl = productImage.getUrlImage();
                String fileKey = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
                s3Service.deleteFile(fileKey);
                product.getImages().remove(productImage);
                productImageRepository.delete(productImage);
            }
        }
        productRepository.save(product);
        return productMapper.toProductResponse(product);

    }

    public CheckQuantityProductResponse checkQuantityProduct(int idUser,CheckQuantityProductRequest productCheck) {
        ProductSize productSize = productSizeRepository.findByProduct_IdAndAndSize_Id(
                productCheck.getIdProduct(), productCheck.getSizeId()
        ).orElseThrow(() -> new BaseException("Not found size in Product"));

        Integer reserved = reservationItemRepository.getTotalQuantityByProductId(
                productCheck.getIdProduct(), productCheck.getSizeId()
        );

        Cart cart = cartRepository.findByClientId(idUser)
                .orElse(null);

        Product product = productRepository.findById(productCheck.getIdProduct())
                .orElseThrow(() -> new BaseException("Product not found"));

        Size size = sizeRepository.findById(productCheck.getSizeId())
                .orElseThrow(() -> new BaseException("Size not found"));

        CartDetail cartdt = null;
        if (cart != null) {
            cartdt = cartDetailRepository.findByCartAndProductAndSize(cart, product, size);
        }
        int quantityCart = (cartdt != null) ? cartdt.getQuantity() : 0;

        int inventory = productSize.getQuantity();
        int stock = inventory - (reserved != null ? reserved : 0) - quantityCart;

        CheckQuantityProductResponse response = new CheckQuantityProductResponse();
        response.setStock(stock);

        if (productCheck.getQuantity() > stock) {
            response.setMessage("Not enough stock");
            response.setEnough(false);
        } else {
            response.setMessage("Enough stock");
            response.setEnough(true);
        }

        return response;
    }

    public List<String> checkMultiProductQuantity(List<CheckMultiProductQuantityRequest.Item> items) {
        List<String> notEnough = new ArrayList<>();
        for (CheckMultiProductQuantityRequest.Item item : items) {
            ProductSize productSize = productSizeRepository.findByProduct_IdAndAndSize_Id(item.getProductId(), item.getSizeId())
                    .orElse(null);
            if (productSize == null || productSize.getQuantity() < item.getQuantity()) {
                String productName = productSize != null && productSize.getProduct() != null
                        ? (productSize.getProduct().getName()+" Size "+item.getSizeId())
                        : "Unknown Product (ID: " + item.getProductId() + ")";
                notEnough.add(productName);
            }
        }
        return notEnough;
    }

    // API lọc sản phẩm
    public List<ProductViewResponse> filterProducts(FilterProductRequest request) {
        try {
            List<Product> products = productRepository.filterProducts(
                    request.getCategoryName(),
                    request.getSubCategoryId(),
                    request.getBrandId(),
                    request.getConditionId(),
                    request.getPriceFrom(),
                    request.getPriceTo(),
                    request.getKeyword(),
                    request.getSizeId()
            );
            return productMapper.toProductViewResponses(products);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    public List<ProductViewResponse> getAllProductByBrands(String name){
        List<Product> products=productRepository.findByBrand_NameAndStatusNotIn(name,List.of(ProductStatus.REJECTED,ProductStatus.DELETED));
        return productMapper.toProductViewResponses(products);
    }


}
