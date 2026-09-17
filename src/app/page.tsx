import App from '@/components/App';

/* The home route. A server component whose only job is to hand the client
   shell the page it should open on — see `[...slug]/page.tsx` for the rest. */
export default function HomePage() {
  return <App initialPage="home" />;
}
