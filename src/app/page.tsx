'use client';
import Chatbot from "./components/Chatbot";
import { useState, useEffect, useRef } from "react";

// Interfaces TypeScript
interface Project {
  title: string;
  subtitle: string;
  videoPath: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  thumbnail?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

// Componente Modal Avanzado con video local - CORREGIDO
const AdvancedVideoModal = ({ isOpen, onClose, project }: ModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-cyan-400/20 shadow-2xl animate-scaleIn mx-2 sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-cyan-400/20 sticky top-0 bg-gray-900 rounded-t-3xl">
          <div className="pr-4">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              {project.title}
            </h3>
            <p className="text-gray-400 mt-1 text-sm md:text-base">{project.subtitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90 hover:scale-110 flex-shrink-0"
          >
            ✕
          </button>
        </div>
        
        {/* Contenido del modal */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 p-4 md:p-6">
          {/* Video principal */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video 
                ref={videoRef}
                controls 
                className="w-full h-64 sm:h-72 md:h-80 lg:h-96"
                poster={project.thumbnail}
                preload="metadata"
              >
                <source src={project.videoPath} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            
            {/* Controles personalizados adicionales */}
            <div className="flex justify-center space-x-4 mt-4">
              <button 
                onClick={() => videoRef.current?.play()}
                className="px-3 py-2 md:px-4 md:py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg transition-colors text-sm md:text-base"
              >
                ▶ Reproducir
              </button>
              <button 
                onClick={() => videoRef.current?.pause()}
                className="px-3 py-2 md:px-4 md:py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-sm md:text-base"
              >
                ⏸ Pausar
              </button>
            </div>

            {/* Descripción extendida */}
            <div className="mt-6">
              <h4 className="text-lg md:text-xl font-semibold text-cyan-300 mb-3">🎯 Sobre este proyecto</h4>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">{project.description}</p>
            </div>
          </div>
          
          {/* Información del proyecto */}
          <div className="space-y-6">
            <div>
              <h4 className="text-base md:text-lg font-semibold text-cyan-300 mb-3">📋 Características</h4>
              <ul className="space-y-2 text-gray-300">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold text-cyan-300 mb-3">🛠️ Tecnologías</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, index: number) => (
                  <span key={index} className="px-2 py-1 md:px-3 md:py-1 bg-cyan-400/20 text-cyan-300 rounded-full text-xs md:text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gray-800 hover:bg-gray-700 text-white text-center py-3 rounded-2xl transition-all duration-300 font-semibold text-sm md:text-base"
              >
                👨‍💻 Ver código en GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("¡Mensaje enviado! Te contactaré pronto 💫");
  };

  // Datos de los proyectos con videos locales
  const projects: { [key: string]: Project } = {
    gopay: {
      title: "GoPay QR 🚌",
      subtitle: "Sistema de pago para locomoción colectiva - Talca",
      videoPath: "/assets/demos/GoPay.mp4",
      thumbnail: "/assets/video-thumbnails/gopay-preview.jpg",
      description: "Sistema completo de pago digital desarrollado para modernizar el transporte público en Talca.",
      features: [
        "Pagos QR en tiempo real",
        "Integración con Mercado Pago",
        "App React Native multiplataforma",
        "Arquitectura de microservicios"
      ],
      technologies: ["React Native", "Node.js", "Docker", "MariaDB", "Mercado Pago API"],
      githubUrl: "https://github.com/CatalinaOlivaresHerrera/gopay"
    },
    familia: {
      title: "Mi Familia te Ama 💙",
      subtitle: "App contra la soledad en adultos mayores",
      videoPath: "/assets/demos/ProyectoAbuelo2.mp4", 
      thumbnail: "/assets/video-thumbnails/familia-preview.jpg",
      description: "Aplicación móvil diseñada con enfoque en la accesibilidad para conectar adultos mayores con sus familias.",
      features: [
        "Llamadas de video simplificadas",
        "Recordatorios de medicamentos inteligentes",
        "Compartición de fotos automática",
        "Sistema de alertas de emergencia"
      ],
      technologies: ["Flutter", "Firebase", "Push Notifications", "UX Research"],
      githubUrl: "https://github.com/CatalinaOlivaresHerrera/mi-familia-te-ama"
    },
    nova: {
      title: "Practica Profesional - NOVA ANALYTICS",
      subtitle: "Desarrollo Web",
      videoPath: "/assets/demos/PracticaProfesional.mp4",
      thumbnail: "/assets/video-thumbnails/practica-preview.jpg",
      description: "Migración de Wordpress a html puro",
      features: [
        "Migración completa de WordPress",
        "Desarrollo frontend con HTML/CSS/JS",
        "Integración con Laravel",
        "Optimización de rendimiento"
      ],
      technologies: ["Laravel", "Mysql", "html", "css", "javaScript"],
      githubUrl: "https://github.com/CatalinaOlivaresHerrera/practica-profesional"
    }
  };

  // RUTA DEL CV CORREGIDA - PDF está en la carpeta assets
  const cvPath = "/assets/CV-Catalina-Olivares-Herrera.pdf";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden">
      {/* Indicador móvil */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <div className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-3 py-1 text-xs text-cyan-300">
          📱 Modo móvil
        </div>
      </div>

      {/* Header/Navigation */}
      <header className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <nav className="container mx-auto px-4 sm:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Catalina
            </div>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a>
              <a href="#proyectos" className="hover:text-cyan-400 transition-colors">Proyectos</a>
              <a href="#sobre-mi" className="hover:text-cyan-400 transition-colors">Sobre mí</a>
              <a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a>
            </div>
            {/* Menú móvil */}
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-white">
                ☰
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 animate-pulse"></div>
        <div className="text-center z-10 max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              Hola, soy <span className="text-cyan-300">Catalina</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed px-2">
              Desarrolladora Full-Stack apasionada por crear soluciones digitales 
              que <span className="text-purple-300">impacten positivamente</span> en la vida de las personas
            </p>
            
            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#proyectos" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                Ver mis proyectos
              </a>
              <a 
                href="#contacto" 
                className="border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 font-semibold py-3 px-6 sm:px-8 rounded-2xl transition-all duration-300 w-full sm:w-auto text-sm sm:text-base text-center"
              >
                Contáctame
              </a>
              <a 
                href={cvPath}
                download="/assets/CV/CVCatalinaOlivaresHerrera.pdf"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                <span>📄</span>
                <span>Descargar CV</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute bottom-10 left-4 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-4 sm:right-20 w-4 h-4 sm:w-6 sm:h-6 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-ping"></div>
      </section>

      {/* Sección de Proyectos */}
      <section id="proyectos" className="py-12 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Mis <span className="text-purple-300">proyectos</span>
            </h2>
            <p className="text-base md:text-xl text-gray-400">Ideas que cobran vida a través del código</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* GoPay */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-cyan-300">GoPay QR 🚌</h3>
                  <span className="px-2 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-xs md:text-sm font-medium w-fit">Demo Local</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  Revolucionando el transporte en Talca con pagos QR. Un sistema completo desde la app móvil hasta la gestión en tiempo real.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React Native', 'Node.js', 'Docker', 'Mercado Pago'].map((tag) => (
                    <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedProject(projects.gopay)}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  🎥 Ver demo local
                </button>
              </div>
            </div>

            {/* Mi Familia Te Ama */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-purple-300">Mi familia te ama 💙</h3>
                  <span className="px-2 py-1 bg-green-400/20 text-green-300 rounded-full text-xs md:text-sm font-medium w-fit">Demo Local</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  Conectando generaciones a través de la tecnología. Una app diseñada con amor para reducir la soledad en adultos mayores.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React Native', 'Firebase', 'UX Design', 'Accesibilidad'].map((tag) => (
                    <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs md:text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedProject(projects.familia)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  🎬 Ver demo local
                </button>
              </div>
            </div>

            {/* NOVA Analytics */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 hover:border-green-400/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-green-300">NOVA Analytics 🌐</h3>
                  <span className="px-2 py-1 bg-blue-400/20 text-blue-300 rounded-full text-xs md:text-sm font-medium w-fit">Práctica Profesional</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  Migración completa de WordPress a desarrollo web personalizado. Optimización y modernización de plataforma analítica.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Laravel', 'MySQL', 'HTML', 'CSS', 'JavaScript'].map((tag) => (
                    <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-green-500/20 text-green-300 rounded-full text-xs md:text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedProject(projects.nova)}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400 text-white font-semibold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  🎥 Ver demo local
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Mí Section */}
      <section id="sobre-mi" className="py-12 md:py-20 px-4 sm:px-6 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Sobre <span className="text-cyan-300">mí</span>
            </h2>
            <p className="text-base md:text-xl text-gray-400">Mi journey en el mundo del desarrollo</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-cyan-300 mb-4">💻 Mi stack tecnológico</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-gray-400 text-sm md:text-base">Frontend:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs md:text-sm">React</span>
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs md:text-sm">Next.js</span>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs md:text-sm">TypeScript</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-gray-400 text-sm md:text-base">Backend:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs md:text-sm">Node.js</span>
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs md:text-sm">Express</span>
                      <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs md:text-sm">Firebase</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-gray-400 text-sm md:text-base">Mobile:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs md:text-sm">React Native</span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs md:text-sm">Expo</span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs md:text-sm">Flutter</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-gray-400 text-sm md:text-base">Tools:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs md:text-sm">Docker</span>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs md:text-sm">Git</span>
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs md:text-sm">Figma</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4">🎯 Mi filosofía</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  Creo en el poder de la tecnología para resolver problemas reales. Mi enfoque combina 
                  código limpio, UX excepcional y escalabilidad, siempre con el usuario final en mente.
                </p>
              </div>
              
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-green-300 mb-4">🚀 En constante evolución</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  Actualmente explorando inteligencia artificial, machine learning y cómo integrar 
                  estas tecnologías para crear soluciones aún más innovadoras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-12 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-cyan-300">Hablemos</span>
            </h2>
            <p className="text-base md:text-xl text-gray-400">
              ¿Tienes un proyecto en mente? ¡Hagámoslo realidad!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            {/* Columna derecha - Formulario */}
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 md:p-8 border border-purple-400/20">
                <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-6">💌 Envíame un mensaje</h3>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Tu nombre" 
                      className="w-full bg-gray-800/50 border-2 border-white/10 rounded-xl md:rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Tu email" 
                      className="w-full bg-gray-800/50 border-2 border-white/10 rounded-xl md:rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Tu mensaje..." 
                      rows={4}
                      className="w-full bg-gray-800/50 border-2 border-white/10 rounded-xl md:rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 resize-none text-sm md:text-base"
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold py-3 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-cyan-500/20 text-sm md:text-base"
                  >
                    Enviar mensaje ✨
                  </button>
                </form>
              </div>
            </div>
            
            {/* Columna izquierda - Contacto directo */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 md:p-8 border border-cyan-400/20">
                <h3 className="text-xl md:text-2xl font-bold text-cyan-300 mb-6">📬 Contacto directo</h3>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-cyan-300 text-lg">📧</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm md:text-base break-all word-break-break-all">
                        catalinaolivaresherrera2023@gmail.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-300 text-lg">🐙</span>
                    </div>
                    <a 
                      href="https://github.com/CatalinaOlivaresHerrera" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-cyan-300 transition-colors text-sm md:text-base truncate"
                    >
                      github.com/CatalinaOlivaresHerrera
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-300 text-lg">📱</span>
                    </div>
                    <a 
                      href="tel:+56946584847" 
                      className="text-gray-300 hover:text-cyan-300 transition-colors text-sm md:text-base"
                    >
                      +56 9 4658 4847
                    </a>
                  </div>
                  
                  {/* Botón CV - CORREGIDO */}
                  <div className="pt-4 md:pt-6 border-t border-white/10">
                    <a 
                      href={cvPath}
                      download="/assets/CV/CVCatalinaOlivaresHerrera.pdf"
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400 text-white font-semibold py-3 px-4 md:py-3 md:px-6 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 w-full text-sm md:text-base"
                    >
                      <span className="text-lg">📄</span>
                      <span>Descargar CV</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-white/10 py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 text-sm md:text-base">
            © 2025 Catalina Olivares. Hecho con 💙 y mucho código.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="https://github.com/CatalinaOlivaresHerrera" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <span className="text-gray-600">•</span>
            <a href="tel:+56946584847" className="text-gray-400 hover:text-white transition-colors">
              +56 9 4658 4847
            </a>
          </div>
        </div>
      </footer>

      {/* Modal de Video */}
      <AdvancedVideoModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      <Chatbot />
    </div>
  );
}