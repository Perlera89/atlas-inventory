export const LIST = {
  params: {
    select: 'code,stock,purshes_price,sale_price,minimun_price,IVA,is_on_sale,is_deleted',
    populate: 'product_info:name-thumbnail-description-safety_info-minimun_stock-product_type.brand;id-name-color/category;id-name-color/area;id-name-color/tag_details;is_deleted*tags!id-name-color'
  }
}

export const CREATE = {
  data: {
    code: 999999,
    stock: 23,
    minimun_stock: 23,
    purshes_price: 23,
    sale_price: 23,
    minimun_price: 23,
    IVA: 23,
    is_on_sale: true,
    is_deleted: false,
    product_info: 1

  }
}

export const UPDATE = {
  data: {
    code: 998899,
    stock: 23,
    minimun_stock: 23,
    purshes_price: 343445,
    sale_price: 23,
    minimun_price: 23,
    IVA: 23,
    is_on_sale: true,
    is_deleted: false,
    product_info: 1

  }
}
