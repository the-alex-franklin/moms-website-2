import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'

export default function App(){
  return (
    <div className="app">
      <Header />
      <Home />
      <Footer />
    </div>
  )
}