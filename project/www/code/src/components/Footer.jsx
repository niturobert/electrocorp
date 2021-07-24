export default function Footer() {
    return (
        <footer className="text-white">
            <div className="flex flex-wrap content-center bg-blue-800 p-8">
                <div className="flex flex-wrap mb-4 w-full">
                    <div className="invisible lg:visible lg:w-1/12 pl-8"></div>
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-3/12 pl-8">
                        <h3 className="text-3xl py-4">Link Utili</h3>
                        <ul className="font-light">
                            <li>
                                <a href="/">Homepage</a>
                            </li>
                            <li>
                                <a href="/services">I Nostri Servizi</a>
                            </li>
                            <li>
                                <a href="/infrastructure">L'Infrastruttura</a>
                            </li>
                            <li>
                                <a href="/contract">Diventa Cliente</a>
                            </li>
                            <li>
                                <a href="/support">Supporto</a>
                            </li>
                            <li>
                                <a href="/privacy">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/tos">Termini di Servizio</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-3/12 ">
                        <h3 className="text-3xl py-4">Contattaci</h3>
                        <ul>
                            <li>
                                <a href="mailto:admin@example.it">admin@example.it</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-4/12 px-16">
                        <h3 className="text-3xl py-4">ElectroCorp</h3>
                        <p>We are the company that produces all the electricity of the world. Consequently you are forced to be our customer and play by our rules.</p>
                    </div>
                </div>
            </div>
            <div className="bg-blue-900 p-2 pl-6">
                <p className="bottom text-center">© Copyright 2021 - All Rights Reserved</p>
            </div>
        </footer>
    )
}