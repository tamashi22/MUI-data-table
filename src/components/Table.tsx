import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridFilterModel,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import ProductModal from "./ProductModal";
import ImageModal from "./ImageModal";
import { getProducts } from "../services/GetProducts";
import { Product } from "../types/productTypes";
export default function Table() {
  const [products, setProducts] = useState<Product[]>([]);

  const [openImage, setImageOpen] = useState<boolean>(false);
  const [openProduct, setProductOpen] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const defaultImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnqtyfyQjLYxWFNbOSJotEgzxNvTg3dxACOg&s";
  const columns: GridColDef[] = [
    {
      field: "images",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        const images = params.value;
        return (
          <img
            src={images[0] || defaultImg}
            alt="product"
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            onClick={() => {
              setSelectedImage(images[0]);
              setImageOpen(true);
            }}
          />
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      renderCell: (params) => (
        <span style={{ fontWeight: "bold", color: "#1976d1" }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      renderCell: (params) => (
        <span style={{ fontStyle: "italic", color: "#555" }}>
          {params.value}
        </span>
      ),
    },
    { field: "price", headerName: "Price", type: "number", width: 150 },
    {
      field: "creationAt",
      headerName: "Created At",
      width: 100,
      valueGetter: (params) => dayjs(params.value).format("YYYY-MM-DD"),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 100,
      valueGetter: (params) => dayjs(params.value).format("YYYY-MM-DD"),
    },
    {
      field: "category",
      headerName: "Category",
      width: 120,
      renderCell: (params) => (
        <span style={{ fontWeight: "bold", color: "#00FF00" }}>
          {params.row.category.name}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => {
            setSelectedProduct(params.row);
            setProductOpen(true);
          }}
        >
          View Product
        </Button>
      ),
    },
  ];

  const handleImageModalClose = () => {
    setImageOpen(false);
  };
  const handleProductModalClose = () => {
    setProductOpen(false);
  };

  const handleSortModelChange = (model: GridSortModel) => {
    setSortModel(model);
    localStorage.setItem("sortModel", JSON.stringify(model));
  };

  const handleFilterModelChange = (model: GridFilterModel) => {
    setFilterModel(model);
    localStorage.setItem("filterModel", JSON.stringify(model));
  };
  useEffect(() => {
    const savedSortModel = localStorage.getItem("sortModel");
    const savedFilterModel = localStorage.getItem("filterModel");

    if (savedSortModel) {
      setSortModel(JSON.parse(savedSortModel));
    }
    if (savedFilterModel) {
      setFilterModel(JSON.parse(savedFilterModel));
    }
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        p: 10,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <DataGrid
        rowHeight={150}
        rows={products}
        columns={columns}
        sortModel={sortModel}
        filterModel={filterModel}
        onSortModelChange={handleSortModelChange}
        onFilterModelChange={handleFilterModelChange}
      />
      <ImageModal
        open={openImage}
        onClose={handleImageModalClose}
        imageUrl={selectedImage}
      />
      <ProductModal
        open={openProduct}
        onClose={handleProductModalClose}
        product={selectedProduct}
      />
    </Box>
  );
}
