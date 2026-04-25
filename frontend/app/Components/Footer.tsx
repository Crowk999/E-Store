export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800 mt-10">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* ABOUT */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-3">
              Store
            </h2>
            <p className="text-sm leading-relaxed">
              A modern shopping experience built for speed, simplicity,
              and a smooth user experience. Discover products with ease
              and checkout in seconds.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-white font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Shop</li>
              <li className="hover:text-white cursor-pointer">Cart</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-white font-medium mb-3">Follow Us</h3>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer">
                Facebook
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer">
                Instagram
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer">
                Twitter
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer">
                GitHub
              </span>
            </div>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Store. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built with care for modern shopping experiences
          </p>

        </div>

      </div>

    </footer>
  );
}
