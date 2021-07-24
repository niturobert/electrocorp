import {useTranslation} from 'react-i18next'


export default function FooterLanding(props) {
    const {t} = useTranslation()


    return (
        <footer class="text-white">
            <div class="flex flex-wrap content-center bg-blue-800 p-8">
                <div class="flex flex-wrap mb-4 w-full">
                    <div class="invisible lg:visible lg:w-1/12 pl-8"></div>
                    <div class="w-full sm:w-1/2 md:w-1/2 lg:w-4/12 px-16">
                        <h3 class="text-3xl py-4">ElectroCorp</h3>
                        <p>{t('landing_description')}</p>
                    </div>
                    <div class="w-full sm:w-1/2 md:w-1/2 lg:w-3/12 ">
                        <h3 class="text-3xl py-4">{t('footer_head_2')}</h3>
                        <ul>
                            <li>
                                <a href="mailto:admin@example.it">admin@example.it</a>
                            </li>
                        </ul>
                    </div>
                    <div class="w-full sm:w-1/2 md:w-1/2 lg:w-3/12 pl-8">
                        <h3 class="text-3xl py-4">{t('footer_head_1')}</h3>
                        <ul class="font-light">
                            <li>
                                <a href="/">{t('footer_homepage')}</a>
                            </li>
                            <li>
                                <a href="/services">{t('footer_services')}</a>
                            </li>
                            <li>
                                <a href="/infrastructure">{t('footer_infrastructure')}</a>
                            </li>
                            <li>
                                <a href="/contract">{t('footer_new_client')}</a>
                            </li>
                            <li>
                                <a href="/support">{t('footer_support')}</a>
                            </li>
                            <li>
                                <a href="/privacy">{t('footer_privacy')}</a>
                            </li>
                            <li>
                                <a href="/tos">{t('footer_tos')}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="bg-blue-900 p-2 pl-6">
                <p class="bottom text-center">© Copyright 2021 - All Rights Reserved</p>
            </div>
        </footer>
    )
}