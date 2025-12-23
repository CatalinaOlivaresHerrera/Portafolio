'use client';
import { useState } from 'react';

// Definición de tipos para las respuestas
type ProfessionalResponses = {
  '¿Qué tecnologías dominas?': string;
  '¿Cómo puedo contactarte?': string;
  '¿Qué tipo de proyectos has realizado?': string;
  '¿Tienes experiencia en desarrollo móvil?': string;
  '¿Cuál es tu stack tecnológico favorito?': string;
};

// Objetos de respuestas actualizadas con tu información
const professionalResponses: ProfessionalResponses = {
  '¿Qué tecnologías dominas?': `Como desarrolladora fullstack, mis principales tecnologías son:

🚀 Frontend: 
• React, Next.js, TypeScript, TailwindCSS
• HTML5, CSS3, JavaScript ES6+

⚙️ Backend:
• Node.js, Express, MongoDB
• APIs REST, Microservicios

📱 Mobile:
• React Native, Expo, Flutter
• Desarrollo nativo multiplataforma

🛠️ Herramientas:
• Git, Docker, Figma, Vercel
• MariaDB, Firebase, Mercado Pago API

Puedes ver más detalles en mi sección de habilidades.`,
  
  '¿Cómo puedo contactarte?': `Puedes contactarme a través de:

📧 Email: catalinaolivaresherrera2023@gmail.com
📞 Teléfono: +56 9 82051336
🐙 GitHub: /catalina-olivares

También puedes usar el formulario de contacto en esta página. Estaré encantada de conversar contigo.`,
  
  '¿Qué tipo de proyectos has realizado?': `He trabajado en diversos proyectos innovadores:

🚌 GoPay QR - Sistema de pago digital para transporte público
• React Native, Node.js, Docker, Mercado Pago API

💙 Mi Familia Te Ama - App para conectar adultos mayores
• Flutter, Firebase, UX Research, Accesibilidad

🌐 NOVA Analytics - Migración y desarrollo web empresarial
• Laravel, MySQL, HTML/CSS/JavaScript

💼 Y muchos más proyectos web responsivos, dashboards analíticos y aplicaciones móviles.`,

  '¿Tienes experiencia en desarrollo móvil?': `¡Sí! Tengo experiencia sólida en desarrollo móvil:

📱 Con React Native:
• GoPay QR - App completa de pagos QR
• Configuración de builds y publicación
• Integración con APIs nativas

📱 Con Flutter:
• Mi Familia Te Ama - App para adultos mayores
• Diseño centrado en accesibilidad
• Estado gestionado con Provider

🎯 Enfoque en:
• UX/UI excepcional
• Performance optimizada
• Código mantenible y escalable`,

  '¿Cuál es tu stack tecnológico favorito?': `Mi stack favorito para proyectos modernos:

💙 Frontend: Next.js + TypeScript + TailwindCSS
• Rendimiento excelente con SSR/SSG
• Tipado seguro con TypeScript
• Estilizado rápido con Tailwind

⚡ Backend: Node.js + Express + MongoDB
• Ecosistema JavaScript unificado
• APIs rápidas y escalables
• Base de datos flexible

🚀 Mobile: React Native/Expo
• Código compartido entre plataformas
• Hot reload para desarrollo rápido
• Acceso a APIs nativas

Este stack me permite desarrollar aplicaciones fullstack de alta calidad eficientemente.`
};

type ResponseKey = keyof ProfessionalResponses;

export default function ProfessionalChatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleQuestion = (question: ResponseKey) => {
    setIsTyping(true);
    setResponse('');

    const answer = professionalResponses[question];

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < answer.length) {
        const char = answer.charAt(i);
        setResponse(prev => prev + char);
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20); // Velocidad de escritura más rápida
  };
  return (
    <>
      {/* Botón flotante profesional - MEDIANO */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-2xl z-50 hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-pulse"
        aria-label="Abrir chatbot profesional"
      >
        <div className="relative">
          <span className="text-2xl">🤖</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
        
        {/* Tooltip MEDIANO */}
        <div className="absolute -top-14 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-cyan-400/30">
          💬 Asistente Profesional
        </div>
      </button>

      {/* Ventana del chat profesional - TAMAÑO MEDIANO */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-gray-900/95 backdrop-blur-md rounded-2xl border border-cyan-400/30 shadow-2xl z-50 flex flex-col animate-scaleIn">
          {/* Encabezado profesional - MEDIANO */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold text-lg">💼 Asistente Profesional</h3>
              <p className="text-white/80 text-sm">Hablemos de tecnología y proyectos</p>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-gray-200 text-xl transition-transform hover:rotate-90"
              aria-label="Cerrar chatbot"
            >
              ✕
            </button>
          </div>

          {/* Área de conversación - MEDIANO */}
          <div className="flex-1 p-4 overflow-y-auto">
            {response ? (
              <div className="whitespace-pre-line text-base leading-relaxed p-4 rounded-2xl bg-blue-500/20 text-blue-100 border border-blue-400/30">
                {response}
                {isTyping && (
                  <span className="ml-1 animate-pulse">|</span>
                )}
              </div>
            ) : (
              <div className="text-gray-400 h-full flex flex-col justify-center">
                <div className="text-center mb-6">
                  <p className="text-base mb-2 text-cyan-300 font-semibold">
                    Hola, soy Catalina
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Desarrolladora Full-Stack · React · Node.js · Mobile
                  </p>
                  <p className="text-base text-gray-300">
                    Selecciona una pregunta:
                  </p>
                </div>
                
                <div className="space-y-3">
                  {Object.keys(professionalResponses).map((question) => (
                    <button
                      key={question}
                      onClick={() => handleQuestion(question as ResponseKey)}
                      className="w-full p-3 text-left rounded-2xl bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-300 border border-gray-700 hover:border-cyan-400/30 text-sm hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer del chat - MEDIANO */}
          <div className="p-3 border-t border-gray-700/50 bg-gray-900/50 rounded-b-2xl">
            <p className="text-xs text-center text-gray-500">
              Desarrollado con React & TypeScript · Catalina Olivares
            </p>
          </div>
        </div>
      )}

      {/* Efectos de animación */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );

}