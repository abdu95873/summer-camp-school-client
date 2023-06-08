import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import AuthProviders from './Providers/AuthProviders';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>
    <AuthProviders>
      <div className='max-w-screen-xl mx-auto'>
        <RouterProvider router={router} />
      </div>
    </AuthProviders>
    </QueryClientProvider>
  </React.StrictMode>,
)
