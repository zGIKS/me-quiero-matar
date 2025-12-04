import valeHeart from './assets/vale.jpeg'

export function LetterModal({ show, onClose }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-[92%] p-8 rounded-2xl shadow-2xl text-center space-y-5">
        <div className="text-2xl font-semibold text-rose-600">Para Valentina</div>
        <p className="text-gray-700 leading-relaxed text-left">
          Valentina, perdóname por las torpezas de estos días. Mi amor por ti no es un destello caprichoso, sino esa
          llama tenaz que ilumina incluso cuando el viento sopla en contra. Te miro y comprendo que todo lo que fui
          buscaba, sin saberlo, llegar hasta ti.
        </p>
        <p className="text-gray-700 leading-relaxed text-left">
          Eres mi asombro cotidiano: la risa que despeja la niebla, la voz que devuelve sentido a lo simple. En ti
          descubrí la evidencia de que el deseo también puede ser hogar, y que hay ternuras que no cansan ni se gastan
          con el tiempo, solo se afinan y se vuelven más nuestras.
        </p>
        <p className="text-gray-700 leading-relaxed text-left">
          Lo digo sin reservas: eres la chica que siempre quise, la que anhelé sin nombre, la que elegí cuando por fin
          llegó. Te amo mucho, Valentina. Eres importante para mí, y quiero que esta certeza te acompañe siempre.
        </p>
        <div className="flex justify-center">
          <img
            src={valeHeart}
            alt="Corazón para Valentina"
            className="max-h-48 rounded-xl shadow-md object-contain"
          />
        </div>
        <button
          className="mt-2 px-4 py-2 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
