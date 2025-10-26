import './styles.scss'
import { Route, Routes } from 'react-router'
import GlobalProvider from 'src/context/global-context.tsx'
import { Suspense } from 'react'
import routes from './routes'
import PageSkeleton from './sections/page-skeleton'

const MainModule = () =>{

    return(
        <GlobalProvider>
            <Suspense fallback={<PageSkeleton/>}>
                <Routes>
                    {
                        routes.map((itmRoute)=>(
                            <Route key={itmRoute.key} path={itmRoute.path} element={itmRoute.component}/>
                        ))         
                    }
                </Routes>
            </Suspense>
        </GlobalProvider>
    )
}

export default MainModule