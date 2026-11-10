/*
 * Arthemii Ionaere — site translations (EN / DE / ES)
 *
 * How it works: every page is written in English. This script swaps visible
 * text for its German or Spanish version using the dictionary below, keyed by
 * the exact English text (whitespace-insensitive). Text with no entry stays
 * in English. To translate a new piece of text, add a line:
 *     "English text": ["Deutscher Text", "Texto en español"],
 * The chosen language is remembered between pages.
 */
(function () {
  'use strict';

  var LANGS = ['en', 'de', 'es'];
  var T = {
    "Sending…": ["Wird gesendet…", "Enviando…"],
    "Please fill in your name, email and message.": ["Bitte geben Sie Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachricht ein.", "Por favor, introduce tu nombre, tu correo electrónico y tu mensaje."],
    "Please enter a valid email address.": ["Bitte geben Sie eine gültige E-Mail-Adresse ein.", "Por favor, introduce una dirección de correo electrónico válida."],
    "Sorry, the message could not be sent. Please try again later or write to info@arthemii.com.": ["Die Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie an info@arthemii.com.", "Lo sentimos, no se pudo enviar el mensaje. Inténtalo de nuevo más tarde o escribe a info@arthemii.com."],
    "About": ["Über mich", "Acerca de"],
    "Exhibitions": ["Ausstellungen", "Exposiciones"],
    "Technologies": ["Techniken", "Tecnologías"],
    "Works": ["Werke", "Obras"],
    "Contact": ["Kontakt", "Contacto"],
    "Gallery": ["Galerie", "Galería"],
    "Videos": ["Videos", "Vídeos"],
    "Video": ["Video", "Vídeo"],
    "Arthemii Ionaere — Contemporary Stained Glass": ["Arthemii Ionaere — Zeitgenössische Glasmalerei", "Arthemii Ionaere — Vidriera contemporánea"],
    "← Back to Gallery": ["← Zurück zur Galerie", "← Volver a la galería"],
    "← Back to Works": ["← Zurück zu den Werken", "← Volver a las obras"],
    "Show more": ["Mehr anzeigen", "Mostrar más"],
    "Show less": ["Weniger anzeigen", "Mostrar menos"],
    "— Arthemii Ionaere": ["— Arthemii Ionaere", "— Arthemii Ionaere"],
    "About — Arthemii Ionaere": ["Über mich — Arthemii Ionaere", "Acerca de — Arthemii Ionaere"],
    "Contact — Arthemii Ionaere": ["Kontakt — Arthemii Ionaere", "Contacto — Arthemii Ionaere"],
    "Exhibitions — Arthemii Ionaere": ["Ausstellungen — Arthemii Ionaere", "Exposiciones — Arthemii Ionaere"],
    "Gallery — Arthemii Ionaere": ["Galerie — Arthemii Ionaere", "Galería — Arthemii Ionaere"],
    "Technologies — Arthemii Ionaere": ["Techniken — Arthemii Ionaere", "Tecnologías — Arthemii Ionaere"],
    "Videos — Arthemii Ionaere": ["Videos — Arthemii Ionaere", "Vídeos — Arthemii Ionaere"],
    "Works — Arthemii Ionaere": ["Werke — Arthemii Ionaere", "Obras — Arthemii Ionaere"],
    "Contemporary Stained Glass Artist — Est. 2016": ["Zeitgenössische Glaskunst — seit 2016", "Artista contemporáneo de vidrieras — desde 2016"],
    "Abstract stained glass through light, color, and form": ["Abstrakte Glasmalerei durch Licht, Farbe und Form", "Vidrieras abstractas a través de la luz, el color y la forma"],
    "Chaos striving for symmetry. Architectural discovery through a personal psychological method focused on unconscious mechanisms of form generation. Fusing classical Gothic aesthetics and abstract art into a new, dynamic visual language through colored glass.": ["Chaos, das nach Symmetrie strebt. Architektonische Entdeckungen durch eine persönliche psychologische Methode, die sich auf unbewusste Mechanismen der Formentstehung konzentriert. Klassische gotische Ästhetik und abstrakte Kunst verschmelzen im farbigen Glas zu einer neuen, dynamischen Bildsprache.", "Caos que aspira a la simetría. Descubrimiento arquitectónico a través de un método psicológico personal centrado en los mecanismos inconscientes de generación de la forma. Fusiona la estética gótica clásica y el arte abstracto en un lenguaje visual nuevo y dinámico a través del vidrio de color."],
    "Commission a Project": ["Projekt in Auftrag geben", "Encargar un proyecto"],
    "\"Prism\" — 2024": ["„Prisma“ — 2024", "«Prisma» — 2024"],
    "Redefining stained glass through contemporary abstraction": ["Glasmalerei neu gedacht durch zeitgenössische Abstraktion", "Redefiniendo las vidrieras a través de la abstracción contemporánea"],
    "Establishing a new architectural language within the bionic style, realized through the glass industry.": ["Eine neue Architektursprache im bionischen Stil, verwirklicht im Medium Glas.", "Una nueva lengua arquitectónica dentro del estilo biónico, materializada a través del vidrio."],
    "The abstract and contemporary approach to the use of glass and color departs from the traditional Christian symbolism of stained glass, which usually features concrete depictions of saints, biblical scenes, or symbols. However, even in this abstract form, the exploration of potential symbolism and meanings through an innovative approach to symbolism remains relevant.": ["Der abstrakte, zeitgenössische Umgang mit Glas und Farbe löst sich von der traditionellen christlichen Symbolik der Glasmalerei, die meist konkrete Darstellungen von Heiligen, biblischen Szenen oder Symbolen zeigt. Doch auch in dieser abstrakten Form bleibt die Suche nach möglicher Symbolik und Bedeutung durch einen innovativen Umgang mit Symbolen relevant.", "El enfoque abstracto y contemporáneo del uso del vidrio y el color se aparta del simbolismo cristiano tradicional de las vidrieras, que generalmente presenta representaciones concretas de santos, escenas bíblicas o símbolos. Sin embargo, incluso en esta forma abstracta, la exploración del simbolismo y los significados potenciales mediante un enfoque innovador sigue siendo relevante."],
    "Contemporary studies of stained glass art allow us to analyze the impact of abstraction on perception and interpretation. Changing styles and techniques can have an impact on aesthetic and spiritual perception, offering new forms to be integrated into contemporary art and architecture.": ["Zeitgenössische Studien zur Glasmalerei ermöglichen es, den Einfluss der Abstraktion auf Wahrnehmung und Interpretation zu untersuchen. Wandelnde Stile und Techniken können die ästhetische und spirituelle Wahrnehmung prägen und neue Formen für zeitgenössische Kunst und Architektur eröffnen.", "Los estudios contemporáneos del arte de las vidrieras nos permiten analizar el impacto de la abstracción en la percepción y la interpretación. Los estilos y técnicas cambiantes pueden influir en la percepción estética y espiritual, ofreciendo nuevas formas para integrar en el arte y la arquitectura contemporáneos."],
    "Of particular importance in abstract stained glass is the viewer's personal immersion in the work. Due to the open-ended nature of abstraction, each viewer can find their own symbols, archetypes or interpretations within it, making each viewing a unique experience.": ["Besonders wichtig ist bei abstrakter Glasmalerei das persönliche Eintauchen des Betrachters in das Werk. Durch die Offenheit der Abstraktion kann jeder darin eigene Symbole, Archetypen oder Deutungen finden — und so wird jede Betrachtung zu einer einzigartigen Erfahrung.", "De particular importancia en las vidrieras abstractas es la inmersión personal del espectador en la obra. Debido a la naturaleza abierta de la abstracción, cada espectador puede encontrar en ella sus propios símbolos, arquetipos o interpretaciones, haciendo de cada contemplación una experiencia única."],
    "These personal revelations and interactions enrich the emotional and intellectual sides of perception, making the stained glass not just an object of observation, but an active participant in a dialog with the viewer.": ["Diese persönlichen Erkenntnisse und Begegnungen bereichern die emotionale wie die intellektuelle Seite der Wahrnehmung: Das Glasbild ist nicht nur ein Objekt der Betrachtung, sondern ein aktiver Partner im Dialog mit dem Betrachter.", "Estas revelaciones e interacciones personales enriquecen los lados emocional e intelectual de la percepción, haciendo que la vidriera no sea solo un objeto de observación, sino un participante activo en un diálogo con el espectador."],
    "Portrait of the artist — 2025": ["Porträt des Künstlers — 2025", "Retrato del artista — 2025"],
    "Arthemii steps grown more than a decade ago, while Arthemii was studying psychology at university with a focus on art therapy. It was here that he conceived the own concept of the \"free line\" - an intuitive, unrestrained approach to mark-making that would come to define his entire artistic practice and establish a new architectural paradigm. The first drawings that emerged from this method bore a striking resemblance to stained glass, and it was this unexpected likeness that opened the door to an entirely new medium.": ["Arthemiis Weg begann vor mehr als zehn Jahren, als er an der Universität Psychologie mit Schwerpunkt Kunsttherapie studierte. Dort entwickelte er sein eigenes Konzept der „freien Linie“ — einen intuitiven, ungehemmten Zugang zum Zeichnen, der seine gesamte künstlerische Praxis prägen und ein neues architektonisches Paradigma begründen sollte. Die ersten Zeichnungen, die aus dieser Methode hervorgingen, ähnelten auffallend Glasmalereien — und genau diese unerwartete Ähnlichkeit öffnete die Tür zu einem völlig neuen Medium.", "El camino de Arthemii comenzó hace más de una década, mientras estudiaba psicología en la universidad con especialización en arteterapia. Fue allí donde concibió su propio concepto de la «línea libre»: un enfoque intuitivo y sin restricciones del trazo que llegaría a definir toda su práctica artística y a establecer un nuevo paradigma arquitectónico. Los primeros dibujos surgidos de este método guardaban un sorprendente parecido con las vidrieras, y fue esa semejanza inesperada la que abrió la puerta a un medio completamente nuevo."],
    "His first work in glass, executed in the classical Tiffany technique, marked the beginning of a dedicated series in the 60×60 santimeters format. What started as exploration soon evolved into an ambitious first major artwork: a complete collection of 36 stained glass panels spanning a total dimension of 7.2 × 1.8 metres.": ["Seine erste Arbeit in Glas, ausgeführt in der klassischen Tiffany-Technik, markierte den Beginn einer eigenen Serie im Format 60 × 60 Zentimeter. Was als Erkundung begann, entwickelte sich bald zu einem ehrgeizigen ersten Hauptwerk: einer vollständigen Sammlung von 36 Glasbildern mit einer Gesamtfläche von 7,2 × 1,8 Metern.", "Su primera obra en vidrio, realizada con la técnica clásica Tiffany, marcó el inicio de una serie dedicada en formato de 60 × 60 centímetros. Lo que empezó como una exploración pronto se convirtió en una ambiciosa primera gran obra: una colección completa de 36 paneles de vidriera con unas dimensiones totales de 7,2 × 1,8 metros."],
    "After two years of mastering the Tiffany technique, Arthemii turned his attention to an entirely new frontier: three-dimensional architectural objects. Result is represents in works of this kind are virtually without precedent — such projects scarcely exist in the public domain. Through sustained experimentation, Arthemii developed a original architectural forms and technological approaches, forged entirely through practice rather than established method.": ["Nach zwei Jahren der Meisterung der Tiffany-Technik wandte sich Arthemii einem völlig neuen Gebiet zu: dreidimensionalen architektonischen Objekten. Arbeiten dieser Art sind nahezu beispiellos — solche Projekte sind in der Öffentlichkeit kaum zu finden. Durch beharrliches Experimentieren entwickelte Arthemii eigene architektonische Formen und technologische Ansätze, die ganz aus der Praxis heraus entstanden sind und nicht aus etablierten Methoden.", "Tras dos años dominando la técnica Tiffany, Arthemii dirigió su atención a una frontera completamente nueva: los objetos arquitectónicos tridimensionales. Las obras de este tipo prácticamente no tienen precedentes; proyectos así apenas existen en el ámbito público. Mediante una experimentación constante, Arthemii desarrolló formas arquitectónicas y enfoques tecnológicos originales, forjados enteramente a través de la práctica y no de métodos establecidos."],
    "True to his creative philosophy, these architectural works are produced without preliminary sketches or structural design, resulting in forms that are abstract, futuristic, and entirely self-determined. Yet they remain deeply connected to the two dementional (classic stainglass) works from which his practice grew: when light passes through these three-dimensional objects, the shadows they cast onto a surface reproduce, with remarkable precision, the exact same compositions found in his stained glass panels. They are, in essence, the same visual language — the same interplay of line, light, and form — liberated into a third dimension.": ["Getreu seiner künstlerischen Philosophie entstehen diese architektonischen Werke ohne Vorskizzen oder statische Planung — mit Formen, die abstrakt, futuristisch und vollkommen selbstbestimmt sind. Dennoch bleiben sie eng mit den zweidimensionalen Arbeiten (klassischer Glasmalerei) verbunden, aus denen seine Praxis hervorging: Wenn Licht durch diese dreidimensionalen Objekte fällt, geben die Schatten, die sie auf eine Fläche werfen, mit bemerkenswerter Präzision genau dieselben Kompositionen wieder wie seine Glasbilder. Im Kern ist es dieselbe Bildsprache — dasselbe Zusammenspiel von Linie, Licht und Form —, befreit in die dritte Dimension.", "Fieles a su filosofía creativa, estas obras arquitectónicas se realizan sin bocetos previos ni diseño estructural, dando lugar a formas abstractas, futuristas y completamente autodeterminadas. Sin embargo, siguen profundamente conectadas con las obras bidimensionales (vidriera clásica) de las que surgió su práctica: cuando la luz atraviesa estos objetos tridimensionales, las sombras que proyectan sobre una superficie reproducen, con notable precisión, exactamente las mismas composiciones de sus paneles de vidriera. Son, en esencia, el mismo lenguaje visual — el mismo juego de línea, luz y forma — liberado en una tercera dimensión."],
    "Today, Arthemii continues to push the boundaries of his practice, venturing into the architecture of light itself. He is currently developing kinetic prisms and expanding into the field of installation art, exploring how light, movement, and space can be woven into immersive environments. Alongside this, he actively pursues collaborations across disciplines — working with theatre, club culture, and live performance — bringing his visual language into dialogue with other art forms and redefining the contexts in which his work can be experienced": ["Heute erweitert Arthemii die Grenzen seiner Praxis weiter und wagt sich in die Architektur des Lichts selbst vor. Derzeit entwickelt er kinetische Prismen und erschließt das Feld der Installationskunst — er erforscht, wie Licht, Bewegung und Raum zu immersiven Umgebungen verwoben werden können. Daneben sucht er aktiv die Zusammenarbeit über Disziplinen hinweg — mit Theater, Clubkultur und Live-Performance —, bringt seine Bildsprache in einen Dialog mit anderen Kunstformen und definiert die Kontexte neu, in denen sein Werk erlebt werden kann.", "Hoy, Arthemii sigue ampliando los límites de su práctica, adentrándose en la arquitectura de la propia luz. Actualmente desarrolla prismas cinéticos y se expande al campo del arte de instalación, explorando cómo la luz, el movimiento y el espacio pueden entrelazarse en entornos inmersivos. Paralelamente, busca activamente colaboraciones entre disciplinas — con el teatro, la cultura de club y la performance en vivo —, llevando su lenguaje visual al diálogo con otras formas de arte y redefiniendo los contextos en los que su obra puede experimentarse."],
    "Selected Works": ["Ausgewählte Werke", "Obras seleccionadas"],
    "Portfolio of light and color": ["Portfolio aus Licht und Farbe", "Portafolio de luz y color"],
    "A selection of significant works spanning stained glass, digital art, photography, and design.": ["Eine Auswahl bedeutender Arbeiten aus Glasmalerei, digitaler Kunst, Fotografie und Design.", "Una selección de obras significativas que abarcan vidrieras, arte digital, fotografía y diseño."],
    "Visual Narratives": ["Visuelle Erzählungen", "Narrativas visuales"],
    "Vertical Horizons": ["Vertikale Horizonte", "Horizontes verticales"],
    "Refined Reality": ["Verfeinerte Realität", "Realidad refinada"],
    "Screen Captures": ["Bildschirmaufnahmen", "Capturas de pantalla"],
    "Process Documentation": ["Prozessdokumentation", "Documentación del proceso"],
    "Evening Sessions": ["Abendsitzungen", "Sesiones nocturnas"],
    "Digital Art": ["Digitale Kunst", "Arte digital"],
    "Digital concepts and narrative structures": ["Digitale Konzepte und narrative Strukturen", "Conceptos digitales y estructuras narrativas"],
    "Photography": ["Fotografie", "Fotografía"],
    "Portrait orientation study": ["Studie im Hochformat", "Estudio en formato vertical"],
    "Enhanced": ["Bearbeitet", "Retocado"],
    "Post-processed imagery": ["Nachbearbeitete Bilder", "Imágenes posprocesadas"],
    "Digital": ["Digital", "Digital"],
    "Digital documentation of creative process": ["Digitale Dokumentation des kreativen Prozesses", "Documentación digital del proceso creativo"],
    "Archive": ["Archiv", "Archivo"],
    "Records of the creative journey": ["Aufzeichnungen des kreativen Weges", "Registros del viaje creativo"],
    "Study": ["Studie", "Estudio"],
    "Late night creativity": ["Kreativität in später Stunde", "Creatividad nocturna"],
    "Visual Narratives — Arthemii Ionaere": ["Visuelle Erzählungen — Arthemii Ionaere", "Narrativas visuales — Arthemii Ionaere"],
    "Vertical Horizons — Arthemii Ionaere": ["Vertikale Horizonte — Arthemii Ionaere", "Horizontes verticales — Arthemii Ionaere"],
    "Refined Reality — Arthemii Ionaere": ["Verfeinerte Realität — Arthemii Ionaere", "Realidad refinada — Arthemii Ionaere"],
    "Screen Captures — Arthemii Ionaere": ["Bildschirmaufnahmen — Arthemii Ionaere", "Capturas de pantalla — Arthemii Ionaere"],
    "Process Documentation — Arthemii Ionaere": ["Prozessdokumentation — Arthemii Ionaere", "Documentación del proceso — Arthemii Ionaere"],
    "Evening Sessions — Arthemii Ionaere": ["Abendsitzungen — Arthemii Ionaere", "Sesiones nocturnas — Arthemii Ionaere"],
    "Late night creative explorations in the studio, where experimentation leads to unexpected discoveries.": ["Nächtliche kreative Erkundungen im Atelier, bei denen das Experimentieren zu unerwarteten Entdeckungen führt.", "Exploraciones creativas nocturnas en el estudio, donde la experimentación conduce a descubrimientos inesperados."],
    "Archival records of the artistic journey, showing the evolution from concept to finished artwork.": ["Archivaufzeichnungen des künstlerischen Weges, die die Entwicklung vom Konzept bis zum fertigen Werk zeigen.", "Registros de archivo del recorrido artístico que muestran la evolución desde el concepto hasta la obra terminada."],
    "Post-processed imagery enhancing the natural beauty of glass refraction and color interaction.": ["Nachbearbeitete Bilder, die die natürliche Schönheit der Lichtbrechung im Glas und das Zusammenspiel der Farben betonen.", "Imágenes posprocesadas que realzan la belleza natural de la refracción del vidrio y la interacción del color."],
    "Digital documentation of the creative process — from initial sketches to final glass compositions.": ["Digitale Dokumentation des kreativen Prozesses — von den ersten Skizzen bis zu den fertigen Glaskompositionen.", "Documentación digital del proceso creativo: desde los primeros bocetos hasta las composiciones finales en vidrio."],
    "Portrait orientation photography study capturing the vertical play of light through stained glass panels.": ["Fotografische Studie im Hochformat, die das vertikale Lichtspiel durch Glasbilder einfängt.", "Estudio fotográfico en formato vertical que captura el juego vertical de la luz a través de paneles de vidriera."],
    "Digital concepts exploring narrative structures through abstract visual language. Each piece tells a story through color, form, and composition.": ["Digitale Konzepte, die narrative Strukturen in einer abstrakten Bildsprache erkunden. Jedes Werk erzählt eine Geschichte durch Farbe, Form und Komposition.", "Conceptos digitales que exploran estructuras narrativas mediante un lenguaje visual abstracto. Cada pieza cuenta una historia a través del color, la forma y la composición."],
    "Craftsmanship & Techniques": ["Handwerk & Techniken", "Oficio y técnicas"],
    "Four distinct approaches to working with colored glass — from traditional Tiffany technique to experimental shadow prism installations.": ["Vier unterschiedliche Ansätze für die Arbeit mit Farbglas — von der traditionellen Tiffany-Technik bis zu experimentellen Schattenprisma-Installationen.", "Cuatro enfoques distintos para trabajar con vidrio de color: desde la técnica tradicional Tiffany hasta instalaciones experimentales de prismas de sombras."],
    "Metal Frame Sculpting": ["Skulpturen mit Metallrahmen", "Escultura con armazón metálico"],
    "Specialized metal forms serve as the skeleton for stained glass, crafted using a proprietary \"edge\" technique for precise angles and durability. Metal forms are bent to the required radius for each design. Glass elements are kiln-fired to match the metal framework's curvature. Nearly all creations feature integrated electrical wiring for lighting elements. Can be installed on ceilings, floors, or walls. Approximately 1.5 months from initial design to final implementation.": ["Spezielle Metallformen dienen als Skelett für das Glas und werden mit einer eigenen „Kanten“-Technik gefertigt — für präzise Winkel und Langlebigkeit. Die Metallformen werden für jeden Entwurf auf den erforderlichen Radius gebogen. Die Glaselemente werden im Ofen gebrannt, um sich der Krümmung des Metallrahmens anzupassen. Fast alle Arbeiten verfügen über eine integrierte elektrische Verkabelung für Leuchtelemente. Montage an Decke, Boden oder Wand möglich. Etwa 1,5 Monate vom ersten Entwurf bis zur fertigen Umsetzung.", "Formas metálicas especializadas sirven de esqueleto para la vidriera, fabricadas con una técnica propia de «canto» que garantiza ángulos precisos y durabilidad. Las formas metálicas se curvan al radio necesario para cada diseño. Los elementos de vidrio se cuecen en horno para adaptarse a la curvatura del armazón metálico. Casi todas las piezas incorporan cableado eléctrico para elementos de iluminación. Pueden instalarse en techos, suelos o paredes. Aproximadamente 1,5 meses desde el diseño inicial hasta la realización final."],
    "Falling Shadows": ["Fallende Schatten", "Sombras proyectadas"],
    "Shadow prism technology designed for easy transport and quick installation. Specially prepared glass elements are assembled on-site to create sculptures functioning as prisms. When illuminated, the glass refracts light to cast mesmerizing patterns of light and shadow onto surrounding surfaces. Setup can be completed within days before the event — approximately 2-3 hours per installation. Ideal for temporary exhibitions and immersive environments.": ["Schattenprisma-Technik, entwickelt für einfachen Transport und schnellen Aufbau. Speziell vorbereitete Glaselemente werden vor Ort zu Skulpturen zusammengesetzt, die als Prismen wirken. Beleuchtet bricht das Glas das Licht und wirft faszinierende Muster aus Licht und Schatten auf die umgebenden Flächen. Der Aufbau ist innerhalb weniger Tage vor der Veranstaltung möglich — etwa 2–3 Stunden pro Installation. Ideal für temporäre Ausstellungen und immersive Räume.", "Tecnología de prisma de sombras diseñada para un transporte fácil y una instalación rápida. Elementos de vidrio especialmente preparados se ensamblan in situ para crear esculturas que funcionan como prismas. Al iluminarse, el vidrio refracta la luz y proyecta fascinantes patrones de luz y sombra sobre las superficies circundantes. El montaje puede completarse en los días previos al evento: aproximadamente 2-3 horas por instalación. Ideal para exposiciones temporales y entornos inmersivos."],
    "Glass Parts Sculpting": ["Skulpturen aus Glaselementen", "Escultura con piezas de vidrio"],
    "Sculptures constructed from numerous glass elements meticulously soldered together. A metallic frame is crafted first, incorporating electrical wiring for lighting fixtures. Glass pieces are framed within a special edging for interconnection. These sculptures embrace the freedom of artistic expression — glass placement follows creative intuition rather than rigid plans. Pieces exhibit chaotic forms striving toward symmetry, capturing a dynamic blend of structure and spontaneity.": ["Skulpturen aus zahlreichen Glaselementen, die sorgfältig miteinander verlötet werden. Zuerst entsteht ein Metallrahmen mit integrierter Verkabelung für die Beleuchtung. Die Glasstücke werden mit einer speziellen Einfassung versehen, um sie miteinander zu verbinden. Diese Skulpturen leben von künstlerischer Freiheit — die Anordnung des Glases folgt der kreativen Intuition statt starren Plänen. Die Werke zeigen chaotische Formen, die nach Symmetrie streben, und vereinen Struktur und Spontaneität auf dynamische Weise.", "Esculturas construidas a partir de numerosos elementos de vidrio meticulosamente soldados entre sí. Primero se fabrica un armazón metálico que incorpora el cableado eléctrico para la iluminación. Las piezas de vidrio se enmarcan con un ribete especial para unirlas. Estas esculturas abrazan la libertad de expresión artística: la colocación del vidrio sigue la intuición creativa y no planos rígidos. Las piezas muestran formas caóticas que aspiran a la simetría, capturando una mezcla dinámica de estructura y espontaneidad."],
    "Tiffany Vitrage": ["Tiffany-Glasmalerei", "Vitral Tiffany"],
    "The copper foil method perfected by Louis Comfort Tiffany. The process begins with detailed drawings divided into individual pieces. Colored glass sheets are chosen, traced, and cut precisely. Each piece is wrapped with adhesive copper foil, then assembled and soldered with tin-lead solder. Works (60×90 cm or 80×120 cm) are installed in custom light boxes with LED backlighting — warm colours create comfort and joy, cooler colors induce calm and contemplation.": ["Die von Louis Comfort Tiffany perfektionierte Kupferfolientechnik. Der Prozess beginnt mit detaillierten Zeichnungen, die in einzelne Teile zerlegt werden. Farbglasscheiben werden ausgewählt, angezeichnet und präzise zugeschnitten. Jedes Stück wird mit selbstklebender Kupferfolie umwickelt, anschließend zusammengesetzt und mit Zinn-Blei-Lot verlötet. Die Arbeiten (60 × 90 cm oder 80 × 120 cm) werden in maßgefertigte Leuchtkästen mit LED-Hinterleuchtung eingesetzt — warme Farben schaffen Geborgenheit und Freude, kühlere Farben wirken beruhigend und laden zur Kontemplation ein.", "El método de la lámina de cobre perfeccionado por Louis Comfort Tiffany. El proceso comienza con dibujos detallados divididos en piezas individuales. Se eligen las láminas de vidrio de color, se calcan y se cortan con precisión. Cada pieza se envuelve con lámina de cobre adhesiva y después se ensambla y se suelda con estaño-plomo. Las obras (60×90 cm u 80×120 cm) se instalan en cajas de luz a medida con retroiluminación LED: los colores cálidos transmiten confort y alegría; los más fríos inducen calma y contemplación."],
    "Workspace": ["Atelier", "Taller"],
    "Inside the studio": ["Einblick ins Atelier", "Dentro del estudio"],
    "A vaulted basement filled with hundreds of glass sheets in every shade — the quiet workshop where every sculpture begins. Stacks of coloured glass, lead came, soldering tools and cardboard boxes of off-cuts: the raw material of light, organised and waiting.": ["Ein Gewölbekeller voller Hunderter Glasscheiben in allen Farbtönen — die stille Werkstatt, in der jede Skulptur beginnt. Stapel von Farbglas, Bleiruten, Lötwerkzeug und Kartons voller Reststücke: das Rohmaterial des Lichts, geordnet und bereit.", "Un sótano abovedado lleno de cientos de láminas de vidrio de todos los tonos: el taller silencioso donde comienza cada escultura. Pilas de vidrio de color, perfiles de plomo, herramientas de soldadura y cajas de cartón con recortes: la materia prima de la luz, ordenada y a la espera."],
    "Side Products": ["Nebenprodukte", "Productos secundarios"],
    "Glass off-cuts & small forms": ["Glasreste & kleine Formen", "Recortes de vidrio y pequeñas formas"],
    "A series of small one-of-a-kind objects assembled from leftover stained-glass shapes — soldered, polished and turned into hand-sized pieces. Each fragment carries the same colour and structure as the larger sculptures, but in a form you can hold.": ["Eine Serie kleiner Unikate, zusammengesetzt aus übrig gebliebenen Glasstücken — gelötet, poliert und zu handlichen Objekten verarbeitet. Jedes Fragment trägt dieselbe Farbe und Struktur wie die großen Skulpturen, aber in einer Form, die man in der Hand halten kann.", "Una serie de pequeños objetos únicos ensamblados a partir de fragmentos sobrantes de vidriera: soldados, pulidos y convertidos en piezas del tamaño de una mano. Cada fragmento conserva el mismo color y la misma estructura que las esculturas grandes, pero en una forma que se puede sostener."],
    "Extended collection": ["Erweiterte Sammlung", "Colección ampliada"],
    "Due to the open-ended nature of abstraction, each viewer can find their own symbols, archetypes or interpretations within it, making each viewing a unique experience.": ["Durch die Offenheit der Abstraktion kann jeder Betrachter darin eigene Symbole, Archetypen oder Deutungen finden — und so wird jede Betrachtung zu einer einzigartigen Erfahrung.", "Debido a la naturaleza abierta de la abstracción, cada espectador puede encontrar en ella sus propios símbolos, arquetipos o interpretaciones, haciendo de cada contemplación una experiencia única."],
    "Philosophy": ["Philosophie", "Filosofía"],
    "The art of immersion": ["Die Kunst des Eintauchens", "El arte de la inmersión"],
    "Three pillars of artistic practice that guide every work and define the relationship between artwork and viewer.": ["Drei Säulen der künstlerischen Praxis, die jedes Werk leiten und die Beziehung zwischen Kunstwerk und Betrachter bestimmen.", "Tres pilares de la práctica artística que guían cada obra y definen la relación entre la obra y el espectador."],
    "Personal Immersion": ["Persönliches Eintauchen", "Inmersión personal"],
    "Each viewer finds their own symbols, archetypes, and interpretations within the abstract work. Every encounter is unique and deeply personal. The artwork becomes a mirror of the viewer's inner world — a space of self-reflection and contemplative absorption.": ["Jeder Betrachter findet im abstrakten Werk eigene Symbole, Archetypen und Deutungen. Jede Begegnung ist einzigartig und zutiefst persönlich. Das Kunstwerk wird zum Spiegel der inneren Welt des Betrachters — zu einem Raum der Selbstreflexion und kontemplativen Versenkung.", "Cada espectador encuentra sus propios símbolos, arquetipos e interpretaciones dentro de la obra abstracta. Cada encuentro es único y profundamente personal. La obra se convierte en un espejo del mundo interior del espectador: un espacio de autorreflexión y absorción contemplativa."],
    "Abstract Innovation": ["Abstrakte Innovation", "Innovación abstracta"],
    "Departing from traditional concrete depictions opens new paths of exploration through innovative approaches to color, light, and geometric abstraction. Stained glass becomes an experimental platform where new visual languages are explored and developed.": ["Die Abkehr von traditionellen, gegenständlichen Darstellungen eröffnet neue Wege durch einen innovativen Umgang mit Farbe, Licht und geometrischer Abstraktion. Die Glasmalerei wird zur Experimentierplattform, auf der neue Bildsprachen erforscht und entwickelt werden.", "Alejarse de las representaciones concretas tradicionales abre nuevos caminos de exploración mediante enfoques innovadores del color, la luz y la abstracción geométrica. La vidriera se convierte en una plataforma experimental donde se exploran y desarrollan nuevos lenguajes visuales."],
    "Spiritual Perception": ["Spirituelle Wahrnehmung", "Percepción espiritual"],
    "Changing styles and techniques influence aesthetic and spiritual perception, offering new forms for integration into contemporary art and architecture. Glass becomes a medium between light consciousness and spatial experience.": ["Wandelnde Stile und Techniken beeinflussen die ästhetische und spirituelle Wahrnehmung und bieten neue Formen für zeitgenössische Kunst und Architektur. Glas wird zum Medium zwischen Lichtbewusstsein und räumlichem Erleben.", "Los estilos y técnicas cambiantes influyen en la percepción estética y espiritual, ofreciendo nuevas formas de integración en el arte y la arquitectura contemporáneos. El vidrio se convierte en un medio entre la conciencia de la luz y la experiencia espacial."],
    "Residency": ["Residenz", "Residencia"],
    "1500m² independent art space joining the expansive operations of Berlin Arena Treptow. With a strong emphasis on performing and contemporary arts, equipped with artist studios, rehearsing rooms and 4D sound. Independent and inspired by modern hybrid cultural spaces such as Gaîté Lyrique and Palais de Tokyo (Paris), Arena Contemporary aims to break the stillness of established art institutions and build a bridge of opportunity, inspiration, and participation towards the higher arts.": ["Ein 1500 m² großer unabhängiger Kunstraum, Teil des weitläufigen Geländes der Arena Berlin in Treptow. Mit starkem Fokus auf darstellende und zeitgenössische Kunst, ausgestattet mit Künstlerateliers, Proberäumen und 4D-Sound. Unabhängig und inspiriert von modernen hybriden Kulturorten wie der Gaîté Lyrique und dem Palais de Tokyo (Paris) will Arena Contemporary die Starre etablierter Kunstinstitutionen aufbrechen und eine Brücke der Möglichkeiten, der Inspiration und der Teilhabe hin zu den höheren Künsten schlagen.", "Un espacio de arte independiente de 1500 m² integrado en el amplio complejo de la Arena Berlin en Treptow. Con un fuerte enfoque en las artes escénicas y contemporáneas, cuenta con estudios de artistas, salas de ensayo y sonido 4D. Independiente e inspirado en espacios culturales híbridos modernos como la Gaîté Lyrique y el Palais de Tokyo (París), Arena Contemporary aspira a romper la quietud de las instituciones artísticas establecidas y tender un puente de oportunidades, inspiración y participación hacia las artes superiores."],
    "Join the artist": ["Mit dem Künstler in Kontakt treten", "Contacta con el artista"],
    "Whether you're interested in collaboration, artworks to order or buy, discussing a project, or simply sharing your thoughts.": ["Ob Zusammenarbeit, Auftragsarbeiten oder der Kauf eines Werks, ein Projekt, über das Sie sprechen möchten, oder einfach Ihre Gedanken — ich freue mich, von Ihnen zu hören.", "Ya sea que te interese colaborar, encargar o comprar obras, hablar de un proyecto o simplemente compartir tus ideas."],
    "For questions, collaborations or purchases": ["Für Fragen, Kooperationen oder Ankäufe", "Para preguntas, colaboraciones o compras"],
    "Name": ["Name", "Nombre"],
    "Email": ["E-Mail", "Correo electrónico"],
    "Subject": ["Betreff", "Asunto"],
    "Message": ["Nachricht", "Mensaje"],
    "Send Message": ["Nachricht senden", "Enviar mensaje"],
    "Thank you! I will get back to you soon.": ["Vielen Dank! Ich melde mich bald bei Ihnen.", "¡Gracias! Me pondré en contacto contigo pronto."],
    "Moving images and stories": ["Bewegte Bilder und Geschichten", "Imágenes en movimiento e historias"],
    "Video works that explore the abstract world of light and movement — from kinetic art objects to immersive visual explorations.": ["Videoarbeiten, die die abstrakte Welt von Licht und Bewegung erkunden — von kinetischen Kunstobjekten bis zu immersiven visuellen Erkundungen.", "Obras en vídeo que exploran el mundo abstracto de la luz y el movimiento: desde objetos de arte cinético hasta exploraciones visuales inmersivas."],
    "Abstract visual exploration — 2024": ["Abstrakte visuelle Erkundung — 2024", "Exploración visual abstracta — 2024"],
    "Kinetic Art Objects": ["Kinetische Kunstobjekte", "Objetos de arte cinético"],
    "Movement and form in harmony — 2024": ["Bewegung und Form im Einklang — 2024", "Movimiento y forma en armonía — 2024"],
    "Chromatic Flow": ["Chromatischer Fluss", "Flujo cromático"],
    "Color transitions through glass — 2025": ["Farbübergänge durch Glas — 2025", "Transiciones de color a través del vidrio — 2025"],
    "Glass Rotation": ["Glasrotation", "Rotación de vidrio"],
    "Spinning light through stained glass — 2025": ["Kreisendes Licht durch farbiges Glas — 2025", "Luz giratoria a través de la vidriera — 2025"],
    "Installation Orbit": ["Orbit um die Installation", "Órbita de la instalación"],
    "Camera movement around glass installation — 2025": ["Kamerafahrt um eine Glasinstallation — 2025", "Movimiento de cámara alrededor de una instalación de vidrio — 2025"],
    "Prismatic Dance": ["Prismatischer Tanz", "Danza prismática"],
    "Refracted light in motion — 2025": ["Gebrochenes Licht in Bewegung — 2025", "Luz refractada en movimiento — 2025"],
    "Spectrum Shift": ["Spektralverschiebung", "Cambio de espectro"],
    "Color spectrum transformations — 2025": ["Wandlungen des Farbspektrums — 2025", "Transformaciones del espectro de color — 2025"],
    "Geometric Harmony": ["Geometrische Harmonie", "Armonía geométrica"],
    "Balance of geometric glass forms — 2025": ["Gleichgewicht geometrischer Glasformen — 2025", "Equilibrio de formas geométricas de vidrio — 2025"],
    "Crystal Structure": ["Kristallstruktur", "Estructura cristalina"],
    "Structural clarity in glass composition — 2025": ["Strukturelle Klarheit in der Glaskomposition — 2025", "Claridad estructural en la composición de vidrio — 2025"],
    "Color Field": ["Farbfeld", "Campo de color"],
    "Saturated color planes in glass — 2025": ["Gesättigte Farbflächen im Glas — 2025", "Planos de color saturado en vidrio — 2025"],
    "Stained Mosaic": ["Glasmosaik", "Mosaico de vidriera"],
    "Mosaic patterns in stained glass — 2025": ["Mosaikmuster in farbigem Glas — 2025", "Patrones de mosaico en vidriera — 2025"],
    "Radiant Forms": ["Strahlende Formen", "Formas radiantes"],
    "Glowing abstract shapes — 2025": ["Leuchtende abstrakte Formen — 2025", "Formas abstractas luminosas — 2025"],
    "Glass Artwork Process": ["Entstehung eines Glaskunstwerks", "Proceso de una obra en vidrio"],
    "Creative process — 2025": ["Kreativer Prozess — 2025", "Proceso creativo — 2025"],
    "Glass Sculpture": ["Glasskulptur", "Escultura de vidrio"],
    "Sculptural glass work — 2025": ["Skulpturale Glasarbeit — 2025", "Obra escultórica en vidrio — 2025"],
    "Neo-Gothic Exhibition": ["Neugotische Ausstellung", "Exposición neogótica"],
    "Enter the Void — Bashmet Centre, 2023": ["Enter the Void — Baschmet-Zentrum, 2023", "Enter the Void — Centro Bashmet, 2023"],
    "Stained Glass Kaleidoscope": ["Kaleidoskop aus Glas", "Caleidoscopio de vidriera"],
    "18 works — chaos forming harmonious composition": ["18 Werke — Chaos, das sich zu einer harmonischen Komposition fügt", "18 obras: el caos formando una composición armoniosa"],
    "Glass installation — Berlin, 2024": ["Glasinstallation — Berlin, 2024", "Instalación de vidrio — Berlín, 2024"],
    "Light Sculptures": ["Lichtskulpturen", "Esculturas de luz"],
    "Colored glass and light — 2024": ["Farbglas und Licht — 2024", "Vidrio de color y luz — 2024"],
    "Light Passage": ["Lichtdurchgang", "Paso de luz"],
    "Rays filtering through colored panels — 2025": ["Strahlen, die durch farbige Scheiben fallen — 2025", "Rayos que se filtran a través de paneles de color — 2025"],
    "Glass Meditation": ["Glasmeditation", "Meditación en vidrio"],
    "Contemplative glass study — 2025": ["Kontemplative Glasstudie — 2025", "Estudio contemplativo en vidrio — 2025"],
    "Studio Fragment": ["Atelierfragment", "Fragmento del estudio"],
    "Behind the scenes in the studio — 2025": ["Hinter den Kulissen im Atelier — 2025", "Entre bastidores en el estudio — 2025"],
    "Amber Reflections": ["Bernsteinreflexe", "Reflejos ámbar"],
    "Warm tones and reflective surfaces — 2025": ["Warme Töne und spiegelnde Oberflächen — 2025", "Tonos cálidos y superficies reflectantes — 2025"],
    "Luminous Grid": ["Leuchtendes Raster", "Retícula luminosa"],
    "Grid patterns illuminated from within — 2025": ["Von innen beleuchtete Rastermuster — 2025", "Patrones de retícula iluminados desde dentro — 2025"],
    "Light Architecture": ["Lichtarchitektur", "Arquitectura de luz"],
    "Architectural light through glass — 2025": ["Architektonisches Licht durch Glas — 2025", "Luz arquitectónica a través del vidrio — 2025"],
    "Color Convergence": ["Farbkonvergenz", "Convergencia de color"],
    "Colors merging through light — 2025": ["Farben, die im Licht verschmelzen — 2025", "Colores que se funden con la luz — 2025"],
    "Translucent Depths": ["Durchscheinende Tiefen", "Profundidades translúcidas"],
    "Layered transparency in glass — 2025": ["Geschichtete Transparenz im Glas — 2025", "Transparencia en capas en el vidrio — 2025"],
    "Solo Exhibition": ["Einzelausstellung", "Exposición individual"],
    "Group Exhibition": ["Gruppenausstellung", "Exposición colectiva"],
    "Installation": ["Installation", "Instalación"],
    "Halls": ["Säle", "Salas"],
    "Kinetic Sculptures": ["Kinetische Skulpturen", "Esculturas cinéticas"],
    "Stained-glass": ["Glasbilder", "Vidrieras"],
    "Graphic Drawings": ["Grafische Zeichnungen", "Dibujos gráficos"],
    "Artworks": ["Kunstwerke", "Obras"],
    "Musicians": ["Musiker", "Músicos"],
    "Visitors": ["Besucher", "Visitantes"],
    "2×4m": ["2×4 m", "2×4 m"],
    "From 2024 up to the present": ["Seit 2024 bis heute", "Desde 2024 hasta la actualidad"],
    "Saturday / April. 4 2026": ["Samstag, 4. April 2026", "Sábado, 4 de abril de 2026"],
    "Club der Visionäre — Berlin": ["Club der Visionäre — Berlin", "Club der Visionäre — Berlín"],
    "Club der Visionäre, Berlin, Germany": ["Club der Visionäre, Berlin, Deutschland", "Club der Visionäre, Berlín, Alemania"],
    "5, rue Duvivier — 75007 Paris, France": ["5, rue Duvivier — 75007 Paris, Frankreich", "5, rue Duvivier — 75007 París, Francia"],
    "Noisy-le-Grand, Microcredit Paris, France": ["Noisy-le-Grand, Microcredit Paris, Frankreich", "Noisy-le-Grand, Microcredit Paris, Francia"],
    "Neo-Gothic Mansion — Bashmet Centre": ["Neugotische Villa — Baschmet-Zentrum", "Mansión neogótica — Centro Bashmet"],
    "ASTERION | Theater Butoh show": ["ASTERION | Butoh-Theatershow", "ASTERION | Espectáculo de teatro butoh"],
    "Perhaps I have created the stars and the sun and this enormous house, but I no longer remember (Jorge Luis Borges) Final workshop presentation Directed by Valentin Tszin SOUND by Makoto Sakamoto @makoto_sakamoto_recordings SET DESIGN Arthemii Ionaere @ionaere & Vasya Berezin @berezinvasya LIGHT Philipp Tholey GRAPHICS Mascha Rodigina @mascharodigina Workshop participants 1. Alyy Space @alyyspace 2. Evgeniia Borzykh 3. Heri Shin @fabulous_heri 4. Jianyu Wang 5. Jonathan Reimann 6. Kara Kuckoo @karakuckoo 7. Laura Gomez 8. Little Vanya 9. Maurice Ginsberg 10. Noemi Schrader 11. Ohii Katya 12. Rand El Zein 13. Rossana Signorile 14. Serena Landriel 15. Vasya Berezin 16. Wenke Schladitz @wenke__s": ["Vielleicht habe ich die Sterne und die Sonne und dieses riesige Haus erschaffen, aber ich erinnere mich nicht mehr (Jorge Luis Borges) Abschlusspräsentation des Workshops Regie: Valentin Tszin SOUND: Makoto Sakamoto @makoto_sakamoto_recordings BÜHNENBILD: Arthemii Ionaere @ionaere & Vasya Berezin @berezinvasya LICHT: Philipp Tholey GRAFIK: Mascha Rodigina @mascharodigina Workshop-Teilnehmende 1. Alyy Space @alyyspace 2. Evgeniia Borzykh 3. Heri Shin @fabulous_heri 4. Jianyu Wang 5. Jonathan Reimann 6. Kara Kuckoo @karakuckoo 7. Laura Gomez 8. Little Vanya 9. Maurice Ginsberg 10. Noemi Schrader 11. Ohii Katya 12. Rand El Zein 13. Rossana Signorile 14. Serena Landriel 15. Vasya Berezin 16. Wenke Schladitz @wenke__s", "Quizá yo he creado las estrellas y el sol y la enorme casa, pero ya no me acuerdo (Jorge Luis Borges) Presentación final del taller Dirección: Valentin Tszin SONIDO: Makoto Sakamoto @makoto_sakamoto_recordings ESCENOGRAFÍA: Arthemii Ionaere @ionaere & Vasya Berezin @berezinvasya ILUMINACIÓN: Philipp Tholey GRÁFICA: Mascha Rodigina @mascharodigina Participantes del taller 1. Alyy Space @alyyspace 2. Evgeniia Borzykh 3. Heri Shin @fabulous_heri 4. Jianyu Wang 5. Jonathan Reimann 6. Kara Kuckoo @karakuckoo 7. Laura Gomez 8. Little Vanya 9. Maurice Ginsberg 10. Noemi Schrader 11. Ohii Katya 12. Rand El Zein 13. Rossana Signorile 14. Serena Landriel 15. Vasya Berezin 16. Wenke Schladitz @wenke__s"],
    "A vibrant and futuristic glass sculpture installation designed to reflect the dynamic energy and eclectic spirit of the venue. Each piece of colored glass is meticulously crafted to capture and play with natural and artificial lights. As sunlight streams through during the day, the installation casts a mosaic of vivid, dancing colors across the wooden beams. By night, the pieces glow under the club's lights, creating a flowing river of color that mirrors the famous waterfront setting.": ["Eine lebendige, futuristische Installation aus Glasskulpturen, die die dynamische Energie und den eklektischen Geist des Ortes widerspiegelt. Jedes Stück Farbglas ist sorgfältig gefertigt, um natürliches und künstliches Licht einzufangen und mit ihm zu spielen. Wenn tagsüber das Sonnenlicht hindurchströmt, wirft die Installation ein Mosaik aus leuchtenden, tanzenden Farben auf die Holzbalken. Nachts glühen die Stücke im Licht des Clubs und bilden einen fließenden Farbstrom, der die berühmte Lage am Wasser widerspiegelt.", "Una instalación de esculturas de vidrio vibrante y futurista, concebida para reflejar la energía dinámica y el espíritu ecléctico del lugar. Cada pieza de vidrio de color está meticulosamente elaborada para captar y jugar con la luz natural y artificial. Cuando la luz del sol la atraviesa durante el día, la instalación proyecta un mosaico de colores vivos y danzantes sobre las vigas de madera. De noche, las piezas brillan bajo las luces del club, creando un río fluido de color que refleja el famoso entorno junto al agua."],
    "The exhibition “Architecture of Light: Form and Reflections of Reality” is an exhibition where architectural forms made by coloured glass act as a means to visualize the physical properties of light - refraction, reflection and dichroism. This exhibition shows how changes in the structure and shape of glass objects can influence the optical effects created by the interaction of light with the material. Each work demonstrates a unique combination of architectural free forms that explore the principles of optical physics. The use of asymmetrical shapes and colored glass allows for complex visual effects, reflecting and scattering light rays into unexpected patterns and shapes. The exhibition aims at its own internal exploration and demonstration of how art objects can interact with space. It is an opportunity to look at optical phenomena through the prism of artistic perception, combining aesthetics with science in the search for new visual and architectural manifestations. Exhibition exploring the interplay between light and colored glass, which together create a visually-optical architecture. Features six kinetic sculptures from summer 2024 utilizing refraction, light reflection, and diffraction. 35 works across 7 halls, uniting static and kinetic sculptures plus stained-glass installations.": ["In der Ausstellung „Architecture of Light: Form and Reflections of Reality“ dienen architektonische Formen aus Farbglas dazu, die physikalischen Eigenschaften des Lichts sichtbar zu machen — Brechung, Reflexion und Dichroismus. Die Ausstellung zeigt, wie Veränderungen in Struktur und Form von Glasobjekten die optischen Effekte beeinflussen, die durch das Zusammenspiel von Licht und Material entstehen. Jedes Werk zeigt eine einzigartige Kombination architektonischer freier Formen, die die Prinzipien der optischen Physik erkunden. Asymmetrische Formen und Farbglas ermöglichen komplexe visuelle Effekte, die Lichtstrahlen zu unerwarteten Mustern und Formen reflektieren und streuen. Die Ausstellung versteht sich als eigene innere Erkundung und als Demonstration, wie Kunstobjekte mit dem Raum interagieren können. Sie bietet die Gelegenheit, optische Phänomene durch das Prisma künstlerischer Wahrnehmung zu betrachten und Ästhetik mit Wissenschaft zu verbinden — auf der Suche nach neuen visuellen und architektonischen Ausdrucksformen. Eine Ausstellung über das Zusammenspiel von Licht und Farbglas, die gemeinsam eine visuell-optische Architektur erschaffen. Gezeigt werden sechs kinetische Skulpturen aus dem Sommer 2024, die Brechung, Reflexion und Beugung des Lichts nutzen. 35 Werke in 7 Sälen vereinen statische und kinetische Skulpturen sowie Glasinstallationen.", "La exposición «Architecture of Light: Form and Reflections of Reality» es una muestra en la que formas arquitectónicas de vidrio de color sirven para visualizar las propiedades físicas de la luz: refracción, reflexión y dicroísmo. La exposición muestra cómo los cambios en la estructura y la forma de los objetos de vidrio pueden influir en los efectos ópticos que surgen de la interacción de la luz con el material. Cada obra presenta una combinación única de formas libres arquitectónicas que exploran los principios de la física óptica. El uso de formas asimétricas y vidrio de color permite efectos visuales complejos, que reflejan y dispersan los rayos de luz en patrones y formas inesperados. La exposición se plantea como una exploración interior propia y como una demostración de cómo los objetos artísticos pueden interactuar con el espacio. Es una oportunidad para observar los fenómenos ópticos a través del prisma de la percepción artística, combinando estética y ciencia en la búsqueda de nuevas manifestaciones visuales y arquitectónicas. Una exposición que explora la interacción entre la luz y el vidrio de color, que juntos crean una arquitectura visual y óptica. Presenta seis esculturas cinéticas del verano de 2024 que utilizan la refracción, la reflexión y la difracción de la luz. 35 obras en 7 salas reúnen esculturas estáticas y cinéticas, además de instalaciones de vidriera."],
    "Exposition de Peinture & Dessin — Journées portes ouvertes de printemps 2024. Painting and drawing exploring the sources of artistic inspiration. Vladimir Kouptsov Privalov dit Arthemii.": ["Exposition de Peinture & Dessin — Journées portes ouvertes de printemps 2024. Malerei und Zeichnung auf der Suche nach den Quellen künstlerischer Inspiration. Vladimir Kouptsov Privalov dit Arthemii.", "Exposition de Peinture & Dessin — Journées portes ouvertes de printemps 2024. Pintura y dibujo que exploran las fuentes de la inspiración artística. Vladimir Kouptsov Privalov dit Arthemii."],
    "Research on interactions between viewers and neuroArt. Part of ongoing research on human interaction with artificial intelligence and the search for subconsciousness in machines. Participants documented observations below artworks — noticed symbols, architecture, situations, and archetypes. Data was fed to AI neural networks to train machine interpretation skills through human perception examples.": ["Forschung zur Interaktion zwischen Betrachtern und NeuroArt. Teil einer laufenden Untersuchung der Interaktion zwischen Mensch und künstlicher Intelligenz und der Suche nach dem Unterbewussten in Maschinen. Die Teilnehmenden notierten unter den Werken ihre Beobachtungen — erkannte Symbole, Architektur, Situationen und Archetypen. Diese Daten wurden in neuronale KI-Netze eingespeist, um maschinelle Interpretationsfähigkeiten anhand von Beispielen menschlicher Wahrnehmung zu trainieren.", "Investigación sobre la interacción entre espectadores y el neuroArt. Forma parte de una investigación continua sobre la interacción humana con la inteligencia artificial y la búsqueda del subconsciente en las máquinas. Los participantes anotaron sus observaciones debajo de las obras: símbolos, arquitectura, situaciones y arquetipos percibidos. Los datos se introdujeron en redes neuronales de IA para entrenar la capacidad de interpretación de las máquinas a partir de ejemplos de percepción humana."],
    "A captivating showcase of colored glass sculptures demonstrating a masterful fusion of Gothic and futuristic aesthetics. The historical ambiance of the mansion perfectly complemented the modern designs of the glass artworks. Each piece, through its placement and the play of light, narrated a story of its own, casting vibrant colors and intriguing shadows that animated the grand old spaces. Live ambient and experimental music shows throughout the exhibition.": ["Eine fesselnde Schau von Farbglasskulpturen, die gotische und futuristische Ästhetik meisterhaft verbindet. Das historische Ambiente der Villa ergänzte die modernen Formen der Glaskunstwerke perfekt. Jedes Werk erzählte durch seine Platzierung und das Spiel des Lichts seine eigene Geschichte und warf leuchtende Farben und faszinierende Schatten, die die großen alten Räume belebten. Während der gesamten Ausstellung fanden Live-Konzerte mit Ambient- und experimenteller Musik statt.", "Una cautivadora muestra de esculturas de vidrio de color que demuestra una magistral fusión de la estética gótica y futurista. El ambiente histórico de la mansión complementó a la perfección los diseños modernos de las obras de vidrio. Cada pieza, a través de su ubicación y del juego de la luz, narraba su propia historia, proyectando colores vibrantes y sombras intrigantes que animaban los grandes y antiguos espacios. Durante toda la exposición hubo conciertos en directo de música ambient y experimental."],
    "A captivating showcase of colored glass sculptures demonstrating a masterful fusion of Gothic and futuristic architectural aesthetics. The historical ambiance of the mansion perfectly complemented the modern designs of the glass artworks. Each piece, through its placement and the play of light, narrated a story of its own, casting vibrant colors and intriguing shadows that animated the grand old spaces. Live ambient and experimental music shows throughout the exhibition.": ["Eine fesselnde Schau von Farbglasskulpturen, die gotische und futuristische architektonische Ästhetik meisterhaft verbindet. Das historische Ambiente der Villa ergänzte die modernen Formen der Glaskunstwerke perfekt. Jedes Werk erzählte durch seine Platzierung und das Spiel des Lichts seine eigene Geschichte und warf leuchtende Farben und faszinierende Schatten, die die großen alten Räume belebten. Während der gesamten Ausstellung fanden Live-Konzerte mit Ambient- und experimenteller Musik statt.", "Una cautivadora muestra de esculturas de vidrio de color que demuestra una magistral fusión de la estética arquitectónica gótica y futurista. El ambiente histórico de la mansión complementó a la perfección los diseños modernos de las obras de vidrio. Cada pieza, a través de su ubicación y del juego de la luz, narraba su propia historia, proyectando colores vibrantes y sombras intrigantes que animaban los grandes y antiguos espacios. Durante toda la exposición hubo conciertos en directo de música ambient y experimental."],
    "Abstract glass composition exploring geometric forms and color relationships.": ["Abstrakte Glaskomposition, die geometrische Formen und Farbbeziehungen erkundet.", "Composición abstracta en vidrio que explora formas geométricas y relaciones de color."],
    "Three-dimensional colored glass sculpture creating dynamic shadow patterns.": ["Dreidimensionale Farbglasskulptur, die dynamische Schattenmuster erzeugt.", "Escultura tridimensional de vidrio de color que crea patrones de sombra dinámicos."],
    "Dichroic glass that shifts colors depending on the viewing angle and light source.": ["Dichroitisches Glas, dessen Farben sich je nach Blickwinkel und Lichtquelle verändern.", "Vidrio dicroico que cambia de color según el ángulo de visión y la fuente de luz."],
    "Enhanced photographic study capturing light passing through layered glass.": ["Bearbeitete fotografische Studie von Licht, das durch geschichtetes Glas fällt.", "Estudio fotográfico retocado que captura la luz al atravesar capas de vidrio."],
    "Epsylon — geometric glass sculpture featuring precise angles and bold color contrasts.": ["Epsylon — geometrische Glasskulptur mit präzisen Winkeln und kräftigen Farbkontrasten.", "Epsylon: escultura geométrica de vidrio con ángulos precisos y audaces contrastes de color."],
    "Evening work session capturing the atmosphere of late-night creative exploration.": ["Abendliche Arbeitssitzung, die die Atmosphäre nächtlicher kreativer Erkundung einfängt.", "Sesión de trabajo vespertina que captura la atmósfera de la exploración creativa nocturna."],
    "Exhibition view showing the interplay between glass artworks and architectural space.": ["Ausstellungsansicht, die das Zusammenspiel von Glaskunstwerken und architektonischem Raum zeigt.", "Vista de la exposición que muestra la interacción entre las obras de vidrio y el espacio arquitectónico."],
    "Close-up showing the precision of copper foil soldering and the rich color palette.": ["Nahaufnahme, die die Präzision der Kupferfolien-Lötung und die reiche Farbpalette zeigt.", "Primer plano que muestra la precisión de la soldadura con lámina de cobre y la rica paleta de colores."],
    "Compositional study exploring balance, color harmony, and spatial relationships in glass.": ["Kompositionsstudie zu Gleichgewicht, Farbharmonie und räumlichen Beziehungen im Glas.", "Estudio compositivo que explora el equilibrio, la armonía del color y las relaciones espaciales en el vidrio."],
    "Study in depth — multiple glass panels creating visual complexity and dimensional illusion.": ["Studie der Tiefe — mehrere Glasscheiben erzeugen visuelle Komplexität und räumliche Illusion.", "Estudio de profundidad: varios paneles de vidrio crean complejidad visual e ilusión dimensional."],
    "Glass lamp combining functional lighting with artistic stained glass and integrated LED illumination.": ["Glaslampe, die funktionale Beleuchtung mit künstlerischer Glasmalerei und integrierter LED-Beleuchtung verbindet.", "Lámpara de vidrio que combina iluminación funcional con vidriera artística e iluminación LED integrada."],
    "Sculptural detail showing the fusion of metal framework with colored glass elements.": ["Skulpturdetail, das die Verbindung von Metallrahmen und Farbglaselementen zeigt.", "Detalle escultórico que muestra la fusión del armazón metálico con elementos de vidrio de color."],
    "Huerrytop — dynamic sculptural form constructed from dozens of individually cut colored glass elements.": ["Huerrytop — dynamische skulpturale Form aus Dutzenden einzeln zugeschnittener Farbglaselemente.", "Huerrytop: forma escultórica dinámica construida con decenas de elementos de vidrio de color cortados uno a uno."],
    "Huweado — flowing glass composition inspired by natural forms and organic geometry.": ["Huweado — fließende Glaskomposition, inspiriert von natürlichen Formen und organischer Geometrie.", "Huweado: composición fluida en vidrio inspirada en formas naturales y geometría orgánica."],
    "Immersive installation at Club der Visionäre, Berlin — deep colored shadows transform the space.": ["Immersive Installation im Club der Visionäre, Berlin — tiefe farbige Schatten verwandeln den Raum.", "Instalación inmersiva en el Club der Visionäre, Berlín: profundas sombras de color transforman el espacio."],
    "Light installation where colored glass panels project shifting patterns onto surrounding surfaces.": ["Lichtinstallation, bei der farbige Glasscheiben wechselnde Muster auf die umgebenden Flächen projizieren.", "Instalación lumínica en la que paneles de vidrio de color proyectan patrones cambiantes sobre las superficies circundantes."],
    "Olymp — large-scale glass sculpture with integrated lighting from the Paris exhibition.": ["Olymp — großformatige Glasskulptur mit integrierter Beleuchtung aus der Pariser Ausstellung.", "Olymp: escultura de vidrio de gran formato con iluminación integrada, de la exposición de París."],
    "Prism — exploring light refraction and color dispersion through precisely cut and assembled colored glass.": ["Prisma — eine Erkundung von Lichtbrechung und Farbzerlegung durch präzise geschnittenes und zusammengesetztes Farbglas.", "Prisma: exploración de la refracción de la luz y la dispersión del color mediante vidrio de color cortado y ensamblado con precisión."],
    "Step-by-step creation process for a stained glass artwork.": ["Schritt-für-Schritt-Entstehung eines Glaskunstwerks.", "Proceso de creación paso a paso de una obra de vidriera."],
    "Recent work from 2025 showing the evolution of technique and artistic vision.": ["Neue Arbeit aus dem Jahr 2025, die die Entwicklung von Technik und künstlerischer Vision zeigt.", "Obra reciente de 2025 que muestra la evolución de la técnica y la visión artística."],
    "Shteryit — abstract glass exploring the tension between order and chaos.": ["Shteryit — abstraktes Glas, das die Spannung zwischen Ordnung und Chaos erkundet.", "Shteryit: vidrio abstracto que explora la tensión entre el orden y el caos."],
    "Signature stained glass piece — chaos striving for symmetry.": ["Charakteristisches Glaswerk — Chaos, das nach Symmetrie strebt.", "Pieza de vidriera emblemática: el caos que aspira a la simetría."],
    "Stained glass composition featuring interlocking colored glass pieces with contemporary abstract design.": ["Glasmalerei-Komposition aus ineinandergreifenden Farbglasstücken in zeitgenössischem abstraktem Design.", "Composición de vidriera con piezas de vidrio de color entrelazadas y un diseño abstracto contemporáneo."],
    "Documentation of the creative process — from initial concept through material selection to final assembly.": ["Dokumentation des kreativen Prozesses — vom ersten Konzept über die Materialauswahl bis zur Endmontage.", "Documentación del proceso creativo: desde el concepto inicial y la selección de materiales hasta el ensamblaje final."],
    "Vertical format work exploring the relationship between gravity, light, and colored glass.": ["Arbeit im Hochformat, die die Beziehung zwischen Schwerkraft, Licht und Farbglas erkundet.", "Obra en formato vertical que explora la relación entre la gravedad, la luz y el vidrio de color."],
    "Abstract glass composition": ["Abstrakte Glaskomposition", "Composición abstracta en vidrio"],
    "Abstract glass composition — Arthemii Ionaere": ["Abstrakte Glaskomposition — Arthemii Ionaere", "Composición abstracta en vidrio — Arthemii Ionaere"],
    "Abstract glass composition — contemporary stained glass artwork by Arthemii Ionaere.": ["Abstrakte Glaskomposition — zeitgenössische Glaskunst von Arthemii Ionaere.", "Composición abstracta en vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Artwork detail": ["Werkdetail", "Detalle de la obra"],
    "Artwork detail — Arthemii Ionaere": ["Werkdetail — Arthemii Ionaere", "Detalle de la obra — Arthemii Ionaere"],
    "Artwork detail — contemporary stained glass artwork by Arthemii Ionaere.": ["Werkdetail — zeitgenössische Glaskunst von Arthemii Ionaere.", "Detalle de la obra — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Color and light": ["Farbe und Licht", "Color y luz"],
    "Color and light — Arthemii Ionaere": ["Farbe und Licht — Arthemii Ionaere", "Color y luz — Arthemii Ionaere"],
    "Color and light — contemporary stained glass artwork by Arthemii Ionaere.": ["Farbe und Licht — zeitgenössische Glaskunst von Arthemii Ionaere.", "Color y luz — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Colored glass sculpture": ["Farbglasskulptur", "Escultura de vidrio de color"],
    "Colored glass sculpture — Arthemii Ionaere": ["Farbglasskulptur — Arthemii Ionaere", "Escultura de vidrio de color — Arthemii Ionaere"],
    "Colored glass sculpture — contemporary stained glass artwork by Arthemii Ionaere.": ["Farbglasskulptur — zeitgenössische Glaskunst von Arthemii Ionaere.", "Escultura de vidrio de color — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Colored light": ["Farbiges Licht", "Luz de color"],
    "Colored light — Arthemii Ionaere": ["Farbiges Licht — Arthemii Ionaere", "Luz de color — Arthemii Ionaere"],
    "Colored light — contemporary stained glass artwork by Arthemii Ionaere.": ["Farbiges Licht — zeitgenössische Glaskunst von Arthemii Ionaere.", "Luz de color — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Dichroic glass piece": ["Dichroitisches Glasobjekt", "Pieza de vidrio dicroico"],
    "Dichroic glass piece — Arthemii Ionaere": ["Dichroitisches Glasobjekt — Arthemii Ionaere", "Pieza de vidrio dicroico — Arthemii Ionaere"],
    "Dichroic glass piece — contemporary stained glass artwork by Arthemii Ionaere.": ["Dichroitisches Glasobjekt — zeitgenössische Glaskunst von Arthemii Ionaere.", "Pieza de vidrio dicroico — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Enhanced glass study": ["Bearbeitete Glasstudie", "Estudio de vidrio retocado"],
    "Enhanced glass study — Arthemii Ionaere": ["Bearbeitete Glasstudie — Arthemii Ionaere", "Estudio de vidrio retocado — Arthemii Ionaere"],
    "Enhanced glass study — contemporary stained glass artwork by Arthemii Ionaere.": ["Bearbeitete Glasstudie — zeitgenössische Glaskunst von Arthemii Ionaere.", "Estudio de vidrio retocado — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Enhanced glass work": ["Bearbeitete Glasarbeit", "Obra de vidrio retocada"],
    "Enhanced glass work — Arthemii Ionaere": ["Bearbeitete Glasarbeit — Arthemii Ionaere", "Obra de vidrio retocada — Arthemii Ionaere"],
    "Enhanced glass work — contemporary stained glass artwork by Arthemii Ionaere.": ["Bearbeitete Glasarbeit — zeitgenössische Glaskunst von Arthemii Ionaere.", "Obra de vidrio retocada — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Epsylon sculpture": ["Skulptur „Epsylon“", "Escultura «Epsylon»"],
    "Epsylon sculpture — Arthemii Ionaere": ["Skulptur „Epsylon“ — Arthemii Ionaere", "Escultura «Epsylon» — Arthemii Ionaere"],
    "Epsylon sculpture — contemporary stained glass artwork by Arthemii Ionaere.": ["Skulptur „Epsylon“ — zeitgenössische Glaskunst von Arthemii Ionaere.", "Escultura «Epsylon» — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Evening studio session": ["Abendliche Atelierarbeit", "Sesión vespertina en el estudio"],
    "Evening studio session — Arthemii Ionaere": ["Abendliche Atelierarbeit — Arthemii Ionaere", "Sesión vespertina en el estudio — Arthemii Ionaere"],
    "Evening studio session — contemporary stained glass artwork by Arthemii Ionaere.": ["Abendliche Atelierarbeit — zeitgenössische Glaskunst von Arthemii Ionaere.", "Sesión vespertina en el estudio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Exhibition installation": ["Ausstellungsinstallation", "Instalación expositiva"],
    "Exhibition installation — Arthemii Ionaere": ["Ausstellungsinstallation — Arthemii Ionaere", "Instalación expositiva — Arthemii Ionaere"],
    "Exhibition installation — contemporary stained glass artwork by Arthemii Ionaere.": ["Ausstellungsinstallation — zeitgenössische Glaskunst von Arthemii Ionaere.", "Instalación expositiva — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Exhibition piece": ["Ausstellungsstück", "Pieza de exposición"],
    "Exhibition piece — Arthemii Ionaere": ["Ausstellungsstück — Arthemii Ionaere", "Pieza de exposición — Arthemii Ionaere"],
    "Exhibition piece — contemporary stained glass artwork by Arthemii Ionaere.": ["Ausstellungsstück — zeitgenössische Glaskunst von Arthemii Ionaere.", "Pieza de exposición — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Exhibition view": ["Ausstellungsansicht", "Vista de la exposición"],
    "Exhibition view — Arthemii Ionaere": ["Ausstellungsansicht — Arthemii Ionaere", "Vista de la exposición — Arthemii Ionaere"],
    "Exhibition view — contemporary stained glass artwork by Arthemii Ionaere.": ["Ausstellungsansicht — zeitgenössische Glaskunst von Arthemii Ionaere.", "Vista de la exposición — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass and shadow": ["Glas und Schatten", "Vidrio y sombra"],
    "Glass and shadow — Arthemii Ionaere": ["Glas und Schatten — Arthemii Ionaere", "Vidrio y sombra — Arthemii Ionaere"],
    "Glass and shadow — contemporary stained glass artwork by Arthemii Ionaere.": ["Glas und Schatten — zeitgenössische Glaskunst von Arthemii Ionaere.", "Vidrio y sombra — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass artwork detail": ["Detail eines Glaskunstwerks", "Detalle de obra en vidrio"],
    "Glass artwork detail — Arthemii Ionaere": ["Detail eines Glaskunstwerks — Arthemii Ionaere", "Detalle de obra en vidrio — Arthemii Ionaere"],
    "Glass artwork detail — contemporary stained glass artwork by Arthemii Ionaere.": ["Detail eines Glaskunstwerks — zeitgenössische Glaskunst von Arthemii Ionaere.", "Detalle de obra en vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass artwork": ["Glaskunstwerk", "Obra en vidrio"],
    "Glass artwork — Arthemii Ionaere": ["Glaskunstwerk — Arthemii Ionaere", "Obra en vidrio — Arthemii Ionaere"],
    "Glass artwork — contemporary stained glass artwork by Arthemii Ionaere.": ["Glaskunstwerk — zeitgenössische Glaskunst von Arthemii Ionaere.", "Obra en vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass composition study": ["Studie zur Glaskomposition", "Estudio de composición en vidrio"],
    "Glass composition study — Arthemii Ionaere": ["Studie zur Glaskomposition — Arthemii Ionaere", "Estudio de composición en vidrio — Arthemii Ionaere"],
    "Glass composition study — contemporary stained glass artwork by Arthemii Ionaere.": ["Studie zur Glaskomposition — zeitgenössische Glaskunst von Arthemii Ionaere.", "Estudio de composición en vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass composition": ["Glaskomposition", "Composición en vidrio"],
    "Glass composition — Arthemii Ionaere": ["Glaskomposition — Arthemii Ionaere", "Composición en vidrio — Arthemii Ionaere"],
    "Glass composition — contemporary stained glass artwork by Arthemii Ionaere.": ["Glaskomposition — zeitgenössische Glaskunst von Arthemii Ionaere.", "Composición en vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass depth study": ["Tiefenstudie in Glas", "Estudio de profundidad en vidrio"],
    "Glass depth study — Arthemii Ionaere": ["Tiefenstudie in Glas — Arthemii Ionaere", "Estudio de profundidad en vidrio — Arthemii Ionaere"],
    "Glass depth study — contemporary stained glass artwork by Arthemii Ionaere.": ["Tiefenstudie in Glas — zeitgenössische Glaskunst von Arthemii Ionaere.", "Estudio de profundidad en vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass detail": ["Glasdetail", "Detalle de vidrio"],
    "Glass detail — Arthemii Ionaere": ["Glasdetail — Arthemii Ionaere", "Detalle de vidrio — Arthemii Ionaere"],
    "Glass detail — contemporary stained glass artwork by Arthemii Ionaere.": ["Glasdetail — zeitgenössische Glaskunst von Arthemii Ionaere.", "Detalle de vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass framework": ["Glasgerüst", "Estructura de vidrio"],
    "Glass framework — Arthemii Ionaere": ["Glasgerüst — Arthemii Ionaere", "Estructura de vidrio — Arthemii Ionaere"],
    "Glass framework — contemporary stained glass artwork by Arthemii Ionaere.": ["Glasgerüst — zeitgenössische Glaskunst von Arthemii Ionaere.", "Estructura de vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass installation": ["Glasinstallation", "Instalación de vidrio"],
    "Glass installation — Arthemii Ionaere": ["Glasinstallation — Arthemii Ionaere", "Instalación de vidrio — Arthemii Ionaere"],
    "Glass installation — contemporary stained glass artwork by Arthemii Ionaere.": ["Glasinstallation — zeitgenössische Glaskunst von Arthemii Ionaere.", "Instalación de vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass lamp sculpture": ["Glaslampen-Skulptur", "Escultura-lámpara de vidrio"],
    "Glass lamp sculpture — Arthemii Ionaere": ["Glaslampen-Skulptur — Arthemii Ionaere", "Escultura-lámpara de vidrio — Arthemii Ionaere"],
    "Glass lamp sculpture — contemporary stained glass artwork by Arthemii Ionaere.": ["Glaslampen-Skulptur — zeitgenössische Glaskunst von Arthemii Ionaere.", "Escultura-lámpara de vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass sculpture detail": ["Detail einer Glasskulptur", "Detalle de escultura de vidrio"],
    "Glass sculpture detail — Arthemii Ionaere": ["Detail einer Glasskulptur — Arthemii Ionaere", "Detalle de escultura de vidrio — Arthemii Ionaere"],
    "Glass sculpture detail — contemporary stained glass artwork by Arthemii Ionaere.": ["Detail einer Glasskulptur — zeitgenössische Glaskunst von Arthemii Ionaere.", "Detalle de escultura de vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Glass texture": ["Glastextur", "Textura del vidrio"],
    "Glass texture — Arthemii Ionaere": ["Glastextur — Arthemii Ionaere", "Textura del vidrio — Arthemii Ionaere"],
    "Glass texture — contemporary stained glass artwork by Arthemii Ionaere.": ["Glastextur — zeitgenössische Glaskunst von Arthemii Ionaere.", "Textura del vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Huerrytop sculpture": ["Skulptur „Huerrytop“", "Escultura «Huerrytop»"],
    "Huerrytop sculpture — Arthemii Ionaere": ["Skulptur „Huerrytop“ — Arthemii Ionaere", "Escultura «Huerrytop» — Arthemii Ionaere"],
    "Huerrytop sculpture — contemporary stained glass artwork by Arthemii Ionaere.": ["Skulptur „Huerrytop“ — zeitgenössische Glaskunst von Arthemii Ionaere.", "Escultura «Huerrytop» — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Huweado artwork": ["Werk „Huweado“", "Obra «Huweado»"],
    "Huweado artwork — Arthemii Ionaere": ["Werk „Huweado“ — Arthemii Ionaere", "Obra «Huweado» — Arthemii Ionaere"],
    "Huweado artwork — contemporary stained glass artwork by Arthemii Ionaere.": ["Werk „Huweado“ — zeitgenössische Glaskunst von Arthemii Ionaere.", "Obra «Huweado» — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Light installation with deep colored shadows": ["Lichtinstallation mit tiefen farbigen Schatten", "Instalación lumínica con profundas sombras de color"],
    "Light installation with deep colored shadows — Arthemii Ionaere": ["Lichtinstallation mit tiefen farbigen Schatten — Arthemii Ionaere", "Instalación lumínica con profundas sombras de color — Arthemii Ionaere"],
    "Light installation with deep colored shadows — contemporary stained glass artwork by Arthemii Ionaere.": ["Lichtinstallation mit tiefen farbigen Schatten — zeitgenössische Glaskunst von Arthemii Ionaere.", "Instalación lumínica con profundas sombras de color — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Light installation": ["Lichtinstallation", "Instalación lumínica"],
    "Light installation — Arthemii Ionaere": ["Lichtinstallation — Arthemii Ionaere", "Instalación lumínica — Arthemii Ionaere"],
    "Light installation — contemporary stained glass artwork by Arthemii Ionaere.": ["Lichtinstallation — zeitgenössische Glaskunst von Arthemii Ionaere.", "Instalación lumínica — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Light study": ["Lichtstudie", "Estudio de luz"],
    "Light study — Arthemii Ionaere": ["Lichtstudie — Arthemii Ionaere", "Estudio de luz — Arthemii Ionaere"],
    "Light study — contemporary stained glass artwork by Arthemii Ionaere.": ["Lichtstudie — zeitgenössische Glaskunst von Arthemii Ionaere.", "Estudio de luz — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Lit sculpture": ["Beleuchtete Skulptur", "Escultura iluminada"],
    "Lit sculpture — Arthemii Ionaere": ["Beleuchtete Skulptur — Arthemii Ionaere", "Escultura iluminada — Arthemii Ionaere"],
    "Lit sculpture — contemporary stained glass artwork by Arthemii Ionaere.": ["Beleuchtete Skulptur — zeitgenössische Glaskunst von Arthemii Ionaere.", "Escultura iluminada — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Olymp glass sculpture": ["Glasskulptur „Olymp“", "Escultura de vidrio «Olymp»"],
    "Olymp glass sculpture — Arthemii Ionaere": ["Glasskulptur „Olymp“ — Arthemii Ionaere", "Escultura de vidrio «Olymp» — Arthemii Ionaere"],
    "Olymp glass sculpture — contemporary stained glass artwork by Arthemii Ionaere.": ["Glasskulptur „Olymp“ — zeitgenössische Glaskunst von Arthemii Ionaere.", "Escultura de vidrio «Olymp» — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Prism effect": ["Prismeneffekt", "Efecto prisma"],
    "Prism effect — Arthemii Ionaere": ["Prismeneffekt — Arthemii Ionaere", "Efecto prisma — Arthemii Ionaere"],
    "Prism effect — contemporary stained glass artwork by Arthemii Ionaere.": ["Prismeneffekt — zeitgenössische Glaskunst von Arthemii Ionaere.", "Efecto prisma — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Prism sculpture": ["Skulptur „Prisma“", "Escultura «Prisma»"],
    "Prism sculpture — Arthemii Ionaere": ["Skulptur „Prisma“ — Arthemii Ionaere", "Escultura «Prisma» — Arthemii Ionaere"],
    "Prism sculpture — contemporary stained glass artwork by Arthemii Ionaere.": ["Skulptur „Prisma“ — zeitgenössische Glaskunst von Arthemii Ionaere.", "Escultura «Prisma» — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Process documentation": ["Prozessdokumentation", "Documentación del proceso"],
    "Process documentation — Arthemii Ionaere": ["Prozessdokumentation — Arthemii Ionaere", "Documentación del proceso — Arthemii Ionaere"],
    "Process documentation — contemporary stained glass artwork by Arthemii Ionaere.": ["Prozessdokumentation — zeitgenössische Glaskunst von Arthemii Ionaere.", "Documentación del proceso — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Recent glass work": ["Neue Glasarbeit", "Obra reciente en vidrio"],
    "Recent glass work — Arthemii Ionaere": ["Neue Glasarbeit — Arthemii Ionaere", "Obra reciente en vidrio — Arthemii Ionaere"],
    "Recent glass work — contemporary stained glass artwork by Arthemii Ionaere.": ["Neue Glasarbeit — zeitgenössische Glaskunst von Arthemii Ionaere.", "Obra reciente en vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Sculpture detail": ["Skulpturdetail", "Detalle de escultura"],
    "Sculpture detail — Arthemii Ionaere": ["Skulpturdetail — Arthemii Ionaere", "Detalle de escultura — Arthemii Ionaere"],
    "Sculpture detail — contemporary stained glass artwork by Arthemii Ionaere.": ["Skulpturdetail — zeitgenössische Glaskunst von Arthemii Ionaere.", "Detalle de escultura — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Shadow prism": ["Schattenprisma", "Prisma de sombras"],
    "Shadow prism — Arthemii Ionaere": ["Schattenprisma — Arthemii Ionaere", "Prisma de sombras — Arthemii Ionaere"],
    "Shadow prism — contemporary stained glass artwork by Arthemii Ionaere.": ["Schattenprisma — zeitgenössische Glaskunst von Arthemii Ionaere.", "Prisma de sombras — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Shteryit piece": ["Werk „Shteryit“", "Pieza «Shteryit»"],
    "Shteryit piece — Arthemii Ionaere": ["Werk „Shteryit“ — Arthemii Ionaere", "Pieza «Shteryit» — Arthemii Ionaere"],
    "Shteryit piece — contemporary stained glass artwork by Arthemii Ionaere.": ["Werk „Shteryit“ — zeitgenössische Glaskunst von Arthemii Ionaere.", "Pieza «Shteryit» — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Stained glass artwork": ["Werk in Glasmalerei", "Obra de vidriera"],
    "Stained glass artwork — Arthemii Ionaere": ["Werk in Glasmalerei — Arthemii Ionaere", "Obra de vidriera — Arthemii Ionaere"],
    "Stained glass artwork — contemporary stained glass artwork by Arthemii Ionaere.": ["Werk in Glasmalerei — zeitgenössische Glaskunst von Arthemii Ionaere.", "Obra de vidriera — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Stained glass composition": ["Glasmalerei-Komposition", "Composición de vidriera"],
    "Stained glass composition — Arthemii Ionaere": ["Glasmalerei-Komposition — Arthemii Ionaere", "Composición de vidriera — Arthemii Ionaere"],
    "Stained glass composition — contemporary stained glass artwork by Arthemii Ionaere.": ["Glasmalerei-Komposition — zeitgenössische Glaskunst von Arthemii Ionaere.", "Composición de vidriera — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Stained glass detail": ["Detail einer Glasmalerei", "Detalle de vidriera"],
    "Stained glass detail — Arthemii Ionaere": ["Detail einer Glasmalerei — Arthemii Ionaere", "Detalle de vidriera — Arthemii Ionaere"],
    "Stained glass detail — contemporary stained glass artwork by Arthemii Ionaere.": ["Detail einer Glasmalerei — zeitgenössische Glaskunst von Arthemii Ionaere.", "Detalle de vidriera — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Studio artwork": ["Atelierarbeit", "Obra de estudio"],
    "Studio artwork — Arthemii Ionaere": ["Atelierarbeit — Arthemii Ionaere", "Obra de estudio — Arthemii Ionaere"],
    "Studio artwork — contemporary stained glass artwork by Arthemii Ionaere.": ["Atelierarbeit — zeitgenössische Glaskunst von Arthemii Ionaere.", "Obra de estudio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Studio process": ["Arbeitsprozess im Atelier", "Proceso en el estudio"],
    "Studio process — Arthemii Ionaere": ["Arbeitsprozess im Atelier — Arthemii Ionaere", "Proceso en el estudio — Arthemii Ionaere"],
    "Studio process — contemporary stained glass artwork by Arthemii Ionaere.": ["Arbeitsprozess im Atelier — zeitgenössische Glaskunst von Arthemii Ionaere.", "Proceso en el estudio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Vertical glass work": ["Vertikale Glasarbeit", "Obra vertical en vidrio"],
    "Vertical glass work — Arthemii Ionaere": ["Vertikale Glasarbeit — Arthemii Ionaere", "Obra vertical en vidrio — Arthemii Ionaere"],
    "Vertical glass work — contemporary stained glass artwork by Arthemii Ionaere.": ["Vertikale Glasarbeit — zeitgenössische Glaskunst von Arthemii Ionaere.", "Obra vertical en vidrio — obra contemporánea de vidriera de Arthemii Ionaere."],
    "Workshop scene": ["Werkstattszene", "Escena del taller"],
    "Workshop scene — Arthemii Ionaere": ["Werkstattszene — Arthemii Ionaere", "Escena del taller — Arthemii Ionaere"],
    "Workshop scene — contemporary stained glass artwork by Arthemii Ionaere.": ["Werkstattszene — zeitgenössische Glaskunst von Arthemii Ionaere.", "Escena del taller — obra contemporánea de vidriera de Arthemii Ionaere."]
  };

  var norm = function (s) { return s.replace(/\s+/g, ' ').trim(); };
  var REV = {};
  Object.keys(T).forEach(function (k) {
    REV[norm(T[k][0])] = REV[norm(T[k][0])] || k;
    REV[norm(T[k][1])] = REV[norm(T[k][1])] || k;
  });

  var current = 'en';
  var src = new WeakMap();      // text node -> { key, raw }
  var written = new WeakMap();  // text node -> value this script last wrote
  var titleSrc = null;
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, CODE: 1, PRE: 1 };

  function keyFor(text) {
    var n = norm(text);
    if (!n) return null;
    if (T[n]) return n;
    return REV[n] || null;
  }

  function translate(key, lang) {
    if (!key) return null;
    if (lang === 'en') return key;
    var e = T[key];
    return e ? e[lang === 'de' ? 0 : 1] : null;
  }

  function skipNode(node) {
    var el = node.parentNode;
    while (el && el.nodeType === 1) {
      if (SKIP[el.tagName] || el.hasAttribute('data-no-i18n')) return true;
      el = el.parentNode;
    }
    return false;
  }

  function applyText(node) {
    if (skipNode(node)) return;
    var s = src.get(node);
    if (!s) { s = { key: keyFor(node.nodeValue), raw: node.nodeValue }; src.set(node, s); }
    if (!s.key) return;
    var raw = node.nodeValue;
    var value;
    if (current === 'en' && norm(s.raw) === s.key) {
      value = s.raw;
    } else {
      var out = translate(s.key, current);
      if (!out) return;
      value = raw.match(/^\s*/)[0] + out + raw.match(/\s*$/)[0];
    }
    if (raw !== value) { written.set(node, value); node.nodeValue = value; }
  }

  function walk(root) {
    if (root.nodeType === 3) { applyText(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) applyText(n);
    if (root.querySelectorAll) {
      root.querySelectorAll('[placeholder]').forEach(function (el) {
        if (!el.hasAttribute('data-i18n-ph')) el.setAttribute('data-i18n-ph', el.getAttribute('placeholder'));
        var k = keyFor(el.getAttribute('data-i18n-ph'));
        var out = translate(k, current);
        if (out) el.setAttribute('placeholder', out);
      });
    }
  }

  function applyTitle() {
    if (titleSrc === null) titleSrc = keyFor(document.title);
    var out = translate(titleSrc, current);
    if (out) document.title = out;
  }

  function updateButtons() {
    document.querySelectorAll('.header__lang-btn[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === current;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  // Keep browser auto-translate (e.g. Chrome's) away from the switcher and,
  // once a visitor has picked German or Spanish, from the page itself.
  function protectSwitcher() {
    document.querySelectorAll('.header__lang').forEach(function (el) {
      el.setAttribute('translate', 'no');
      el.classList.add('notranslate');
    });
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'en';
    current = lang;
    var html = document.documentElement;
    html.lang = lang;
    if (lang === 'en') {
      html.removeAttribute('translate');
      html.classList.remove('notranslate');
    } else {
      html.setAttribute('translate', 'no');
      html.classList.add('notranslate');
    }
    protectSwitcher();
    walk(document.body);
    applyTitle();
    updateButtons();
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  // Translate text that page scripts change later (e.g. "Show more" / "Show less")
  var observer = new MutationObserver(function (records) {
    records.forEach(function (r) {
      if (r.type === 'characterData') {
        var node = r.target;
        if (written.get(node) === node.nodeValue) return;
        src.delete(node);
        applyText(node);
      } else {
        r.addedNodes.forEach(function (n) { walk(n); });
      }
    });
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.header__lang-btn[data-lang]');
    if (!b) return;
    e.preventDefault();
    setLang(b.getAttribute('data-lang'));
  });

  function init() {
    var saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) {}
    setLang(saved && LANGS.indexOf(saved) !== -1 ? saved : 'en');
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  window.I18N = {
    t: function (en) { return translate(keyFor(en), current) || en; },
    setLang: setLang,
    get lang() { return current; }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
