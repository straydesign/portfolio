export interface CarouselItem {
  readonly src: string;
  readonly alt: string;
}

export const CAROUSEL_ITEMS: readonly CarouselItem[] = [
  { src: '/images/carousel/mm-dashboard.png', alt: 'Middleman dashboard overview' },
  { src: '/images/firstday/hero.png', alt: 'FirstDay landing page' },
  { src: '/images/carousel/mm-stock.png', alt: 'Middleman stock management' },
  { src: '/images/firstday/calendar-view.png', alt: 'FirstDay 30-day calendar' },
  { src: '/images/carousel/mm-orders.png', alt: 'Middleman orders tab' },
  { src: '/images/firstday/loading-screen.png', alt: 'FirstDay loading screen' },
  { src: '/images/firstday/congrats-view.png', alt: 'FirstDay achievements' },
];
