import React from "react";
import Slider from "react-slick";
import { Image } from "./Image";
import {
  CarouselDefaultProps,
  CarouselSettings,
} from "../settings/CarouselSettings";
import { Container } from "./Container";
import { Element, useNode } from "@craftjs/core";

export default function SimpleSlider(props) {
  const { slidesToShow, bannerArr,showArrows } = props;

  const {
    connectors: { connect, drag },
  } = useNode();

  var settings = {
    dots: bannerArr.length > 1 && true,
    arrows: bannerArr.length > 1 && showArrows,
    infinite: bannerArr.length > 1 && true,
    speed: 500,
    slidesToShow: +slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Container ref={(ref) => connect(drag(ref))} canvas>
      <Slider {...settings}>
        {bannerArr &&
          bannerArr.map((banner, index) => (
            <Image
              id={`slide-${index}`}
              key={banner.image}
              src={banner.image}
              canvas
            />
          ))}
      </Slider>
    </Container>
  );
}

SimpleSlider.craft = {
  props: CarouselDefaultProps,
  related: {
    settings: CarouselSettings,
  },
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      class="absolute top-1/2 -translate-y-1/2 right-4 z-10 flex items-center"
      style={{ zIndex: "39" }}
    >
      <button
        name="Next"
        class="next-button-hidden bg-light-gray bg-opacity-90 flex justify-center items-center w-[30px] h-[30px] md:h-[50px] md:w-[50px] rounded-md shadow-md focus:outline-none"
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          class="chevron-right w-10 h-10"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      class="absolute top-1/2 -translate-y-1/2 left-4 z-10 flex items-center"
      style={{ zIndex: "39" }}
    >
      <button
        name="Previous"
        class="prev-button-hidden bg-light-gray bg-opacity-90 flex justify-center items-center w-[30px] h-[30px] md:h-[50px] md:w-[50px] rounded-md shadow-md focus:outline-none"
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          class="chevron-left w-10 h-10"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
