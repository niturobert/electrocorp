import Navbar from '../components/Navbar/Landing'
import Footer from '../components/Footer/Landing'
import {useTranslation} from 'react-i18next'


export default function Landing(props) {
    const {t} = useTranslation()

    // t.changeLanguage('it')
    
    return (
        <div>
            <Navbar />
            
            <div className="bg-indigo-900 relative w-full h-full left-0 top-0">
                <div className="inset-0 bg-black opacity-25 absolute w-full"></div>
                <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-24 xl:py-40">
                    <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
                        <span className="font-mitr uppercase text-white text-3xl">ElectroCorp</span>

                        <h1 className="font-roboto-slab text-4xl sm:text-6xl text-blue-400 leading-tight mt-4">{t("landing_banner_1")}</h1>
                        <h2 className="font-roboto-slab text-3xl sm:text-5xl text-blue-400 leading-tight mt-4">{t("landing_banner_2")}</h2>

                        <div className="max-w-md">
                            <p className="font-source-sans-pro text-white mt-6 text-lg">
                                {t("landing_description")}
                            </p>
                        </div>
                    </div>
                </div>

                <img style={{position: 'absolute', left: 0, bottom: 0}} className="w-screen h-screen" src={process.env.PUBLIC_URL + '/img/world.jpeg'} />
            </div>
            <Footer />
        </div>
    )
}