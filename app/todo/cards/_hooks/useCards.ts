import { useCallback, useEffect, useRef, useState } from "react";

type UseCardsProps = {
  cardCount: number;
  maxCardsOnOneSide?: number;
};

type CardStyle = {
  transform: string;
  zIndex: number;
  opacity: number;
};

export const useCards = ({
  cardCount,
  maxCardsOnOneSide = 5,
}: UseCardsProps) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  // 현재 떠 있는 카드의 순서
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 스크롤 핸들러
  const handleScroll = useCallback(() => {
    if (!scrollableRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollableRef.current;
    // 스크롤 진행도를 0~1로 정규화
    const newScrollProgress = scrollLeft / (scrollWidth - clientWidth);
    setScrollProgress(newScrollProgress);

    // Handle active index update
    const relativeScrollPerCard = 1 / (cardCount - 1);
    const previousScrollSnapPoint = relativeScrollPerCard * (activeIndex - 1);
    const nextScrollSnapPoint = relativeScrollPerCard * (activeIndex + 1);

    if (newScrollProgress <= previousScrollSnapPoint && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else if (
      newScrollProgress >= nextScrollSnapPoint &&
      activeIndex < cardCount - 1
    ) {
      setActiveIndex((prev) => prev + 1);
    }
  }, [cardCount, activeIndex]);

  useEffect(() => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;

    scrollable.addEventListener("scroll", handleScroll);
    return () => scrollable.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  // Calculate styles for a specific card
  const getCardStyle = (index: number): CardStyle => {
    const relativeScrollPerCard = cardCount > 1 ? 1 / (cardCount - 1) : 1;
    const cardRelativeScrollStart = relativeScrollPerCard * index;
    const cardScrollProgress =
      (scrollProgress - cardRelativeScrollStart) / relativeScrollPerCard;
    const absoluteCardScrollProgress = Math.abs(cardScrollProgress);

    const activeCardScrollProgress =
      scrollProgress / relativeScrollPerCard - activeIndex;
    const absoluteActiveCardScrollProgress = Math.abs(activeCardScrollProgress);

    const isActiveCard = index === activeIndex;

    // Calculate all transformations
    let translateX = calculateTranslateX(
      isActiveCard,
      cardScrollProgress,
      absoluteCardScrollProgress,
      cardCount
    );
    let translateZ = 200 - absoluteCardScrollProgress * 40;
    let rotateY =
      calculateRotateY(
        isActiveCard,
        absoluteActiveCardScrollProgress,
        absoluteCardScrollProgress
      ) *
      (Math.sign(activeCardScrollProgress) *
        (1 - Math.abs(activeIndex - index) / cardCount));
    let rotateZ = cardScrollProgress * 2 * -1;
    let scale = calculateScale(isActiveCard, absoluteCardScrollProgress);
    let zIndex = calculateZIndex(
      index,
      activeIndex,
      activeCardScrollProgress,
      cardCount
    );
    let opacity = calculateOpacity(
      absoluteCardScrollProgress,
      maxCardsOnOneSide
    );

    return {
      transform: `translateX(${
        translateX - 50
      }%) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
      zIndex,
      opacity,
    };
  };

  return {
    scrollableRef,
    getCardStyle,
    activeIndex,
  };
};

const calculateTranslateX = (
  isActiveCard: boolean,
  cardScrollProgress: number,
  absoluteCardScrollProgress: number,
  cardCount: number
) => {
  let translateX = 0;

  if (isActiveCard) {
    if (absoluteCardScrollProgress < 0.5) {
      // 활성 카드, 최초 절반 움직임
      translateX = -128 * cardScrollProgress;
    } else {
      translateX = -128 * Math.sign(cardScrollProgress);
      translateX += 128 * cardScrollProgress;
      translateX +=
        -((1 - absoluteCardScrollProgress / cardCount / 4) * 10) *
        (absoluteCardScrollProgress - 0.5) *
        2 *
        Math.sign(cardScrollProgress);
    }
  } else {
    translateX =
      cardScrollProgress *
      -((1 - absoluteCardScrollProgress / cardCount / 4) * 10);
  }

  return translateX;
};

const calculateRotateY = (
  isActiveCard: boolean,
  absoluteActiveCardScrollProgress: number,
  absoluteCardScrollProgress: number
) => {
  let rotateY = 0;
  if (absoluteActiveCardScrollProgress < 0.5) {
    rotateY = absoluteActiveCardScrollProgress * -75;
  } else {
    rotateY = (1 - absoluteActiveCardScrollProgress) * -75;
  }

  if (isActiveCard) {
    if (absoluteCardScrollProgress < 0.5) {
      rotateY = absoluteCardScrollProgress * -90;
    } else {
      rotateY = (1 - absoluteCardScrollProgress) * -90;
    }
  }

  return rotateY;
};

const calculateScale = (
  isActiveCard: boolean,
  absoluteCardScrollProgress: number
) => {
  let scale = 1 - absoluteCardScrollProgress * 0.05;

  if (isActiveCard) {
    if (absoluteCardScrollProgress < 0.5) {
      scale -= absoluteCardScrollProgress * 0.25;
    } else {
      scale -= (1 - absoluteCardScrollProgress) * 0.25;
    }
  }

  return Math.max(0, scale);
};

const calculateZIndex = (
  index: number,
  activeIndex: number,
  activeCardScrollProgress: number,
  cardCount: number
) => {
  const distanceIndex = Math.abs(index - activeIndex);

  let zIndex = cardCount - distanceIndex;

  if (Math.sign(activeCardScrollProgress) === -1) {
    if (index < activeIndex) {
      zIndex += 1;
      if (activeCardScrollProgress < -0.5) {
        zIndex += 1;
      }
    }
  }

  if (Math.sign(activeCardScrollProgress) === 1) {
    if (index === activeIndex) {
      zIndex += 1;
    }
    if (index > activeIndex) {
      zIndex += 1;

      if (activeCardScrollProgress > 0.5) {
        zIndex += 1;
      }
    }
  }

  return zIndex;
};

const calculateOpacity = (
  absoluteCardScrollProgress: number,
  maxCardsOnOneSide: number
) => {
  let opacity = maxCardsOnOneSide - absoluteCardScrollProgress;
  return Math.max(0, Math.min(1, opacity));
};
