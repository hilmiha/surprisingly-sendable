
import { lazy } from 'react';
const CanvasModule   = lazy(() => import('../canvas-module'));

const routes = [
    {key:'canvas', path: '/', component: <CanvasModule/>},
    {key:'404', path: '/*', component: <>404</>},
];

export default routes;