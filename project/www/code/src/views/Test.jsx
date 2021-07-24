export default function TestComponent() {
    return (
        <section class="absolute w-full top-0">
            <div class="absolute top-0 w-full h-full bg-gray-900" style={{"background-image": 'url("https://demos.creative-tim.com/tailwindcss-starter-project/static/media/register_bg_2.2fee0b50.png")', "background-size": "100%", "background-repeat": "no-repeat"}}></div>
            <div class="container mx-auto px-4 h-full">
                <div class="flex content-center items-center justify-center h-full">
                    <div class="w-full lg:w-4/12 px-4 pt-32">
                        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                            <div class="rounded-t mb-0 px-6 py-6">
                                <div class="text-center mb-3">
                                    <h6 class="text-gray-600 text-sm font-bold">Sign in with</h6></div>
                                <div class="btn-wrapper text-center">
                                    <button class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" style={{'transition': 'all 0.15s ease 0s'}}><img alt="..." class="w-5 mr-1" src="https://demos.creative-tim.com/tailwindcss-starter-project/static/media/github.4ffd4fe7.svg" />Github</button>
                                    <button class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" style={{'transition': 'all 0.15s ease 0s'}}><img alt="..." class="w-5 mr-1" src="https://demos.creative-tim.com/tailwindcss-starter-project/static/media/google.87be59a1.svg" />Google</button>
                                </div>
                                <hr class="mt-6 border-b-1 border-gray-400" />
                            </div>
                            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div class="text-gray-500 text-center mb-3 font-bold"><small>Or sign in with credentials</small></div>
                                <form>
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
                                        <input type="email" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style={{'transition': 'all 0.15s ease 0s'}} />
                                    </div>
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
                                        <input type="password" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style={{'transition': 'all 0.15s ease 0s'}} />
                                    </div>
                                    <div>
                                        <label class="inline-flex items-center cursor-pointer">
                                            <input id="customCheckLogin" type="checkbox" class="form-checkbox text-gray-800 ml-1 w-5 h-5" style={{'transition': 'all 0.15s ease 0s'}} /><span class="ml-2 text-sm font-semibold text-gray-700">Remember me</span></label>
                                    </div>
                                    <div class="text-center mt-6">
                                        <button class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="button" style={{'transition': 'all 0.15s ease 0s'}}>Sign In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="flex flex-wrap mt-6">
                            <div class="w-1/2"><a href="#pablo" class="text-gray-300"><small>Forgot password?</small></a></div>
                            <div class="w-1/2 text-right"><a href="#pablo" class="text-gray-300"><small>Create new account</small></a></div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="absolute w-full bottom-0 bg-gray-900 pb-6">
                <div class="container mx-auto px-4">
                    <hr class="mb-6 border-b-1 border-gray-700" />
                    <div class="flex flex-wrap items-center md:justify-between justify-center">
                        <div class="w-full md:w-4/12 px-4">
                            <div class="text-sm text-white font-semibold py-1">Made with <a href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit" class="text-white hover:text-gray-400 text-sm font-semibold py-1" target="_blank">Tailwind Starter Kit </a></div>
                        </div>
                        <div class="w-full md:w-8/12 px-4">
                            <ul class="flex flex-wrap list-none md:justify-end  justify-center">
                                <li><a href="https://www.creative-tim.com" class="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3" target="_blank">Creative Tim</a></li>
                                <li><a href="https://www.creative-tim.com/presentation" class="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3" target="_blank">About Us</a></li>
                                <li><a href="https://creative-tim.com/blog" class="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3" target="_blank">Blog</a></li>
                                <li><a href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md" class="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3" target="_blank">MIT License</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    )
}