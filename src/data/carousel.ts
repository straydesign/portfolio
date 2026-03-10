export interface CarouselItem {
  readonly src: string;
  readonly alt: string;
}

export const CAROUSEL_ITEMS: readonly CarouselItem[] = [
  { src: '/images/carousel/mm-login.mp4', alt: 'Middleman login flow' },
  { src: '/images/carousel/fd-landing.mp4', alt: 'FirstDay landing page' },
  { src: '/images/carousel/mm-dashboard.mp4', alt: 'Middleman dashboard overview' },
  { src: '/images/carousel/fd-login.mp4', alt: 'FirstDay login flow' },
  { src: '/images/carousel/mm-orders.mp4', alt: 'Middleman orders tab' },
  { src: '/images/carousel/fd-goal-create.mp4', alt: 'FirstDay goal creation + plan generation' },
  { src: '/images/carousel/mm-stock.mp4', alt: 'Middleman stock management' },
  { src: '/images/carousel/fd-calendar.mp4', alt: 'FirstDay calendar + day view' },
  { src: '/images/carousel/mm-store-switch.mp4', alt: 'Middleman store switcher' },
  { src: '/images/carousel/fd-complete-day.mp4', alt: 'FirstDay completing activities' },
  { src: '/images/carousel/mm-route.mp4', alt: 'Middleman route map' },
  { src: '/images/carousel/fd-achievements.mp4', alt: 'FirstDay achievements + stats' },
  { src: '/images/carousel/mm-nav-flow.mp4', alt: 'Middleman tab navigation' },
  { src: '/images/carousel/mm-settings.mp4', alt: 'Middleman settings' },
];
