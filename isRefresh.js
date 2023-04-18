import { createContext } from 'react'
const Refresh = createContext({
    isRefresh: false,
    setRefresh: (refresh) => {}
  });
export default Refresh