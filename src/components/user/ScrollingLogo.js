import React from "react";
import Slider from "react-slick";
import { Image } from "./Image";
import { Container } from "./Container";
import { useNode } from "@craftjs/core";
import {
  ScrollingLogoDefaultProps,
  ScrollingLogoSettings,
} from "../settings/ScrollingLogoSetting";

export default function ScrollingLogo(props) {
  const { slidesToShow, bannerArr, showArrows } = props;

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
    <div className="max-w-sm sm:max-w-xl lg:max-w-6xl mx-auto text-center">
      <Container boxShadow={'none'} ref={(ref) => connect(drag(ref))} canvas>
        <div class="w-full">
          <div
            class=" text-[18px] sm:text-[24px] lg:text-[42px] font-bold leading-[23px] sm:leading-[36px] lg:leading-[52px] text-center mb-[17px] sm:mb-[19px] lg:mb-[20px]"
            id="Headline"
          >
            <h2
              style={{ color: "#000000" }}
              class=" text-[18px] sm:text-[24px] lg:text-[42px] font-bold leading-[23px] sm:leading-[36px] lg:leading-[52px] text-center mb-[17px] sm:mb-[19px] lg:mb-[20px]"
            >
              Shop By Brand
            </h2>
          </div>
        </div>
        <Slider {...settings}>
          {bannerArr &&
            bannerArr.map((banner, index) => (
              <div className="relative" key={banner.image}>
                <Image
                  id={`slide-${index}`}
                  src={banner.image}
                  canvas
                />
                <div class="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {banner.title && <div class="font-bold text-lg">Slider1</div>}
                  {banner.description && (
                    <div class="font-bold text-sm">Description</div>
                  )}
                  {banner.buttonText && <div className="">Slider Button</div>}
                </div>
              </div>
            ))}
        </Slider>
      </Container>
    </div>
  );
}

ScrollingLogo.craft = {
  props: ScrollingLogoDefaultProps,
  related: {
    settings: ScrollingLogoSettings,
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
