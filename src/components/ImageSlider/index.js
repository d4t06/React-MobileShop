import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "./ImageSlider.module.scss";

const cx = classNames.bind(styles);

function ImageSlider({ banner, data }) {
  // need to update ui => useState
  const [isDrag, setIsDrag] = useState(false);
  const [curIndex, setCurIndex] = useState(1);
  const [isEnter, setIsEnter] = useState(false);
  const imageSliderRef = useRef();

  const indexRef = useRef(1);
  const scrollRef = useRef(0);
  const prevScrollRef = useRef(0);
  const prevPageXRef = useRef(0);

  useEffect(() => {
    // console.log("set Index useEffect")
    if (curIndex === 1) return;
    scrollRef.current = 0;
    indexRef.current = 1;
    setCurIndex(1);
  }, [data]);

  const imageWidth = banner ? 1100 : 625;
  // phải để sau useEffet vì mỗi khi re-render thì data khong bị thay đổi
  data = data.slice(0, data.length - 5).split("*and*");

  const maxScroll = imageWidth * (data.length - 1);

  useEffect(() => {
    console.log("isEnter = ", isEnter);
    if (isEnter) return;
    const id = setInterval(() => {
      // console.log('useEffect auto slide');
      nextImage();
    }, 10000);

    return () => clearInterval(id);
  }, [isEnter]);

  useEffect(() => {

   //   if  (prevScrollRef.current === scrollRef.current) return
    //  console.log("useEffect fix scroll");
    imageSliderRef.current.scrollLeft = scrollRef.current;

    // cap nhap lại prevScroll -> prev chậm hơn curScroll
    prevScrollRef.current = scrollRef.current;
  }, [scrollRef.current]);

  const handleStartDrag = (e) => {
    e.preventDefault();

    setIsDrag(true);

    prevPageXRef.current = e.pageX;
    imageSliderRef.current.style.scrollBehavior = "auto";
  };

  const fixScroll = () => {
    if (scrollRef.current <= 0) return 0;

    let i = 0;
    while (i < 10) {
      if (
        scrollRef.current >= i * imageWidth &&
        scrollRef.current <= (i + 1) * imageWidth
      ) {
        const distance = scrollRef.current - prevScrollRef.current;

        // nếu điều khiển bằng nút
        if (distance === 0) return scrollRef.current;

        // scroll to the left
        if (distance > 0) {
          if (Math.abs(distance) > imageWidth / 4)
            return imageWidth * (i + 1); // ke tiep
          else return imageWidth * i;
        }
        // scroll to the right
        if (distance < 0) {
          if (Math.abs(distance) > imageWidth / 4)
            return imageWidth * i; // truoc do
          else return imageWidth * (i + 1);
        }
      }

      i++;
    }
  };

  const handleMouseLeave = () => {
    console.log("handleMouseLeave");
    setIsEnter(false);
    if (isDrag) handleStopDrag();
  };

  const handleDrag = (e) => {
    //onMouseMove
    // khi mouseDown mới scroll, nếu mouseMove sẽ không scroll được
    if (!isDrag) return;

    setIsDrag(true);

    const distance = e.pageX - prevPageXRef.current; // khoang cach scroll

    let newScroll = prevScrollRef.current - distance;

    const isInValid = newScroll < 0 || newScroll > maxScroll; // Nếu scroll ở hình đầu và hình cuối

    if (!isInValid) {
      imageSliderRef.current.scrollLeft = newScroll;
      scrollRef.current = newScroll;
    }

    // console.log("e.clientX = ", e.clientX);
    // if (e.clientX >= 1200 || e.clientX <= 100) {
    //   handleMouseLeave(e);
    // }
  };

  const handleStopDrag = () => {
   setIsDrag(false);

    imageSliderRef.current.style.scrollBehavior = "smooth";
   // console.log(prevScrollRef.current, scrollRef.current);


    if (scrollRef.current === prevScrollRef.current) return;
    if (scrollRef.current === 0 || scrollRef.current === maxScroll) return;

    // auto slide
    const fixedNumber = fixScroll();
    scrollRef.current = fixedNumber;

    // update index -> re-render
    indexRef.current = fixedNumber / 1100 + 1;
    setCurIndex(indexRef.current);
    console.log("handleStopDrag", fixedNumber);
  };

  const nextImage = () => {
    if (indexRef.current === data.length) {
      indexRef.current = 1;
      setCurIndex(indexRef.current);
    } else {
      indexRef.current += 1;
      setCurIndex(indexRef.current);
    }

    // auto slide
    const fixedNumber = fixScroll();
    fixedNumber === maxScroll
      ? (scrollRef.current = 0)
      : (scrollRef.current = fixedNumber + imageWidth);
  };

  const previousImage = () => {
    if (indexRef.current === 1) {
      indexRef.current = data.length;
      setCurIndex(indexRef.current);
    } else {
      indexRef.current -= 1;
      setCurIndex(indexRef.current);
    }

    // auto slide
    const fixedNumber = fixScroll();
   fixedNumber === 0
      ? (scrollRef.current = maxScroll)
      : (scrollRef.current = fixedNumber - imageWidth);
  };

  const classes = cx("image-slider", {
    banner,
  });

  console.log("image slider re-render");

  return (
    <div
      className={cx("image-slider-frame")}
      onMouseDown={(e) => handleStartDrag(e)}
      onMouseUp={(e) => handleStopDrag(e)}
      onMouseMove={(e) => handleDrag(e)}
      onMouseEnter={() => setIsEnter(true)}
      onMouseLeave={() => handleMouseLeave()}
    >
      <div className={classes} ref={imageSliderRef}>
        <div
          className={cx("left-arrow", "slider-control")}
          onClick={() => previousImage()}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div
          className={cx("right-arrow", "slider-control")}
          onClick={() => nextImage()}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div className={cx("slider-index")}>
          <span>{curIndex}</span> / <span>{data.length}</span>
        </div>
        {Array.isArray(data) ? (
          data.map((item, index) => {
            return (
              <div key={index} className={cx("slider-item")}>
                <img src={item} alt="" />
              </div>
            );
          })
        ) : (
          <h2>Data is not array</h2>
        )}
      </div>
    </div>
  );
}

export default ImageSlider;
