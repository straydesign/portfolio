export interface CarouselItem {
  readonly src: string;
  readonly alt: string;
}

export const CAROUSEL_ITEMS: readonly CarouselItem[] = [
  { src: '/images/carousel/mm-login.mp4', alt: 'Middleman login flow' },
  { src: '/images/firstday/hero.png', alt: 'FirstDay landing page' },
  { src: '/images/carousel/mm-dashboard.mp4', alt: 'Middleman dashboard overview' },
  { src: '/images/firstday/loading-screen.png', alt: 'FirstDay loading screen' },
  { src: '/images/carousel/mm-orders.mp4', alt: 'Middleman orders tab' },
  { src: '/images/firstday/goal-creation.png', alt: 'FirstDay goal creation + plan generation' },
  { src: '/images/carousel/mm-stock.mp4', alt: 'Middleman stock management' },
  { src: '/images/firstday/calendar-view.png', alt: 'FirstDay calendar + day view' },
  { src: '/images/carousel/mm-store-switch.mp4', alt: 'Middleman store switcher' },
  { src: '/images/firstday/day-view.png', alt: 'FirstDay daily activities' },
  { src: '/images/carousel/mm-route.mp4', alt: 'Middleman route map' },
  { src: '/images/firstday/congrats-view.png', alt: 'FirstDay achievements + stats' },
  { src: '/images/carousel/mm-nav-flow.mp4', alt: 'Middleman tab navigation' },
  { src: '/images/carousel/mm-settings.mp4', alt: 'Middleman settings' },
];
