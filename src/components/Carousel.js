import React, { Children, useState } from 'react';
import styles from '../styles/carousel.module.css'; // Создайте соответствующий CSS модуль

const Carousel = ({ children, visibleItems = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);
  const totalItems = items.length;

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= totalItems - visibleItems ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalItems - visibleItems : prevIndex - 1
    );
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.carouselButton} onClick={prev}>&lt;</button>
      
      <div className={styles.carouselContent}>
        <div 
          className={styles.carouselItemsWrapper}
          style={{ 
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            width: `${(totalItems / visibleItems) * 100}%`
          }}
        >
          {items.map((child, index) => (
            <div 
              key={index}
              className={styles.carouselItem}
              style={{ width: `${100 / visibleItems}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      
      <button className={styles.carouselButton} onClick={next}>&gt;</button>
    </div>
  );
};

export default Carousel;