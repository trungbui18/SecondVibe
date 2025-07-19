package org.example.secondvibe_backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FilterProductRequest {
    String categoryName;
    int subCategoryId;
    int brandId;
    int conditionId;
    int priceFrom;
    int priceTo;
    String keyword;
    String sizeId;
}
