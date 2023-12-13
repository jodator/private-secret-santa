import "@demox-labs/aleo-wallet-adapter-reactui/styles.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouteObject, useRoutes } from 'react-router-dom'
import { Layout } from '@/components/Layout.tsx'
import { Home } from '@/components/Home.tsx'
import { Wallet } from '@/components/Wallet.tsx'
import { Create } from '@/components/Create.tsx'
import { Dashboard } from '@/components/Dashboard.tsx'

const queryClient = new QueryClient()

const router: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "dashboard/:organizer",
        element: <Dashboard />,
      },
    ],
  },
]

function App() {
  const element = useRoutes(router)

  return (
    <QueryClientProvider client={queryClient}>
      <Wallet>
        {element}
      </Wallet>
    </QueryClientProvider>
  )
}

export default App

