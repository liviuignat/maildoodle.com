import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

let currentHistory;
if (typeof window === 'undefined') {
  currentHistory = createMemoryHistory();
} else {
  currentHistory = createBrowserHistory();
}

export const history = currentHistory;