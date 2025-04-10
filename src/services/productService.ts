import axiosInstance from "@/lib/axiosInstance.ts";
import type {TProductsResponse, FetchProductsParams, TProductResponse, IProduct} from "@/types/product.ts";

export async function fetchProducts(
  props:FetchProductsParams
): Promise<TProductsResponse[]|any> {
  try {
    const response = await axiosInstance.get<TProductsResponse>(
      `products/${props.category ? `/category/${props.category}` : 'search'}`,
      {
        params: {
          skip: props.limit * (props.page - 1),
          limit: props.limit,
          sortBy: props.sortBy,
          order: props.order,
          q: props.search,
          error: null,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      if (!response.data.products || !response.data.total) {
        throw new Error('Invalid response data');
      }else{
        throw response.data;
      }
    }
  } catch (error) {
    return {
      limit: 0,
      skip: 0,
      total: 0,
      products: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function fetchProduct(id:number): Promise<TProductResponse> {
  try {
    const response = await axiosInstance.get<IProduct>(
      `products/${id}`
    );

    if (response.status === 200) {
      return {
        product:response.data,
        success: true,
      };
    } else {
        throw response.data;
    }
  } catch (error) {
    return {
      product: {} as IProduct,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function fetchCategoryList(): Promise<string[]> {
  try {
    const response = await axiosInstance.get<any>(`products/category-list`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw response;
    }
  } catch (error) {
    console.log("ERR:", error);
    return []
  }
}

export async function fetchDeleteProduct(id:number): Promise<any> {
  try {
    const response = await axiosInstance.delete<any>(`products/${id}`
    );
    if (response.status === 200) {
      return {
        success: true,
        message: null,
      };
    } else {
      throw response.data;
    }
  } catch (error:any) {
    return {
      success: false,
      message:  error.response.data.message}
  }
}
