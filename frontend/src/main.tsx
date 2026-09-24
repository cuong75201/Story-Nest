import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router'
import UserLayout from './layouts/user/layout'
import { RouterProvider } from 'react-router/dom'

const router = createBrowserRouter([
  {
    path:"/",
    Component:UserLayout,

  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<p>Đang tải...</p>} >
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  </StrictMode>,
)
