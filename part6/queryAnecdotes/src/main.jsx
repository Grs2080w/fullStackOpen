import ReactDOM from 'react-dom/client'
import App from './App'

import { NotificationComponentProvider } from './NotificationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotificationComponentProvider>
      <App />
    </NotificationComponentProvider>

)