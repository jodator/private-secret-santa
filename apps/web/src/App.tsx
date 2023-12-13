import "@demox-labs/aleo-wallet-adapter-reactui/styles.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouteObject, useParams, useRoutes } from 'react-router-dom'
import { Layout } from '@/components/Layout.tsx'
import { Home } from '@/components/Home.tsx'
import { Wallet } from '@/components/Wallet.tsx'
import { Create } from '@/components/Create.tsx'

const queryClient = new QueryClient()

function Dashboard() {
  const { organizer } = useParams<{ organizer: string }>()
  return (
    <div>
      <p className="text-xl text-white">Dashboard for {organizer}</p>
    </div>
  )
}

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

