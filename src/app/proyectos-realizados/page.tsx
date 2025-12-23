'use client';

import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import Image from 'next/image';

export default function ProyectosRealizados() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const toggleDropdown = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openLightbox = (index: SetStateAction<number>) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateImage = (direction: string) => {
    if (direction === 'next') {
      setCurrentImage((prev) => (prev + 1) % projectImages.length);
    } else {
      setCurrentImage((prev) => (prev - 1 + projectImages.length) % projectImages.length);
    }
  };

  // Array de imágenes de ejemplo (reemplaza con tus propias imágenes)
  const projectImages = [
    {
      src: "/placeholder1.jpg",
      alt: "Dashboard de analytics",
      description: "Interfaz principal del dashboard desarrollado"
    },
    {
      src: "/placeholder2.jpg",
      alt: "Código del proyecto",
      description: "Fragmento del código implementado"
    },
    {
      src: "/placeholder3.jpg",
      alt: "Reunión de equipo",
      description: "Trabajo colaborativo durante el desarrollo"
    }
  ];

  return (
    <>
      <header id="header" role="banner" className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
        <h1 id="logo" className="text-2xl font-bold">
          <Link href="#inicio" className="hover:underline text-white">Catalina Olivares</Link>
        </h1>

        <nav
          id="nav"
          role="navigation"
          aria-label="Menú principal"
          className="space-x-6"
        >
          <ul className="flex space-x-6">
            <li><a href="#inicio" className="hover:underline text-white">Inicio</a></li>
            <li><a href="#sobre-mi" className="hover:underline text-white">Sobre mí</a></li>
            <li className="relative group">
              <button 
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
                className="hover:underline flex items-center text-white"
                aria-haspopup="true"
              >
                Proyectos
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <ul 
                id="projects-dropdown"
                className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} group-hover:block bg-gray-900 border border-gray-800 rounded shadow-md mt-1 z-10`}
                role="menu"
              >
                <li role="none">
                  <Link 
                    href="/proyectos-realizados" 
                    className="block px-4 py-2 hover:bg-gray-800 text-white"
                    role="menuitem"
                  >
                    Realizados
                  </Link>
                </li>
                <li role="none">
                  <Link 
                    href="/proyectos-activos" 
                    className="block px-4 py-2 hover:bg-gray-800 text-white"
                    role="menuitem"
                  >
                    Activos
                  </Link>
                </li>
              </ul>
            </li>
            <li><a href="#contacto" className="hover:underline text-white">Contacto</a></li>
          </ul>
        </nav>
      </header>
      
      <main role="main">
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white flex flex-col items-center py-12 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Proyectos Realizados
          </h1>
          
          {/* Tarjeta de práctica profesional */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 md:p-12 max-w-6xl w-full border border-gray-700 mb-16">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  NA
                </div>
              </div>
              
              <div className="text-center md:text-left flex-grow">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-300">Práctica Profesional</h2>
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">Nova Analytics</h3>
                
                <div className="bg-gray-700 p-4 rounded-lg mb-6">
                  <p className="text-lg text-gray-200">
                    Desarrollo de soluciones analíticas innovadoras utilizando tecnologías modernas 
                    y frameworks de vanguardia para el análisis de datos empresariales.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                  <span className="px-4 py-2 bg-blue-600 rounded-full text-sm font-medium">React</span>
                  <span className="px-4 py-2 bg-purple-600 rounded-full text-sm font-medium">Next.js</span>
                  <span className="px-4 py-2 bg-green-600 rounded-full text-sm font-medium">Node.js</span>
                  <span className="px-4 py-2 bg-yellow-600 rounded-full text-sm font-medium">MongoDB</span>
                  <span className="px-4 py-2 bg-red-600 rounded-full text-sm font-medium">Python</span>
                </div>
                
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg mb-10">
                  Ver Detalles del Proyecto
                </button>
                
                {/* Sección de evidencias */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-6 text-center text-blue-300 border-b border-blue-500 pb-2">Evidencias del Proyecto</h3>
                  
                  {/* Opción 1: Galería de imágenes en grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {projectImages.map((image, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                        onClick={() => openLightbox(index)}
                      >
                        <div className="h-48 bg-gradient-to-br from-blue-700 to-purple-800 flex items-center justify-center">
                          <span className="text-white font-medium">Imagen {index + 1}</span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-white mb-2">{image.alt}</h4>
                          <p className="text-gray-300 text-sm">{image.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Opción 2: Carrusel horizontal */}
                  <div className="mb-12">
                    <h4 className="text-xl font-semibold mb-4 text-center text-white">Capturas del desarrollo</h4>
                    <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                      {projectImages.map((image, index) => (
                        <div 
                          key={index} 
                          className="flex-none w-64 h-72 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                          onClick={() => openLightbox(index)}
                        >
                          <div className="h-40 bg-gradient-to-br from-green-700 to-blue-800 flex items-center justify-center">
                            <span className="text-white font-medium">Captura {index + 1}</span>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-white mb-2 text-sm">{image.alt}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Opción 3: Acordeón para diferentes tipos de evidencias */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-center text-white">Más evidencias</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-300 mb-2">📊 Diagramas de arquitectura</h5>
                        <p className="text-gray-300">Incluye imágenes de la estructura del proyecto y flujos de datos.</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-300 mb-2">📝 Documentación técnica</h5>
                        <p className="text-gray-300">Muestra partes de la documentación que hayas creado.</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-300 mb-2">🎥 Video demostrativo</h5>
                        <p className="text-gray-300">Considera agregar un video mostrando el funcionamiento.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lightbox para ver imágenes en grande */}
          {lightboxOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
              <div className="relative max-w-4xl w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="absolute top-4 right-4 text-white text-3xl z-10 bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={closeLightbox}
                >
                  &times;
                </button>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="h-96 bg-gradient-to-br from-blue-700 to-purple-800 flex items-center justify-center">
                    <span className="text-white text-xl">Imagen {currentImage + 1} en vista ampliada</span>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{projectImages[currentImage].alt}</h3>
                    <p className="text-gray-300">{projectImages[currentImage].description}</p>
                  </div>
                </div>
                
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={() => navigateImage('prev')}
                >
                  &lt;
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={() => navigateImage('next')}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
          
          {/* Indicador de scroll para más contenido */}
          <div className="animate-bounce">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-2">Más proyectos abajo</span>
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}