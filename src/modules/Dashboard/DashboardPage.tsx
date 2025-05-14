import Header from "../../Components/Header"
import Loading from "../../Components/Loading"
import Nav from "../../Components/Nav"


const DashboardPage = () => {
  return (
    <div className='bg-white dark:bg-slate-950 min-h-screen'>
      <Header />
      <Nav />
        <main>
            <h1>HALLO ADMIN or MANAGAR</h1>

            <Loading />
        </main>
    </div>
  )
}

export default DashboardPage