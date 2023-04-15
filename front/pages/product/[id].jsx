import Image from "next/image";
import React, { useState } from "react";
import style from "./style.module.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();

  return {
    props: {
      products: data,
    },
  };
};

const modal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Item = ({ products }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const buttons = [
    { id: 1, title: "S" },
    { id: 2, title: "M" },
    { id: 3, title: "L" },
    { id: 4, title: "XL" },
  ];

  return (
    <>
      <p className={style.branch}>
        <span>Home /</span> Shop
      </p>
      <div className={style.wrapper}>
        <div className={style.images}>
          <img src={products.image} width={404} height={404} alt="image" />
          <Button onClick={handleOpen}>
            <Image src="/loop.svg" width={30} height={30} alt="loop" />
          </Button>
        </div>
        <div className={style.text}>
          <h2 className={style.name}>{products.title}</h2>
          <div className={style.bottom}>
            <p className={style.price}>${products.price}</p>
            <span className={style.rating}>Рейтинг:{products.rating.rate}</span>
          </div>
          <p className={style.shortTitle}>Short Description:</p>
          <p className={style.shortDesc}>{products.description} </p>
          <p className={style.sizeTitle}>Size:</p>
          <div className={style.size}>
            {buttons.map((button, index) => (
              <button
                className={index === activeIndex ? "activeSize" : ""}
                key={button.id}
                type="button"
                onClick={() => setActiveIndex(index)}
              >
                {button.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box clas sx={modal}>
          <Typography id="modal-modal-description">
            <img
              className={style.popapImg}
              src={products.image}
              width={250}
              height={250}
              alt="image"
            />
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Item;
