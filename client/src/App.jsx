import { useEffect, useState } from 'react'

function App() {
  const [projects, setProjects] = useState([])
  const [projectsStatus, setProjectsStatus] = useState('loading')
  const [contactStatus, setContactStatus] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadProjects() {
      if (!isMounted) return
      setProjectsStatus('loading')

      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        const nextProjects = Array.isArray(data?.projects) ? data.projects : []

        if (!isMounted) return
        setProjects(nextProjects)
        setProjectsStatus(nextProjects.length ? 'ready' : 'empty')
      } catch (error) {
        if (!isMounted) return
        setProjectsStatus('error')
      }
    }

    loadProjects()

    return () => {
      isMounted = false
    }
  }, [])

  async function submitContact(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    setContactStatus('Sending...')

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Request failed')
      }

      form.reset()
      setContactStatus('Message sent. Thank you!')
    } catch (error) {
      setContactStatus(error.message || 'Sorry, something went wrong.')
    }
  }

  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex space-x-6 text-sm font-medium">
          <a href="#home" className="nav-link text-blue-500">
            Home
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#skills" className="nav-link">
            Skills
          </a>
          <a href="#services" className="nav-link">
            Services
          </a>
          <a href="#blog" className="nav-link">
            Blog
          </a>
          <a href="#faq" className="nav-link">
            FAQ
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
          <a href="#follow" className="nav-link">
            Follow
          </a>
        </div>
        <div className="text-2xl font-bold serif">Phibo</div>
        <div className="flex space-x-4 text-gray-600">
          <a href="mailto:philbertniyoniringi@gmail.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <a
            href="https://www.tiktok.com/@phibo_show"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
          >
            <i className="fab fa-tiktok"></i>
          </a>
          <a
            href="https://wa.me/250794089066"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href="https://www.instagram.com/phibo_official/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </nav>

      <section id="home" className="max-w-5xl mx-auto pt-16 pb-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hey, I'm <span className="text-blue-500">Phibo.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 serif italic mb-16">
          Full Stack Developer focused on modern web systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="text-left space-y-8 hidden md:block">
            <div>
              <h3 className="font-bold text-lg mb-2 underline decoration-blue-500 decoration-2 underline-offset-4">
                Biography
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                I am Philbert Niyoniringiye (Phibo), a full stack developer
                focused on modern web systems. I build clean interfaces with
                Tailwind CSS and powerful backends with Node.js.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 underline decoration-blue-500 decoration-2 underline-offset-4">
                Skills Stack
              </h3>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>- HTML5, CSS3, JavaScript</li>
                <li>- Tailwind CSS, Node.js, Express</li>
                <li>- MongoDB, REST APIs</li>
              </ul>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="profile-ring rounded-full">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src="/assets/profile.jpg"
                  alt="Phibo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="text-right space-y-8 hidden md:block">
            <div>
              <h2 className="text-3xl font-bold">Frontend</h2>
              <p className="text-sm text-gray-500">Tailwind CSS and UI</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Backend</h2>
              <p className="text-sm text-gray-500">Node.js and Express</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Database</h2>
              <p className="text-sm text-gray-500">MongoDB</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-8">
            Core Stack
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
            <span className="font-bold text-xl italic">HTML5</span>
            <span className="font-bold text-xl italic">CSS3</span>
            <span className="font-bold text-xl italic">JavaScript</span>
            <span className="font-bold text-xl italic">Node.js</span>
            <span className="font-bold text-xl italic">MongoDB</span>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              I build modern, reliable web applications with strong UI, robust
              APIs, and scalable data models. I care about performance, security,
              and clarity from the first wireframe to production.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl mb-4">Experience</h3>
              <div className="space-y-4 text-sm text-gray-500">
                <div>
                  <p className="font-semibold text-gray-700">Full Stack Projects</p>
                  <p>
                    Built web platforms with clean UI, REST APIs, and MongoDB
                    data models.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Client Work</p>
                  <p>
                    Delivered reliable solutions with clear communication and
                    smooth handover.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Product Thinking</p>
                  <p>Focused on user flow, speed, and maintainability in every build.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl mb-4">Timeline</h3>
              <div className="space-y-4 text-sm text-gray-500">
                <div>
                  <p className="font-semibold text-gray-700">2023 - 2024</p>
                  <p>Focused on frontend and component systems.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">2024 - 2025</p>
                  <p>Deepened backend skills with Node.js and Express.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">2025 - 2026</p>
                  <p>Scaled full stack apps with MongoDB and API design.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl mb-4">Education</h3>
              <div className="space-y-4 text-sm text-gray-500">
                <div>
                  <p className="font-semibold text-gray-700">Self-Led Learning</p>
                  <p>Hands-on practice through real projects and continuous improvement.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Online Courses</p>
                  <p>Focused on full stack development, APIs, and database design.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Community</p>
                  <p>Learning through collaboration and building in public.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16">
            I build full stack products that connect strong frontend experiences
            with reliable backend services. Below are selected works that combine
            UI, backend logic, and real-world workflows.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {projectsStatus === 'loading' && (
              <div className="text-sm text-gray-500">Loading projects...</div>
            )}
            {projectsStatus === 'error' && (
              <div className="text-sm text-gray-500">Failed to load projects.</div>
            )}
            {projectsStatus === 'empty' && (
              <div className="text-sm text-gray-500">No projects yet.</div>
            )}
            {projectsStatus === 'ready' &&
              projects.map((project, index) => (
                <div key={`${project.title}-${index}`} className="step-card bg-gray-50 p-8 rounded-xl">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{project.summary}</p>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {Array.isArray(project.stack) ? project.stack.join(' · ') : ''}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-24 px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">Ready to build something solid?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              I focus on clean UI, strong backend logic, and data systems that
              scale with your business. Let's make your next product fast,
              reliable, and easy to use.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-blue-200 flex items-center space-x-2">
              <span>Hire Me</span>
              <i className="fas fa-arrow-right"></i>
            </button>
            <div className="mt-8">
              <p className="text-sm text-gray-400">Email Me At:</p>
              <p className="font-bold">philbertniyoniringi@gmail.com</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=600&auto=format&fit=crop"
                alt="Workspace"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Skills</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-16">
            I combine frontend craftsmanship with backend reliability to deliver complete web solutions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="step-card bg-gray-50 p-6 rounded-xl flex items-center gap-3">
              <i className="devicon-html5-plain colored text-2xl"></i>
              <span>HTML5</span>
            </div>
            <div className="step-card bg-gray-50 p-6 rounded-xl flex items-center gap-3">
              <i className="devicon-css3-plain colored text-2xl"></i>
              <span>CSS3</span>
            </div>
            <div className="step-card bg-gray-50 p-6 rounded-xl flex items-center gap-3">
              <i className="devicon-javascript-plain colored text-2xl"></i>
              <span>JavaScript</span>
            </div>
            <div className="step-card bg-gray-50 p-6 rounded-xl flex items-center gap-3">
              <i className="devicon-tailwindcss-plain colored text-2xl"></i>
              <span>Tailwind CSS</span>
            </div>
            <div className="step-card bg-gray-50 p-6 rounded-xl flex items-center gap-3">
              <i className="devicon-nodejs-plain colored text-2xl"></i>
              <span>Node.js</span>
            </div>
            <div className="step-card bg-gray-50 p-6 rounded-xl flex items-center gap-3">
              <i className="devicon-express-original text-2xl"></i>
              <span>Express</span>
            </div>
            <div className="step-card bg-gray-50 p-6 rounded-xl flex items-center gap-3">
              <i className="devicon-mongodb-plain colored text-2xl"></i>
              <span>MongoDB</span>
            </div>
            <div className="step-card bg-gray-50 p-6 rounded-xl flex items-center gap-3">
              <i className="devicon-postman-plain colored text-2xl"></i>
              <span>REST APIs</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">My Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-6 text-xl">
              <i className="fas fa-laptop-code"></i>
            </div>
            <h3 className="font-bold text-xl mb-4">Frontend Development</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Responsive UI with Tailwind CSS and modern JavaScript.
            </p>
            <a href="#contact" className="text-blue-500 font-bold text-xs uppercase tracking-wider flex items-center">
              Learn More <i className="fas fa-chevron-right ml-2"></i>
            </a>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-6 text-xl">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3 className="font-bold text-xl mb-4">Backend APIs</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Secure REST APIs with Node.js and Express.
            </p>
            <a href="#contact" className="text-blue-500 font-bold text-xs uppercase tracking-wider flex items-center">
              Learn More <i className="fas fa-chevron-right ml-2"></i>
            </a>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-6 text-xl">
              <i className="fas fa-vector-square"></i>
            </div>
            <h3 className="font-bold text-xl mb-4">MongoDB Modeling</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Efficient NoSQL schemas and data management.
            </p>
            <a href="#contact" className="text-blue-500 font-bold text-xs uppercase tracking-wider flex items-center">
              Learn More <i className="fas fa-chevron-right ml-2"></i>
            </a>
          </div>
        </div>
      </section>

      <section id="blog" className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Blog</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Short insights about building fast, scalable web apps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Frontend</p>
              <h3 className="font-bold text-xl mb-3">Building Clean UI with Tailwind</h3>
              <p className="text-sm text-gray-500 mb-4">
                Patterns I use to keep UI consistent, fast, and easy to maintain.
              </p>
              <a href="#contact" className="text-blue-500 text-sm font-bold">
                Read More
              </a>
            </article>
            <article className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Backend</p>
              <h3 className="font-bold text-xl mb-3">Designing Reliable APIs</h3>
              <p className="text-sm text-gray-500 mb-4">
                How I structure routes, validation, and error handling in Express.
              </p>
              <a href="#contact" className="text-blue-500 text-sm font-bold">
                Read More
              </a>
            </article>
            <article className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Database</p>
              <h3 className="font-bold text-xl mb-3">MongoDB Models That Scale</h3>
              <p className="text-sm text-gray-500 mb-4">
                Choosing collections, indexes, and relationships for growth.
              </p>
              <a href="#contact" className="text-blue-500 text-sm font-bold">
                Read More
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" className="max-w-6xl mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Common questions about my process and services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <details className="bg-white p-6 rounded-2xl border border-gray-100">
            <summary className="font-semibold cursor-pointer">How long does a project take?</summary>
            <p className="text-sm text-gray-500 mt-3">
              Timelines depend on scope. A simple site can be 1 to 2 weeks, while a full web app may take
              4 to 8 weeks.
            </p>
          </details>
          <details className="bg-white p-6 rounded-2xl border border-gray-100">
            <summary className="font-semibold cursor-pointer">Do you work with existing designs?</summary>
            <p className="text-sm text-gray-500 mt-3">
              Yes. I can implement your design or refine it for better UX and performance.
            </p>
          </details>
          <details className="bg-white p-6 rounded-2xl border border-gray-100">
            <summary className="font-semibold cursor-pointer">Can you handle backend and database?</summary>
            <p className="text-sm text-gray-500 mt-3">
              Yes. I build REST APIs with Express and scalable data models with MongoDB.
            </p>
          </details>
          <details className="bg-white p-6 rounded-2xl border border-gray-100">
            <summary className="font-semibold cursor-pointer">What do you need to start?</summary>
            <p className="text-sm text-gray-500 mt-3">
              A clear goal, reference examples if possible, and any existing content or brand assets.
            </p>
          </details>
        </div>
      </section>

      <section id="contact" className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Contact</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Tell me about your project and I will get back to you.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl mb-4">Let’s talk</h3>
              <p className="text-sm text-gray-500 mb-6">
                Use the form to send a message or reach me directly.
              </p>
              <div className="space-y-3 text-sm text-gray-500">
                <p>
                  <span className="font-semibold text-gray-700">Email:</span>{' '}
                  philbertniyoniringi@gmail.com
                </p>
                <p>
                  <span className="font-semibold text-gray-700">WhatsApp:</span> 0794089066
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Instagram:</span> phibo_official
                </p>
              </div>
            </div>
            <form className="bg-white p-8 rounded-2xl border border-gray-100" onSubmit={submitContact}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="text-sm font-semibold">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                  placeholder="Tell me about your project"
                ></textarea>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all"
                >
                  Send Message
                </button>
                <span className="text-sm text-gray-500">{contactStatus}</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-white pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 serif italic">
              Have a great idea in mind?
              <br />
              Let's make it real
            </h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl hover:scale-105">
              Start Project Together
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12">
            <div>
              <div className="text-2xl font-bold serif mb-4">Phibo</div>
              <p className="text-sm text-gray-500 max-w-xs mb-6">
                Full stack developer dedicated to crafting fast, secure, and user-friendly web experiences.
              </p>
              <div className="flex space-x-4 text-gray-400">
                <a href="mailto:philbertniyoniringi@gmail.com" className="hover:text-blue-500">
                  <i className="fas fa-envelope"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@phibo_show"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-500"
                >
                  <i className="fab fa-tiktok"></i>
                </a>
                <a
                  href="https://wa.me/250794089066"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-500"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href="https://www.instagram.com/phibo_official/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-500"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div id="follow" className="text-right flex flex-col justify-end">
              <p className="text-xs text-gray-400">
                Everything I build is focused on performance, security, and great UX.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>&copy; 2026 Phibo. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0">Built by Phibo</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
