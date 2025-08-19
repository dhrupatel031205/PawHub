import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-20 grid md:grid-cols-2 items-center gap-10">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold font-poppins">
            Explore. Care. Connect. 🐾
          </motion.h1>
          <p className="mt-4 text-lg">PawHub is your playful hub for animal facts, adoptions, lost & found, vets, and more.</p>
          <div className="mt-8 flex gap-4">
            <Link to="/animals" className="px-6 py-3 rounded-full bg-pawGreen text-white shadow hover:opacity-90">Explore Animals</Link>
            <Link to="/adoption" className="px-6 py-3 rounded-full bg-pawBlue text-gray-900 shadow hover:opacity-90">Adopt a Friend</Link>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
          <img className="rounded-2xl shadow-xl" src="https://images.unsplash.com/photo-1546182990-dffeafbe841d" alt="Animals" />
          <div className="absolute -bottom-6 -left-6 bg-pawYellow px-4 py-2 rounded-xl shadow">Daily fun facts 🦜</div>
        </motion.div>
      </section>

      <section className="bg-pawPink/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Featured</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['Bella', 'Milo', 'Coco'].map((name) => (
              <div key={name} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                <img src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9" alt="pet" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="font-semibold">{name}</div>
                  <div className="text-sm text-gray-600">Adopt me! 🐶</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

