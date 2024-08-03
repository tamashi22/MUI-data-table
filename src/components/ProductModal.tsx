import React from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "../types/productTypes";
interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  product,
}) => {
  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 5,
          outline: "none",
          maxWidth: 800,
          width: "400px",
          borderRadius: "20px",
          maxHeight: "80vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Product ${index}`}
                style={{ width: "100%" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Typography variant="h4" sx={{ color: "text.primary" }} gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          Price: ${product.price}
        </Typography>
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          Category: {product.category.name}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ProductModal;
