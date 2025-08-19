export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-bold mb-2">PawHub</div>
          <p>Explore. Care. Connect. 🐾</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Links</div>
          <ul className="space-y-1">
            <li><a href="/animals" className="hover:text-pawGreen">Animals</a></li>
            <li><a href="/adoption" className="hover:text-pawGreen">Adoption</a></li>
            <li><a href="/blogs" className="hover:text-pawGreen">Blogs</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Newsletter</div>
          <form className="flex gap-2">
            <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 border rounded-md" />
            <button className="px-4 py-2 bg-pawBlue rounded-md">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="text-center text-xs py-4">© {new Date().getFullYear()} PawHub</div>
    </footer>
  )
}

