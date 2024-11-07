import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-zinc-50 text-center text-surface/75  bg-neutral-800 p-4 dark:bg-neutral-900 dark:text-white lg:text-left">
        <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-white/10 dark:bg-neutral-800 lg:justify-between">
          <div className="me-12 hidden lg:block">
            <span>
              <h3>Saral Samvidhan</h3>
            </span>
          </div>

          <div className="flex justify-center">
          {/* <!-- Facebook Icon --> */}
<a href="https://www.facebook.com" className="me-6 hover:scale-125 transition-all duration-300">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-6 w-6 shadow-lg">
    <defs>
      <linearGradient id="facebookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#1877f2", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#4b8bf4", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" fill="url(#facebookGradient)" />
  </svg>
</a>

{/* <!-- X (Twitter) Icon --> */}
<a href="https://twitter.com" className="me-6 hover:scale-125 transition-all duration-300">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6 shadow-lg">
    <defs>
      <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#1da1f2", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#00b0ff", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48z" fill="url(#xGradient)" />
  </svg>
</a>

{/* <!-- Google Icon --> */}
<a href="https://www.google.com" className="me-6 hover:scale-125 transition-all duration-300">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-6 w-6 shadow-lg">
    <defs>
      <linearGradient id="googleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#4285f4", stopOpacity: 1 }} />
        <stop offset="25%" style={{ stopColor: "#34a853", stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: "#fbbc05", stopOpacity: 1 }} />
        <stop offset="75%" style={{ stopColor: "#ea4335", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="url(#googleGradient)" />
  </svg>
</a>

{/* <!-- Instagram Icon --> */}
<a href="https://www.instagram.com" className="me-6 hover:scale-125 transition-all duration-300">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 w-6">
    <path
      fill="#E4405F"
      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z"
    />
    <circle cx="344" cy="168" r="24" fill="#fff" />
  </svg>
</a>



{/* <!-- LinkedIn Icon --> */}
<a href="https://www.linkedin.com" className="me-6 hover:scale-125 transition-all duration-300">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 w-6 shadow-lg">
    <defs>
      <linearGradient id="linkedinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#0077b5", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#005983", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.9 0 54.5 0 24.1 24.1 0 53.8 0 83.7 0 108 24.1 108 54.5c0 29.4-24.3 53.6-54.2 53.6zm358.1 339.9h-92.9v-186c0-43.9-16.4-74-57.4-74-31.3 0-50.7 21.1-59.1 41.5v-35.6h-92.9v389.5h92.9v-173.6c0-31.7 19.9-51.8 49.6-51.8 28.9 0 51.3 17.8 51.3 53.7v171.7h92.8z" fill="url(#linkedinGradient)" />
  </svg>
</a>

{/* <!-- GitHub Icon --> */}
<a href="https://github.com" className="me-6 hover:scale-125 transition-all duration-300">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6 shadow-lg">
    <defs>
      <linearGradient id="githubAltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#6e5494", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#5a4e7b", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M256 32C114.6 32 0 146.6 0 288c0 113.1 73.3 209 175 242.8c12.8 2.4 17.5-5.6 17.5-12.3V444.2c-71.1 15.5-86.1-30.7-86.1-30.7c-11.6-29.4-28.4-37.2-28.4-37.2c-23.2-15.9 1.8-15.6 1.8-15.6c25.6 1.8 39.1 26.3 39.1 26.3c22.7 38.9 59.6 27.6 74.2 21.1c2.3-16.4 8.9-27.6 16.2-34c-56.8-6.5-116.5-28.4-116.5-126.5c0-28 10-50.8 26.3-68.7c-2.7-6.5-11.4-32.7 2.5-68.3c0 0 21.4-6.9 70.3 26.2c20.3-5.6 42.1-8.4 63.8-8.5c21.7 .1 43.5 2.9 63.8 8.5c49-33.2 70.3-26.2 70.3-26.2c13.9 35.6 5.2 61.8 2.5 68.3c16.3 17.9 26.3 40.7 26.3 68.7c0 98.3-59.8 120-116.7 126.4c9.1 7.9 17.2 23.6 17.2 47.6v70.6c0 6.8 4.6 14.8 17.5 12.3C438.8 497 512 401.1 512 288C512 146.6 397.4 32 256 32z" fill="url(#githubAltGradient)" />
  </svg>
</a>


          </div>
        </div>

        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Useful links
              </h6>
              <p className="mb-4 hover:text-blue-600">
                <a href="#!">Feedback</a>
              </p>
              <p className="mb-4 hover:text-blue-600">
                <a href="#!" className="hover:text-blue-600">
                  Website Policies
                </a>
              </p>
              <p className="mb-4 hover:text-blue-600">
                <a href="#!">Terms and Conditions</a>
              </p>
              <p className="hover:text-blue-600">
                <a href="#!">Help</a>
              </p>
            </div>

            <div>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Contact
              </h6>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                </span>
                IIT Tirupati, Chindepalle, Andhra Pradesh, 517619
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </span>
                saralsamvidhanindia@gmail.com
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                +91 939** **361
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                +91 939** **361
              </p>
            </div>

            <div className="mb-6  ml-20 md:mb-0">
              <h5 className="mb-2 font-medium uppercase font-semibold">
                Saral Samvidhan
              </h5>
              <p className="mb-4">
                We at Saral Samvidhan are commited to make law more accessible
                to the general public. For Any queries/ideas please reach out to
                us!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black/5 p-6 text-center">
          <span>© 2024 Copyright IIT Tirupati</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
