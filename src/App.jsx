import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
// MARCA — Cinzel + muted purple · pink · blue · gold
// ═══════════════════════════════════════════════════════════════════
const B = {
  bg0:"#080A18", bg1:"#0E1020", bg2:"#161828", bg3:"#1E2038",
  border:"#2C2E4A", borderAccent:"#504E80",
  gold:"#C8A030", goldBright:"#E8C84A", goldDim:"#7A6018", goldBg:"#141204",
  pink:"#C07888",  pinkDim:"#7A4858",  pinkLight:"#DCA8B8",
  purple:"#9070B0",purpleDim:"#5A4080",purpleLight:"#B898D0",
  blue:"#6080A8",  blueDim:"#384870",  blueLight:"#98B0C8",
  textPrimary:"#EAE0F2", textSecondary:"#B0A0C8", textMuted:"#706880", textFaint:"#38304A",
  green:"#7AB87A", greenDim:"#0E1C10", greenBorder:"#4A7A4A33",
  red:"#C07070",
};

const F = {
  display: "'Cinzel Decorative', serif",
  heading: "'Cinzel', serif",
  body: "'Raleway', sans-serif",
};

// ═══════════════════════════════════════════════════════════════════
// LOGO SVG — puente sagrado
// ═══════════════════════════════════════════════════════════════════
const Logo = ({ size=52, glow=false }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="27" stroke={B.gold} strokeWidth="1" opacity=".4"/>
    <circle cx="30" cy="30" r="19" stroke={B.gold} strokeWidth=".5" opacity=".18"/>
    <path d="M10 43 Q10 14 30 14 Q50 14 50 43" stroke={B.gold} strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="43" x2="52" y2="43" stroke={B.gold} strokeWidth="1.6" strokeLinecap="round" opacity=".6"/>
    <circle cx="30" cy="14" r="3" fill={B.gold} opacity=".95"/>
    <circle cx="30" cy="43" r="1.8" fill={B.gold} opacity=".5"/>
    <line x1="30" y1="17" x2="30" y2="41" stroke={B.gold} strokeWidth=".7" strokeDasharray="2.2 2.2" opacity=".28"/>
    {glow&&<><circle cx="30" cy="14" r="10" fill={B.gold} opacity=".06"/><circle cx="30" cy="30" r="27" stroke={B.gold} strokeWidth="1" opacity=".08" style={{filter:"blur(4px)"}}/></>}
  </svg>
);

// ═══════════════════════════════════════════════════════════════════
// DATOS
// ═══════════════════════════════════════════════════════════════════
const CATEGORIAS=[
  {id:"todos",label:"Todos",icon:"✦"},{id:"amor",label:"Amor",icon:"♡"},
  {id:"tarot",label:"Tarot",icon:"✴"},{id:"medium",label:"Médium",icon:"◎"},
  {id:"astro",label:"Astrología",icon:"♄"},{id:"suenos",label:"Sueños",icon:"☽"},
  {id:"sanacion",label:"Sanación",icon:"❋"},{id:"espiritual",label:"Espiritual",icon:"☆"},
  {id:"numeros",label:"Numerología",icon:"∞"},{id:"runas",label:"Runas",icon:"ᚱ"},
];

const PAQUETES=[
  {id:1,creditos:100, precio:"$9.99", label:"Inicio",  badge:null,        por:"$0.10/cr"},
  {id:2,creditos:300, precio:"$24.99",label:"Popular", badge:"MÁS VALOR", por:"$0.083/cr"},
  {id:3,creditos:600, precio:"$44.99",label:"Premium", badge:"20% DESC",  por:"$0.075/cr"},
  {id:4,creditos:1500,precio:"$99.99",label:"VIP",     badge:"35% DESC",  por:"$0.067/cr"},
];

const ONBOARDING=[
  {icon:"◎",titulo:"Busca Sabiduría\nMás Allá",  sub:"Conecta con psíquicos, astrólogos, médiums y guías espirituales disponibles ahora mismo.",colorA:"#3A1840",colorB:"#1A0C30"},
  {icon:"♄",titulo:"Navega con\nClaridad",        sub:"Lecturas para el amor, la carrera, el destino y el crecimiento espiritual.",               colorA:"#0F1A30",colorB:"#081020"},
  {icon:"✦",titulo:"Tu Viaje\nComienza Aquí",    sub:"Sistema de créditos sin suscripciones. Inicia sesión cuando lo necesites.",                 colorA:"#1A1030",colorB:"#0C0818"},
];

const SIGNOS=["Aries ♈","Tauro ♉","Géminis ♊","Cáncer ♋","Leo ♌","Virgo ♍","Libra ♎","Escorpio ♏","Sagitario ♐","Capricornio ♑","Acuario ♒","Piscis ♓"];

const ZODIACO=[
  {signo:"Aries",      simbolo:"♈",fechas:"21 Mar–19 Abr",elemento:"Fuego 🔥",color:"#804040",lectura:"Marte enciende tu camino hoy. Movimientos audaces en la carrera darán frutos. En el amor, la paciencia equilibra tu fuego interior.",amor:"¿Soltero? Alguien te nota. ¿En pareja? Reaviva la llama.",trabajo:"Afírmate en una reunión clave.",suerte:"7 · 21 · 44"},
  {signo:"Tauro",      simbolo:"♉",fechas:"20 Abr–20 May",elemento:"Tierra 🌍",color:"#385838",lectura:"Venus bendice tus finanzas y creatividad. Una conversación que has evitado te liberará. Confía en lo que has cultivado.",amor:"Deja de esperar. Di lo que sientes.",trabajo:"Un proyecto lento finalmente avanza.",suerte:"3 · 16 · 38"},
  {signo:"Géminis",    simbolo:"♊",fechas:"21 May–20 Jun",elemento:"Aire 🌬️",color:"#705820",lectura:"La claridad de Mercurio abre puertas. Dos caminos se presentan — tu intuición ya conoce la respuesta. Las conexiones sociales te sorprenden.",amor:"Una conversación profunda acerca dos corazones.",trabajo:"Comunica tu idea ahora.",suerte:"5 · 23 · 61"},
  {signo:"Cáncer",     simbolo:"♋",fechas:"21 Jun–22 Jul",elemento:"Agua 💧",color:"#284070",lectura:"La luna nutre tu corazón. Las conexiones familiares traen sanación inesperada. Una liberación emocional finalmente se produce.",amor:"La vulnerabilidad es tu superpoder hoy.",trabajo:"Confía en tu instinto en el trabajo.",suerte:"2 · 11 · 29"},
  {signo:"Leo",        simbolo:"♌",fechas:"23 Jul–22 Ago",elemento:"Fuego 🔥",color:"#704020",lectura:"Tu resplandor atrae nuevas oportunidades. El protagonismo te pertenece esta semana. Un reconocimiento que mereces llega con sorpresa.",amor:"Deja que tu confianza sea magnética.",trabajo:"Lidera con valentía. Otros te seguirán.",suerte:"1 · 19 · 55"},
  {signo:"Virgo",      simbolo:"♍",fechas:"23 Ago–22 Sep",elemento:"Tierra 🌍",color:"#385028",lectura:"Los detalles importan profundamente hoy. Un proyecto que has refinado alcanza su momento de fruto. Los hábitos de salud iniciados ahora perduran.",amor:"Los actos prácticos de amor hablan más alto.",trabajo:"Tu precisión llama la atención de un superior.",suerte:"6 · 15 · 42"},
  {signo:"Libra",      simbolo:"♎",fechas:"23 Sep–22 Oct",elemento:"Aire 🌬️",color:"#504070",lectura:"El equilibrio se restaura. El amor florece cuando dejas de pensar demasiado. Una decisión pendiente finalmente se siente sin peso.",amor:"Para de analizar — tu corazón ya lo sabe.",trabajo:"La colaboración abre una puerta prometedora.",suerte:"8 · 26 · 47"},
  {signo:"Escorpio",   simbolo:"♏",fechas:"23 Oct–21 Nov",elemento:"Agua 💧",color:"#582038",lectura:"Una transformación profunda está en marcha. Lo que termina ahora crea espacio para algo extraordinario. Confía — las fuerzas invisibles trabajan para ti.",amor:"Una verdad oculta sobre alguien es revelada.",trabajo:"Tu investigación da frutos dramáticos.",suerte:"9 · 18 · 36"},
  {signo:"Sagitario",  simbolo:"♐",fechas:"22 Nov–21 Dic",elemento:"Fuego 🔥",color:"#403070",lectura:"Júpiter expande tu horizonte. Un viaje — físico o espiritual — te llama urgentemente. La abundancia espera a quienes se atreven a estirarse.",amor:"La aventura compartida une las almas.",trabajo:"Aparece una oportunidad lejana.",suerte:"3 · 33 · 66"},
  {signo:"Capricornio",simbolo:"♑",fechas:"22 Dic–19 Ene",elemento:"Tierra 🌍",color:"#383848",lectura:"Saturno recompensa tu disciplina. Una meta a largo plazo muestra sus primeras señales de éxito. Tu paciencia silenciosa no ha pasado desapercibida.",amor:"La estabilidad en el amor se profundiza en algo sagrado.",trabajo:"Un ascenso o aumento está más cerca de lo que crees.",suerte:"4 · 13 · 52"},
  {signo:"Acuario",    simbolo:"♒",fechas:"20 Ene–18 Feb",elemento:"Aire 🌬️",color:"#204060",lectura:"Urano enciende una idea original. Tu pensamiento poco convencional merece ser expresado — la persona correcta está escuchando.",amor:"Una conexión inusual se vuelve significativa.",trabajo:"Tu originalidad resuelve un problema persistente.",suerte:"11 · 22 · 77"},
  {signo:"Piscis",     simbolo:"♓",fechas:"19 Feb–20 Mar",elemento:"Agua 💧",color:"#285050",lectura:"Neptuno profundiza tu intuición. Confía en el sueño que tuviste — lleva un mensaje. Los dones creativos fluyen libremente hoy.",amor:"El amor incondicional llega de forma inesperada.",trabajo:"Tu sensibilidad se convierte en tu mayor activo.",suerte:"7 · 14 · 49"},
];

const GUIAS=[
  {id:1, n:"Lucero",    ini:"LU",rol:"Psíquica del Amor y las Energías",  cat:"amor",      cal:4.97,res:3841,cr:10,disp:true, esp:null,     tags:["Amor","Relaciones","Energía"],       bio:"Especializada en el corazón. Lucero canaliza energías de amor para revelar lo que tus relaciones verdaderamente tienen para ti.",       ses:"18.2k",c1:"#7A3060",c2:"#5A2048"},
  {id:2, n:"Minerva",   ini:"MI",rol:"Guía Angelical y Médium",           cat:"medium",    cal:4.95,res:2910,cr:12,disp:true, esp:null,     tags:["Ángeles","Mediumnidad","Mensajes"],  bio:"Minerva conecta el plano angelical con el terrenal, transmitiendo mensajes de guías y seres queridos más allá del velo.",              ses:"12.7k",c1:"#503888",c2:"#382868"},
  {id:3, n:"Alma",      ini:"AL",rol:"Vidente y Protectora Espiritual",   cat:"espiritual",cal:4.93,res:2205,cr:9, disp:false,esp:"~8 min", tags:["Clarividencia","Protección"],        bio:"Alma ve con claridad lo que otros no pueden. Sus rituales de protección espiritual resguardan a quienes buscan seguridad y claridad.",   ses:"9.4k", c1:"#285860",c2:"#184048"},
  {id:4, n:"Altagracia",ini:"AG",rol:"Espiritista, Vidente y Médium",     cat:"medium",    cal:4.91,res:1788,cr:11,disp:true, esp:null,     tags:["Espiritismo","Ancestros"],           bio:"Arraigada en profundas tradiciones espiritistas, Altagracia conecta con los ancestros y el mundo invisible con extraordinaria precisión.",ses:"7.1k", c1:"#583030",c2:"#402020"},
  {id:5, n:"Sofía",     ini:"SO",rol:"Intérprete de Sueños y Médium",     cat:"suenos",    cal:4.89,res:1342,cr:8, disp:true, esp:null,     tags:["Sueños","Símbolos","Mediumnidad"],   bio:"Tus sueños son mensajes. Sofía descifra los símbolos que tu subconsciente y el universo te envían cada noche sin que lo sepas.",        ses:"5.8k", c1:"#303878",c2:"#202860"},
  {id:6, n:"Gael",      ini:"GA",rol:"Vidente Natural y Tarotista",       cat:"tarot",     cal:4.94,res:2056,cr:10,disp:false,esp:"~15 min",tags:["Tarot","Clarividencia","Carrera"],   bio:"Nacido con visión natural, Gael combina clarividencia innata con 12 años de maestría del tarot para lograr una precisión extraordinaria.",ses:"11.3k",c1:"#305040",c2:"#203830"},
  {id:7, n:"Rosa",      ini:"RO",rol:"Vidente, Espiritista y Santera",    cat:"sanacion",  cal:4.96,res:3120,cr:14,disp:true, esp:null,     tags:["Santería","Rituales","Limpieza"],    bio:"El linaje sagrado de Rosa y su visión espiritual se combinan para brindar poderosas limpiezas, protección y guía divina.",              ses:"16.9k",c1:"#602848",c2:"#481830"},
  {id:8, n:"Dolores",   ini:"DO",rol:"Médium Angelical y Sanadora",       cat:"sanacion",  cal:4.92,res:1990,cr:12,disp:true, esp:null,     tags:["Ángeles","Sanación Energética"],     bio:"Dolores canaliza frecuencias angélicas para una sanación energética profunda, trayendo paz y restauración al alma.",                    ses:"8.8k", c1:"#502870",c2:"#381858"},
  {id:9, n:"Esperanza", ini:"EP",rol:"Tarotista y Clarividente",          cat:"tarot",     cal:4.90,res:1654,cr:9, disp:true, esp:null,     tags:["Tarot","Futuro","Amor"],             bio:"Esperanza lee las cartas con precisión asombrosa, descubriendo verdades ocultas e iluminando el camino que te espera.",                 ses:"7.2k", c1:"#603080",c2:"#482060"},
  {id:10,n:"Marcos",    ini:"MR",rol:"Astrólogo Védico y Consejero",      cat:"astro",     cal:4.93,res:2244,cr:15,disp:true, esp:null,     tags:["Védico","Carta Natal","Remedios"],   bio:"Formado en Jyotish clásico, Marcos traza tu plano celeste para ofrecer orientación y remedios profundamente personales.",               ses:"10.1k",c1:"#284878",c2:"#183060"},
  {id:11,n:"Carmen",    ini:"CA",rol:"Numeróloga y Vidente",              cat:"numeros",   cal:4.88,res:1103,cr:7, disp:true, esp:null,     tags:["Camino de Vida","Destino"],          bio:"Los números en tu nombre y fecha de nacimiento cuentan una historia completa. Carmen revela el plano de tu alma mediante las matemáticas sagradas.",ses:"4.9k", c1:"#704028",c2:"#502818"},
  {id:12,n:"Valentina", ini:"VA",rol:"Sanadora de Chakras y Reiki",       cat:"sanacion",  cal:4.91,res:1788,cr:10,disp:false,esp:"~20 min",tags:["Chakras","Reiki","Equilibrio"],      bio:"Valentina restaura la armonía energética mediante la alineación de chakras y la canalización del Reiki, disolviendo bloqueos en su raíz.",ses:"8.3k", c1:"#405828",c2:"#304018"},
  {id:13,n:"Rafael",    ini:"RF",rol:"Maestro de Runas y Vidente",        cat:"runas",     cal:4.87,res:987, cr:9, disp:true, esp:null,     tags:["Elder Futhark","Adivinación"],       bio:"Rafael lanza runas nórdicas antiguas transmitidas por su linaje, leyendo el destino con una claridad sorprendente y precisa.",           ses:"3.8k", c1:"#404858",c2:"#303840"},
  {id:14,n:"Isabella",  ini:"IB",rol:"Médium Espiritual y Canalizadora",  cat:"medium",    cal:4.95,res:2566,cr:14,disp:true, esp:null,     tags:["Canalización","Contacto Espiritual"],bio:"Isabella abre un canal sagrado entre mundos, transmitiendo mensajes evidenciales con amor y compasión profunda.",                        ses:"13.5k",c1:"#582870",c2:"#401858"},
  {id:15,n:"Diego",     ini:"DI",rol:"Astrólogo Natal y Predictor",       cat:"astro",     cal:4.86,res:1421,cr:11,disp:false,esp:"~10 min",tags:["Carta Natal","Tránsitos","Timing"],  bio:"Diego se especializa en análisis de carta natal y astrología predictiva, identificando exactas ventanas de cambio en tu vida.",          ses:"6.4k", c1:"#284070",c2:"#182858"},
  {id:16,n:"Camila",    ini:"CM",rol:"Psíquica del Amor y el Romance",    cat:"amor",      cal:4.94,res:2870,cr:8, disp:true, esp:null,     tags:["Romance","Almas Gemelas"],           bio:"Camila sintoniza la firma energética de tu vida amorosa, revelando quién está verdaderamente destinado para ti y cuándo llegará.",       ses:"14.2k",c1:"#703858",c2:"#503040"},
  {id:17,n:"Rodrigo",   ini:"RD",rol:"Explorador de Vidas Pasadas",       cat:"espiritual",cal:4.89,res:1230,cr:12,disp:true, esp:null,     tags:["Vidas Pasadas","Karma"],             bio:"Rodrigo guía viajes profundos hacia encarnaciones pasadas, revelando patrones kármicos y contratos del alma que moldean tu presente.",   ses:"5.6k", c1:"#482820",c2:"#301808"},
  {id:18,n:"Marisol",   ini:"MS",rol:"Limpieza Espiritual y Protección",  cat:"sanacion",  cal:4.90,res:1654,cr:9, disp:false,esp:"~5 min", tags:["Limpieza","Mal de Ojo"],             bio:"Marisol realiza poderosas limpiezas espirituales, eliminando energía negativa, envidia y apegos espirituales con precisión.",            ses:"7.8k", c1:"#305838",c2:"#204028"},
  {id:19,n:"Andrés",    ini:"AN",rol:"Tarotista y Oráculo",               cat:"tarot",     cal:4.92,res:1988,cr:10,disp:true, esp:null,     tags:["Oráculo","Tarot","Finanzas"],        bio:"Andrés combina tarot con cartas de oráculo para ofrecer orientación concreta y procesable sobre carrera y finanzas.",                   ses:"9.1k", c1:"#285858",c2:"#184040"},
  {id:20,n:"Pilar",     ini:"PI",rol:"Sanadora con Cristales y Vidente",  cat:"sanacion",  cal:4.88,res:1102,cr:11,disp:true, esp:null,     tags:["Cristales","Aura","Grids"],          bio:"Pilar aprovecha el poder vibracional de los cristales sagrados para diagnosticar y sanar desequilibrios energéticos, restaurando el flujo.",ses:"4.7k", c1:"#286068",c2:"#184850"},
  {id:21,n:"Tomás",     ini:"TO",rol:"Tarotista Gitano y Vidente",        cat:"tarot",     cal:4.85,res:876, cr:8, disp:true, esp:null,     tags:["Tarot Gitano","Tradición"],          bio:"Portador de siglos de tradición del tarot gitano, Tomás lee con una claridad cruda y sin filtros que atraviesa toda ilusión.",           ses:"3.4k", c1:"#604030",c2:"#482818"},
  {id:22,n:"Natalia",   ini:"NA",rol:"Psíquica Intuitiva del Amor",       cat:"amor",      cal:4.93,res:2344,cr:10,disp:true, esp:null,     tags:["Intuición","Bloqueos","Atracción"],  bio:"Natalia percibe los hilos invisibles entre corazones, identificando bloqueos de amor y códigos de atracción con extraordinaria sensibilidad.",ses:"11.8k",c1:"#703050",c2:"#502038"},
  {id:23,n:"Eduardo",   ini:"ED",rol:"Brujo Espiritual y Consejero",      cat:"espiritual",cal:4.90,res:1543,cr:15,disp:false,esp:"~25 min",tags:["Brujería","Rituales","Despojos"],    bio:"Eduardo trabaja dentro de las tradiciones espirituales afrocaribeñas sagradas para despejar condiciones, hacer trabajos y aconsejar.",  ses:"7.2k", c1:"#682020",c2:"#481010"},
  {id:24,n:"Fernanda",  ini:"FE",rol:"Médium de Ángeles y Sanadora",      cat:"medium",    cal:4.91,res:1678,cr:11,disp:true, esp:null,     tags:["Mensajes Angelicales","Sanación"],   bio:"Fernanda recibe y traduce la guía angelical en mensajes prácticos y sanadores que restauran la esperanza y la dirección.",              ses:"8.0k", c1:"#485098",c2:"#303878"},
];

const SESIONES_PASADAS=[
  {id:1,guia:"Lucero",   ini:"LU",c1:"#7A3060",fecha:"14 May, 2026",dur:"22 min",cr:220,tipo:"Chat", est:5,rol:"Psíquica del Amor"},
  {id:2,guia:"Minerva",  ini:"MI",c1:"#503888",fecha:"8 May, 2026", dur:"15 min",cr:180,tipo:"Voz",  est:5,rol:"Guía Angelical"},
  {id:3,guia:"Gael",     ini:"GA",c1:"#305040",fecha:"29 Abr, 2026",dur:"30 min",cr:300,tipo:"Chat", est:5,rol:"Tarotista Natural"},
  {id:4,guia:"Rosa",     ini:"RO",c1:"#602848",fecha:"15 Abr, 2026",dur:"18 min",cr:252,tipo:"Video",est:5,rol:"Vidente y Santera"},
  {id:5,guia:"Sofía",    ini:"SO",c1:"#303878",fecha:"2 Abr, 2026", dur:"12 min",cr:96, tipo:"Chat", est:4,rol:"Intérprete de Sueños"},
];

const PROXIMA={guia:"Dolores",ini:"DO",c1:"#502870",fecha:"21 May, 2026",hora:"3:00 PM",tipo:"Video",rol:"Médium Angelical",cr:12};

const USUARIO={nombre:"María González",iniciales:"MG",signo:"Libra",desde:"Marzo 2023",plan:"Gratis",creditos:450,sesiones:12,gastados:1273};

// ═══════════════════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════════════════
const G=({children,size=18,italic=false,block=false,caps=false,s={}})=>(
  <span style={{fontFamily:F.heading,fontSize:size,fontWeight:700,color:B.gold,
    fontStyle:italic?"italic":"normal",textShadow:`0 0 18px ${B.gold}28`,
    display:block?"block":"inline",letterSpacing:caps?"2px":".5px",
    textTransform:caps?"uppercase":"none",...s}}>{children}</span>
);

const Estrellas=({r,size=11})=>(
  <span style={{fontSize:size,letterSpacing:.5}}>
    {[1,2,3,4,5].map(i=><span key={i} style={{color:i<=Math.floor(r)?B.gold:B.textFaint}}>★</span>)}
  </span>
);

const Cr=({n,small})=>(
  <span style={{display:"inline-flex",alignItems:"center",gap:2}}>
    <span style={{fontFamily:F.heading,fontSize:small?10:14,fontWeight:700,color:B.gold,textShadow:`0 0 8px ${B.gold}44`,letterSpacing:.5}}>◈ {n}</span>
    <span style={{fontFamily:F.body,fontSize:small?8:9,color:B.textMuted}}>cr/min</span>
  </span>
);

const Etiqueta=({children,color,accent})=>(
  <span style={{fontFamily:F.body,fontSize:9,padding:"2px 8px",background:`${color}22`,border:`1px solid ${color}44`,borderRadius:20,color:accent,letterSpacing:.5}}>{children}</span>
);

const SecLabel=({children,gold})=>(
  <div style={{fontFamily:F.heading,fontSize:9,letterSpacing:"2.5px",textTransform:"uppercase",
    color:gold?B.gold:B.textMuted,textShadow:gold?`0 0 8px ${B.gold}33`:"none",marginBottom:8}}>{children}</div>
);

const Divisor=({gold})=>(
  <div style={{height:1,background:gold
    ?`linear-gradient(90deg,transparent,${B.gold}50,transparent)`
    :`linear-gradient(90deg,transparent,${B.border},transparent)`,margin:"0 24px"}}/>
);

// ═══════════════════════════════════════════════════════════════════
// SPLASH
// ═══════════════════════════════════════════════════════════════════
function Splash({onDone}){
  useEffect(()=>{const t=setTimeout(onDone,2600);return()=>clearTimeout(t);},[]);
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      background:`radial-gradient(ellipse at 50% 30%,#201040 0%,${B.bg0} 65%)`,gap:24,padding:32}}>
      <div style={{animation:"floatUp .8s ease-out both"}}>
        <Logo size={90} glow/>
      </div>
      <div style={{textAlign:"center",animation:"fadeIn .8s .5s ease-out both",opacity:0}}>
        <div style={{fontFamily:F.display,fontSize:26,fontWeight:700,color:B.gold,
          letterSpacing:"4px",textShadow:`0 0 40px ${B.gold}55`,marginBottom:12}}>ANTAHKARANA</div>
        <div style={{fontFamily:F.body,fontSize:12,color:B.textSecondary,letterSpacing:"1.5px",
          fontStyle:"italic",lineHeight:1.6}}>puente entre la mente humana<br/>y la conciencia superior</div>
      </div>
      <div style={{position:"absolute",bottom:48,animation:"fadeIn .6s 1.8s ease-out both",opacity:0}}>
        <div style={{width:40,height:2,background:`linear-gradient(90deg,transparent,${B.gold},transparent)`,borderRadius:1}}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════════════════════
function Onboarding({onDone}){
  const [idx,setIdx]=useState(0);
  const slide=ONBOARDING[idx];
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",
      background:`linear-gradient(160deg,${slide.colorA},${slide.colorB})`,transition:"background .6s"}}>
      {/* Skip */}
      <div style={{display:"flex",justifyContent:"flex-end",padding:"52px 24px 0"}}>
        <button onClick={onDone} style={{fontFamily:F.body,fontSize:12,color:B.textMuted,
          background:"none",border:`1px solid ${B.border}`,borderRadius:20,padding:"5px 14px",cursor:"pointer"}}>
          Omitir
        </button>
      </div>
      {/* Content */}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 36px",textAlign:"center"}}>
        <div style={{fontSize:60,marginBottom:32,textShadow:`0 0 40px ${B.gold}44`}}>{slide.icon}</div>
        <div style={{fontFamily:F.heading,fontSize:28,fontWeight:700,color:B.gold,
          letterSpacing:"1px",lineHeight:1.25,marginBottom:20,
          textShadow:`0 0 30px ${B.gold}44`,whiteSpace:"pre-line"}}>{slide.titulo}</div>
        <p style={{fontFamily:F.body,fontSize:14,color:B.textSecondary,lineHeight:1.7,maxWidth:300}}>{slide.sub}</p>
      </div>
      {/* Dots + Nav */}
      <div style={{padding:"0 32px 60px",display:"flex",flexDirection:"column",gap:20,alignItems:"center"}}>
        <div style={{display:"flex",gap:8}}>
          {ONBOARDING.map((_,i)=>(
            <div key={i} style={{width:i===idx?24:6,height:6,borderRadius:3,transition:"width .3s",
              background:i===idx?B.gold:`${B.gold}33`}}/>
          ))}
        </div>
        <button onClick={()=>idx<2?setIdx(idx+1):onDone()} style={{
          width:"100%",maxWidth:320,padding:"14px",
          background:`linear-gradient(135deg,${B.goldDim}CC,${B.goldDim}88)`,
          border:`1px solid ${B.gold}55`,borderRadius:14,
          fontFamily:F.heading,fontSize:13,fontWeight:700,color:B.gold,
          cursor:"pointer",letterSpacing:"2px",textTransform:"uppercase",
          textShadow:`0 0 10px ${B.gold}44`}}>
          {idx<2?"Siguiente":"Comenzar"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════════
function Auth({onLogin}){
  const [modo,setModo]=useState("login"); // login | registro
  const [rol,setRol]=useState("buscador"); // buscador | guia
  const [signo,setSigno]=useState("");
  const [paso,setPaso]=useState(1); // 1=datos 2=signo(si buscador)
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [nombre,setNombre]=useState("");

  const inputStyle={
    width:"100%",background:B.bg2,border:`1px solid ${B.border}`,borderRadius:12,
    padding:"13px 16px",color:B.textPrimary,fontFamily:F.body,fontSize:14,outline:"none",
    marginBottom:12,
  };

  return(
    <div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 0%,#201040,${B.bg0} 60%)`,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px"}}>
      {/* Logo */}
      <div style={{textAlign:"center",marginBottom:32}}>
        <Logo size={54} glow/>
        <div style={{fontFamily:F.display,fontSize:18,fontWeight:700,color:B.gold,
          letterSpacing:"3px",marginTop:12,textShadow:`0 0 20px ${B.gold}44`}}>ANTAHKARANA</div>
      </div>

      <div style={{width:"100%",maxWidth:380,background:B.bg1,border:`1px solid ${B.border}`,
        borderRadius:24,padding:28,boxShadow:`0 20px 60px #000000AA`}}>

        {/* Tabs login/registro */}
        <div style={{display:"flex",gap:6,background:B.bg0,borderRadius:12,padding:4,marginBottom:24,border:`1px solid ${B.border}`}}>
          {[["login","Iniciar sesión"],["registro","Registrarse"]].map(([k,l])=>(
            <button key={k} onClick={()=>{setModo(k);setPaso(1);}} style={{flex:1,padding:"9px 0",
              background:modo===k?`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`:"none",
              border:"none",borderRadius:9,fontFamily:F.heading,fontSize:11,fontWeight:700,
              color:modo===k?B.textPrimary:B.textMuted,cursor:"pointer",letterSpacing:"1px",textTransform:"uppercase"}}>{l}</button>
          ))}
        </div>

        {modo==="registro"&&paso===1&&(
          <>
            {/* Selección de rol */}
            <SecLabel gold>¿Cómo usarás Antahkarana?</SecLabel>
            <div style={{display:"flex",gap:8,marginBottom:20}}>
              {[["buscador","🔮","Soy Buscador","Busco guía espiritual"],
                ["guia","✦","Soy Guía","Ofrezco mis dones"]].map(([k,ic,tit,sub])=>(
                <button key={k} onClick={()=>setRol(k)} style={{flex:1,padding:"14px 10px",
                  background:rol===k?`linear-gradient(145deg,${B.purpleDim}88,${B.borderAccent}55)`:B.bg2,
                  border:`1px solid ${rol===k?B.gold:B.border}`,borderRadius:14,cursor:"pointer",textAlign:"center",
                  boxShadow:rol===k?`0 4px 20px ${B.gold}18`:"none",transition:"all .2s"}}>
                  <div style={{fontSize:20,marginBottom:4}}>{ic}</div>
                  <div style={{fontFamily:F.heading,fontSize:12,fontWeight:700,color:rol===k?B.gold:B.textPrimary,letterSpacing:.5}}>{tit}</div>
                  <div style={{fontFamily:F.body,fontSize:10,color:B.textMuted,marginTop:2}}>{sub}</div>
                </button>
              ))}
            </div>
            <input placeholder="Nombre completo" value={nombre} onChange={e=>setNombre(e.target.value)} style={inputStyle}/>
            <input placeholder="Correo electrónico" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle}/>
            <input placeholder="Contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)} style={{...inputStyle,marginBottom:20}}/>
            {rol==="guia"&&<div style={{background:`${B.goldDim}22`,border:`1px solid ${B.goldDim}55`,borderRadius:12,padding:"10px 14px",marginBottom:16}}>
              <div style={{fontFamily:F.heading,fontSize:11,color:B.gold,letterSpacing:.5,marginBottom:4}}>Proceso de aprobación</div>
              <div style={{fontFamily:F.body,fontSize:11,color:B.textSecondary,lineHeight:1.5}}>Tu perfil será revisado por nuestro equipo. Recibirás acceso en 24–48 horas.</div>
            </div>}
            <button onClick={()=>rol==="buscador"?setPaso(2):onLogin(rol)} style={{
              width:"100%",padding:"14px",background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,
              border:`1px solid ${B.borderAccent}`,borderRadius:14,fontFamily:F.heading,fontSize:12,
              fontWeight:700,color:B.textPrimary,cursor:"pointer",letterSpacing:"1.5px",textTransform:"uppercase"}}>
              {rol==="buscador"?"Siguiente →":"Enviar solicitud"}
            </button>
          </>
        )}

        {modo==="registro"&&paso===2&&(
          <>
            <SecLabel gold>¿Cuál es tu signo zodiacal?</SecLabel>
            <p style={{fontFamily:F.body,fontSize:12,color:B.textSecondary,marginBottom:16,lineHeight:1.5}}>
              Personalizamos tu horóscopo diario y conectamos mejor con tus guías.
            </p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:20}}>
              {SIGNOS.map(s=>(
                <button key={s} onClick={()=>setSigno(s)} style={{padding:"10px 8px",
                  background:signo===s?`linear-gradient(135deg,${B.goldDim}BB,${B.goldDim}66)`:B.bg2,
                  border:`1px solid ${signo===s?B.gold:B.border}`,borderRadius:12,
                  fontFamily:F.heading,fontSize:11,fontWeight:signo===s?700:400,
                  color:signo===s?B.gold:B.textMuted,cursor:"pointer",letterSpacing:.3}}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={()=>onLogin("buscador")} style={{
              width:"100%",padding:"14px",background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,
              border:`1px solid ${B.borderAccent}`,borderRadius:14,fontFamily:F.heading,fontSize:12,
              fontWeight:700,color:B.textPrimary,cursor:"pointer",letterSpacing:"1.5px",textTransform:"uppercase"}}>
              Entrar a Antahkarana
            </button>
          </>
        )}

        {modo==="login"&&(
          <>
            <input placeholder="Correo electrónico" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle}/>
            <input placeholder="Contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)} style={{...inputStyle,marginBottom:8}}/>
            <div style={{textAlign:"right",marginBottom:20}}>
              <button style={{fontFamily:F.body,fontSize:11,color:B.textMuted,background:"none",border:"none",cursor:"pointer"}}>¿Olvidaste tu contraseña?</button>
            </div>
            <button onClick={()=>onLogin("buscador")} style={{
              width:"100%",padding:"14px",background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,
              border:`1px solid ${B.borderAccent}`,borderRadius:14,fontFamily:F.heading,fontSize:12,
              fontWeight:700,color:B.textPrimary,cursor:"pointer",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:10}}>
              Iniciar Sesión
            </button>
            <button onClick={()=>onLogin("guia")} style={{
              width:"100%",padding:"12px",background:"transparent",
              border:`1px solid ${B.goldDim}`,borderRadius:14,fontFamily:F.heading,fontSize:11,
              fontWeight:700,color:B.gold,cursor:"pointer",letterSpacing:"1.5px",textTransform:"uppercase"}}>
              ✦ Entrar como Guía
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TARJETA DE GUÍA (Snapchat style — full screen swipe)
// ═══════════════════════════════════════════════════════════════════
function TarjetaGuia({g,onConectar,onGuardar,guardados}){
  const saved=guardados.has(g.id);
  return(
    <div style={{
      position:"relative",borderRadius:24,overflow:"hidden",
      height:"100%",minHeight:520,
      background:`linear-gradient(160deg,${g.c1} 0%,${g.c2} 45%,${B.bg0} 100%)`,
      boxShadow:`0 8px 40px ${g.c1}55`,
      userSelect:"none",
    }}>
      {/* Geometric overlay */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:`
        radial-gradient(ellipse at 25% 20%,${g.c1}55 0%,transparent 50%),
        radial-gradient(ellipse at 75% 60%,${g.c2}44 0%,transparent 45%),
        radial-gradient(ellipse at 50% 90%,${B.bg0}CC 0%,${B.bg0} 60%)
      `}}/>
      {/* Decorative symbol */}
      <div style={{position:"absolute",top:"12%",left:"50%",transform:"translateX(-50%)",
        fontSize:140,opacity:.06,color:B.gold,fontFamily:F.heading,lineHeight:1,pointerEvents:"none",
        textShadow:`0 0 60px ${g.c1}`}}>✦</div>

      {/* Avatar */}
      <div style={{position:"absolute",top:"18%",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
        <div style={{width:110,height:110,borderRadius:"50%",
          background:`linear-gradient(135deg,${g.c1}CC,${g.c2}AA)`,
          border:`2px solid ${B.gold}55`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontFamily:F.heading,fontSize:30,fontWeight:700,color:B.gold,
          boxShadow:`0 0 40px ${g.c1}99,0 0 80px ${g.c1}44`,
          textShadow:`0 0 20px ${B.gold}66`}}>{g.ini}</div>
        {/* Live badge */}
        <div style={{display:"flex",alignItems:"center",gap:5,
          background:g.disp?"#0E1C10":"#1A1828",
          border:`1px solid ${g.disp?B.greenBorder:B.border}`,
          borderRadius:20,padding:"4px 12px",backdropFilter:"blur(8px)"}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:g.disp?B.green:B.textFaint,
            animation:g.disp?"pulse 2s infinite":"none"}}/>
          <span style={{fontFamily:F.heading,fontSize:10,fontWeight:700,
            color:g.disp?B.green:B.textMuted,letterSpacing:"1px",textTransform:"uppercase"}}>
            {g.disp?"En Vivo":g.esp}
          </span>
        </div>
      </div>

      {/* Bottom frosted panel */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,
        background:"linear-gradient(180deg,transparent,rgba(8,9,24,.92) 30%)",
        padding:"60px 22px 20px",backdropFilter:"blur(0px)"}}>
        {/* Name — gold Cinzel */}
        <div style={{fontFamily:F.heading,fontSize:24,fontWeight:700,color:B.gold,
          marginBottom:3,textShadow:`0 0 24px ${B.gold}44`,letterSpacing:"1px"}}>{g.n}</div>
        <div style={{fontFamily:F.body,fontSize:12,color:B.textSecondary,marginBottom:10,opacity:.9}}>{g.rol}</div>

        {/* Rating + credits row */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <Estrellas r={g.cal}/>
          <span style={{fontFamily:F.heading,fontSize:12,color:B.gold,letterSpacing:.5}}>{g.cal}</span>
          <span style={{fontFamily:F.body,fontSize:11,color:B.textMuted}}>({g.res.toLocaleString()})</span>
          <div style={{marginLeft:"auto"}}><Cr n={g.cr}/></div>
        </div>

        {/* Tags */}
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
          {g.tags.map(t=><Etiqueta key={t} color={g.c1} accent={B.purpleLight}>{t}</Etiqueta>)}
        </div>

        {/* Action buttons */}
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>onGuardar(g.id)} style={{
            width:48,height:48,borderRadius:"50%",flexShrink:0,
            background:`${B.bg2}BB`,border:`1px solid ${saved?B.pink:B.border}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:18,cursor:"pointer",backdropFilter:"blur(8px)",
            transition:"all .2s",transform:saved?"scale(1.1)":"scale(1)"}}>
            {saved?"♥":"♡"}
          </button>
          <button onClick={()=>onConectar(g)} style={{
            flex:1,padding:"13px",
            background:g.disp
              ?`linear-gradient(135deg,${g.c1}EE,${g.c2}BB)`
              :`${B.bg2}BB`,
            border:`1px solid ${g.disp?g.c1+"88":B.border}`,
            borderRadius:14,fontFamily:F.heading,fontSize:12,fontWeight:700,
            color:g.disp?B.gold:B.textMuted,cursor:g.disp?"pointer":"default",
            letterSpacing:"1.5px",textTransform:"uppercase",backdropFilter:"blur(8px)",
            textShadow:g.disp?`0 0 10px ${B.gold}44`:"none"}}>
            {g.disp?"✦ Conectar":`Lista de espera · ${g.esp}`}
          </button>
        </div>
      </div>

      {/* Swipe hint */}
      <div style={{position:"absolute",bottom:6,left:"50%",transform:"translateX(-50%)",
        fontFamily:F.body,fontSize:9,color:B.textFaint,letterSpacing:1,textTransform:"uppercase",
        opacity:.5}}>desliza para explorar</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EXPLORAR — Snapchat swipe
// ═══════════════════════════════════════════════════════════════════
function Explorar({onConectar,setModal}){
  const [cat,setCat]=useState("todos");
  const [idx,setIdx]=useState(0);
  const [guardados,setGuardados]=useState(new Set());
  const [offset,setOffset]=useState(0);
  const [startY,setStartY]=useState(null);
  const [animDir,setAnimDir]=useState(null);

  const lista=GUIAS.filter(g=>cat==="todos"||g.cat===cat);
  const total=lista.length;
  const g=lista[Math.min(idx,total-1)];

  const go=(dir)=>{
    setAnimDir(dir);
    setTimeout(()=>{
      setIdx(i=>Math.max(0,Math.min(total-1,i+dir)));
      setAnimDir(null);
    },200);
  };

  const onTS=(e)=>setStartY(e.touches?.[0]?.clientY??e.clientY);
  const onTE=(e)=>{
    const endY=e.changedTouches?.[0]?.clientY??e.clientY;
    const delta=(startY||0)-endY;
    if(Math.abs(delta)>55){delta>0?go(1):go(-1);}
    setStartY(null);setOffset(0);
  };
  const onTM=(e)=>{
    if(startY===null)return;
    setOffset((e.touches?.[0]?.clientY??e.clientY)-startY);
  };

  const guardaToggle=(id)=>setGuardados(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
      {/* Header */}
      <div style={{padding:"52px 20px 10px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Logo size={28}/>
            <div style={{fontFamily:F.display,fontSize:13,color:B.gold,letterSpacing:"2.5px",
              textShadow:`0 0 12px ${B.gold}44`}}>ANTAHKARANA</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontFamily:F.body,fontSize:11,color:B.green}}>● {GUIAS.filter(g=>g.disp).length} en vivo</span>
            <button onClick={()=>setModal("creditos")} style={{
              fontFamily:F.heading,fontSize:10,color:B.gold,background:`${B.goldDim}22`,
              border:`1px solid ${B.goldDim}55`,borderRadius:20,padding:"4px 12px",
              cursor:"pointer",letterSpacing:".5px"}}>◈ {USUARIO.creditos}</button>
          </div>
        </div>
        {/* Category pills */}
        <div style={{overflowX:"auto",paddingBottom:4}}>
          <div style={{display:"flex",gap:6,width:"max-content"}}>
            {CATEGORIAS.map(c=>(
              <button key={c.id} onClick={()=>{setCat(c.id);setIdx(0);}} style={{
                padding:"6px 12px",
                background:cat===c.id?`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`:B.bg2,
                border:`1px solid ${cat===c.id?B.purple:B.border}`,borderRadius:20,
                fontFamily:F.body,fontSize:10,fontWeight:600,
                color:cat===c.id?B.textPrimary:B.textMuted,
                cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s"}}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Swipe card area */}
      {g&&<div style={{flex:1,padding:"8px 20px 12px",minHeight:0,position:"relative"}}
        onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}
        onMouseDown={onTS} onMouseMove={e=>e.buttons?onTM(e):null} onMouseUp={onTE}>
        <div style={{height:"100%",transform:animDir?`translateY(${animDir<0?"-12%":"12%"})`:`translateY(${Math.max(-30,Math.min(30,offset*.15))}px)`,
          opacity:animDir?0:1,transition:animDir?"transform .2s ease-out,opacity .2s":"transform .1s",}}>
          <TarjetaGuia g={g} onConectar={onConectar} onGuardar={guardaToggle} guardados={guardados}/>
        </div>
        {/* Position indicator */}
        <div style={{position:"absolute",right:28,top:"50%",transform:"translateY(-50%)",
          display:"flex",flexDirection:"column",gap:4}}>
          {lista.map((_,i)=>(
            <div key={i} style={{width:3,height:i===idx?18:6,borderRadius:2,transition:"height .2s",
              background:i===idx?B.gold:`${B.gold}22`}}/>
          ))}
        </div>
        {/* Arrow nav */}
        <div style={{position:"absolute",left:0,right:0,top:0,bottom:0,pointerEvents:"none",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"8px 0"}}>
          {idx>0&&<button onClick={()=>go(-1)} style={{alignSelf:"center",background:`${B.bg2}AA`,border:`1px solid ${B.border}`,borderRadius:"50%",width:32,height:32,color:B.gold,fontSize:14,cursor:"pointer",pointerEvents:"all",backdropFilter:"blur(4px)"}}>↑</button>}
          <div/>
          {idx<total-1&&<button onClick={()=>go(1)} style={{alignSelf:"center",background:`${B.bg2}AA`,border:`1px solid ${B.border}`,borderRadius:"50%",width:32,height:32,color:B.gold,fontSize:14,cursor:"pointer",pointerEvents:"all",backdropFilter:"blur(4px)"}}>↓</button>}
        </div>
      </div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HORÓSCOPO
// ═══════════════════════════════════════════════════════════════════
function Horoscopo(){
  const [sel,setSel]=useState(ZODIACO.find(z=>z.signo==="Libra"));
  return(
    <div style={{padding:"52px 0 110px"}}>
      <div style={{padding:"0 24px 18px"}}>
        <SecLabel gold>✦ GUÍA DIARIA</SecLabel>
        <G size={26} block s={{marginBottom:4}}>Tu Horóscopo</G>
        <div style={{fontFamily:F.body,fontSize:11,color:B.textMuted,letterSpacing:.5}}>Lunes, 18 de Mayo 2026 · Toca tu signo</div>
      </div>
      <div style={{padding:"0 24px 18px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7}}>
          {ZODIACO.map(z=>{
            const isSel=sel?.signo===z.signo,isUser=z.signo==="Libra";
            return(
              <button key={z.signo} onClick={()=>setSel(z)} style={{
                background:isSel?`linear-gradient(135deg,${z.color}88,${z.color}55)`:B.bg2,
                border:`1px solid ${isSel?z.color:isUser?B.gold:B.border}`,
                borderRadius:14,padding:"12px 6px",cursor:"pointer",
                display:"flex",flexDirection:"column",alignItems:"center",gap:3,
                transition:"all .2s",boxShadow:isSel?`0 4px 18px ${z.color}33`:"none"}}>
                <span style={{fontSize:18}}>{z.simbolo}</span>
                <span style={{fontFamily:F.heading,fontSize:9,fontWeight:700,letterSpacing:.5,
                  color:isSel||isUser?B.gold:B.textMuted,textShadow:isUser?`0 0 8px ${B.gold}44`:"none"}}>{z.signo}</span>
                {isUser&&!isSel&&<div style={{width:3,height:3,borderRadius:"50%",background:B.gold}}/>}
              </button>
            );
          })}
        </div>
      </div>
      {sel&&<div style={{padding:"0 24px"}}>
        <div style={{background:`linear-gradient(145deg,${sel.color}18,${sel.color}0A)`,
          border:`1px solid ${sel.color}44`,borderRadius:22,padding:22}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
            <div style={{width:56,height:56,borderRadius:"50%",
              background:`linear-gradient(135deg,${sel.color}88,${sel.color}55)`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,
              boxShadow:`0 0 20px ${sel.color}33`,flexShrink:0}}>{sel.simbolo}</div>
            <div>
              <div style={{marginBottom:2}}>
                <G size={20}>{sel.signo}</G>
                {sel.signo==="Libra"&&<span style={{fontFamily:F.heading,fontSize:10,color:B.gold,marginLeft:8,opacity:.7}}>✦ Tu signo</span>}
              </div>
              <div style={{fontFamily:F.body,fontSize:11,color:B.textSecondary}}>{sel.fechas} · {sel.elemento}</div>
            </div>
          </div>
          <div style={{background:`${sel.color}12`,borderRadius:14,padding:"12px 14px",marginBottom:10,borderLeft:`3px solid ${B.gold}55`}}>
            <SecLabel gold>Energía de Hoy</SecLabel>
            <p style={{fontFamily:F.body,fontSize:13,color:B.textPrimary,lineHeight:1.65,margin:0}}>{sel.lectura}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:10}}>
            {[["♡ Amor",sel.amor],["◈ Trabajo",sel.trabajo]].map(([l,t])=>(
              <div key={l} style={{background:`${sel.color}10`,borderRadius:12,padding:"11px 12px",border:`1px solid ${sel.color}28`}}>
                <div style={{fontFamily:F.heading,fontSize:9,color:B.textMuted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:5}}>{l}</div>
                <p style={{fontFamily:F.body,fontSize:11,color:B.textSecondary,lineHeight:1.5,margin:0}}>{t}</p>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{flex:1,background:`${sel.color}10`,borderRadius:10,padding:"8px 12px",border:`1px solid ${sel.color}28`}}>
              <div style={{fontFamily:F.heading,fontSize:9,color:B.textMuted,letterSpacing:1.5,textTransform:"uppercase"}}>Números de la Suerte</div>
              <G size={14} block s={{marginTop:2}}>{sel.suerte}</G>
            </div>
            <button style={{background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,border:`1px solid ${B.purple}55`,borderRadius:12,padding:"11px 18px",color:B.textPrimary,fontFamily:F.heading,fontSize:10,fontWeight:700,cursor:"pointer",letterSpacing:.5,textTransform:"uppercase"}}>Lectura Completa →</button>
          </div>
        </div>
      </div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SESIONES
// ═══════════════════════════════════════════════════════════════════
function Sesiones(){
  return(
    <div style={{padding:"52px 24px 110px"}}>
      <SecLabel gold>✦ HISTORIAL</SecLabel>
      <G size={26} block s={{marginBottom:20}}>Mis Sesiones</G>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:20}}>
        {[["12","Total"],["1,273 cr","Gastados"],["4.9 ★","Promedio"]].map(([v,l])=>(
          <div key={l} style={{background:B.bg2,borderRadius:14,padding:"14px 0",textAlign:"center",border:`1px solid ${B.border}`}}>
            <G size={15} block>{v}</G>
            <div style={{fontFamily:F.body,fontSize:9,color:B.textMuted,marginTop:2,letterSpacing:.5}}>{l}</div>
          </div>
        ))}
      </div>
      <SecLabel>PRÓXIMA SESIÓN</SecLabel>
      <div style={{background:B.bg2,border:`1px solid ${PROXIMA.c1}55`,borderRadius:18,padding:16,marginBottom:20}}>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10}}>
          <div style={{width:46,height:46,borderRadius:"50%",background:`linear-gradient(135deg,${PROXIMA.c1},${PROXIMA.c1}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.heading,fontSize:13,fontWeight:700,color:B.gold,flexShrink:0}}>{PROXIMA.ini}</div>
          <div style={{flex:1}}><G size={15}>{PROXIMA.guia}</G><div style={{fontFamily:F.body,fontSize:11,color:B.textSecondary,marginTop:2}}>{PROXIMA.rol}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontFamily:F.heading,fontSize:13,color:B.textPrimary}}>{PROXIMA.hora}</div><div style={{fontFamily:F.body,fontSize:10,color:B.textMuted}}>{PROXIMA.fecha}</div></div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1,background:`${PROXIMA.c1}18`,border:`1px solid ${PROXIMA.c1}33`,borderRadius:10,padding:"6px 12px",textAlign:"center"}}>
            <span style={{fontFamily:F.body,fontSize:11,color:B.textSecondary}}>📹 {PROXIMA.tipo} · ◈ {PROXIMA.cr} cr/min</span>
          </div>
          <button style={{background:`linear-gradient(135deg,${PROXIMA.c1},${PROXIMA.c1}BB)`,border:"none",borderRadius:10,padding:"6px 18px",fontFamily:F.heading,fontSize:10,fontWeight:700,color:B.gold,cursor:"pointer",letterSpacing:.5}}>Unirse</button>
        </div>
      </div>
      <SecLabel>SESIONES ANTERIORES</SecLabel>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {SESIONES_PASADAS.map(s=>(
          <div key={s.id} style={{background:B.bg2,border:`1px solid ${B.border}`,borderRadius:15,padding:15,display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(135deg,${s.c1},${s.c1}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.heading,fontSize:11,fontWeight:700,color:B.gold,flexShrink:0}}>{s.ini}</div>
            <div style={{flex:1}}>
              <G size={14}>{s.guia}</G>
              <div style={{fontFamily:F.body,fontSize:10,color:B.textMuted,marginTop:2}}>{s.fecha} · {s.dur}</div>
              <div style={{fontFamily:F.body,fontSize:9,color:B.textFaint,marginTop:1}}>{s.tipo}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <G size={14} block>◈ {s.cr}</G>
              <div style={{fontFamily:F.body,fontSize:9,color:B.textMuted,marginTop:1}}>créditos</div>
              <Estrellas r={s.est} size={9}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PERFIL
// ═══════════════════════════════════════════════════════════════════
function Perfil({setModal}){
  const uz=ZODIACO.find(z=>z.signo===USUARIO.signo);
  return(
    <div style={{padding:"52px 24px 110px"}}>
      {/* User card */}
      <div style={{background:`linear-gradient(145deg,#181030,#201840)`,
        border:`1px solid ${B.goldDim}`,borderRadius:24,padding:22,marginBottom:14,
        position:"relative",overflow:"hidden",boxShadow:`0 4px 30px #00000044,inset 0 1px 0 ${B.gold}14`}}>
        <div style={{position:"absolute",right:-8,top:-8,fontSize:80,opacity:.04,color:B.gold,fontFamily:F.heading,userSelect:"none"}}>✦</div>
        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:16}}>
          <div style={{width:62,height:62,borderRadius:"50%",
            background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontFamily:F.heading,fontSize:20,fontWeight:700,color:B.gold,
            border:`2px solid ${B.gold}44`,flexShrink:0,
            boxShadow:`0 0 20px ${B.purple}44`}}>{USUARIO.iniciales}</div>
          <div style={{flex:1}}>
            <G size={19} block>{USUARIO.nombre}</G>
            <div style={{fontFamily:F.body,fontSize:11,color:B.textSecondary,marginTop:2}}>Miembro desde {USUARIO.desde}</div>
            <div style={{display:"inline-flex",alignItems:"center",background:B.greenDim,border:`1px solid ${B.greenBorder}`,borderRadius:20,padding:"2px 9px",marginTop:4}}>
              <span style={{fontFamily:F.heading,fontSize:8,fontWeight:700,color:B.green,letterSpacing:1}}>PLAN GRATIS</span>
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7}}>
          {[[`◈ ${USUARIO.creditos}`,"Créditos"],[`${USUARIO.sesiones}`,"Sesiones"],[`${USUARIO.gastados} cr`,"Usados"]].map(([v,l])=>(
            <div key={l} style={{background:`${B.goldDim}16`,borderRadius:12,padding:"10px 0",textAlign:"center",border:`1px solid ${B.goldDim}33`}}>
              <G size={13} block>{v}</G>
              <div style={{fontFamily:F.body,fontSize:8,color:B.textMuted,marginTop:2,letterSpacing:.5}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={()=>setModal("creditos")} style={{width:"100%",padding:"13px",
        background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,
        border:`1px solid ${B.purple}55`,borderRadius:14,
        fontFamily:F.heading,fontSize:11,fontWeight:700,color:B.textPrimary,
        cursor:"pointer",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:14}}>
        ◈ Agregar Créditos
      </button>

      {/* Upgrade */}
      <div style={{background:"linear-gradient(145deg,#181030,#201840)",border:`1px solid ${B.borderAccent}44`,borderRadius:18,padding:18,marginBottom:14}}>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:22}}>👑</span>
          <div><G size={16}>Mejorar a Premium</G><div style={{fontFamily:F.body,fontSize:10,color:B.textSecondary,marginTop:2}}>Desbloquea beneficios exclusivos</div></div>
        </div>
        {["10% de descuento en créditos","Acceso prioritario a los mejores guías","Lectura mensual gratuita con El Niño Prodigio","Notificaciones de horóscopo diario"].map(b=>(
          <div key={b} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
            <span style={{color:B.gold,fontSize:10}}>✦</span>
            <span style={{fontFamily:F.body,fontSize:11,color:B.textSecondary}}>{b}</span>
          </div>
        ))}
        <button style={{width:"100%",marginTop:12,padding:"11px",background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,border:`1px solid ${B.purple}44`,borderRadius:12,fontFamily:F.heading,fontSize:10,fontWeight:700,color:B.textPrimary,cursor:"pointer",letterSpacing:1,textTransform:"uppercase"}}>Mejorar · $19.99/mes →</button>
      </div>

      {uz&&<div style={{background:`${uz.color}16`,border:`1px solid ${B.gold}28`,borderRadius:16,padding:15,marginBottom:14,display:"flex",gap:12,alignItems:"center"}}>
        <span style={{fontSize:26}}>{uz.simbolo}</span>
        <div><G size={14}>Tu Signo: {uz.signo}</G><div style={{fontFamily:F.body,fontSize:10,color:B.textMuted,marginTop:2}}>{uz.fechas} · {uz.elemento}</div></div>
      </div>}

      <SecLabel>CONFIGURACIÓN</SecLabel>
      {[["🔔","Notificaciones","Alertas de horóscopo y ofertas"],["🌐","Idioma","Español"],["◈","Historial de Créditos","Ver todas las transacciones"],["🔒","Privacidad","Datos y seguridad"],["📞","Línea de Ayuda","1-800-411-0112"],["⭐","Calificar la App","Comparte tu experiencia"]].map(([ic,l,s])=>(
        <div key={l} style={{display:"flex",gap:12,alignItems:"center",padding:"13px 0",borderBottom:`1px solid ${B.border}`}}>
          <span style={{fontSize:17,width:24,textAlign:"center"}}>{ic}</span>
          <div style={{flex:1}}><div style={{fontFamily:F.body,fontSize:13,fontWeight:600,color:B.textPrimary}}>{l}</div><div style={{fontFamily:F.body,fontSize:10,color:B.textMuted}}>{s}</div></div>
          <span style={{color:B.textFaint,fontSize:15}}>›</span>
        </div>
      ))}
      <button style={{width:"100%",marginTop:20,padding:"12px",background:"none",border:`1px solid ${B.border}`,borderRadius:14,fontFamily:F.heading,fontSize:10,fontWeight:700,color:B.textMuted,cursor:"pointer",letterSpacing:1,textTransform:"uppercase"}}>Cerrar Sesión</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PANEL GUÍA (psychic dashboard)
// ═══════════════════════════════════════════════════════════════════
function PanelGuia(){
  const [disponible,setDisponible]=useState(false);
  const gananciasHoy=disponible?1240:0;
  return(
    <div style={{padding:"52px 24px 110px"}}>
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:24}}>
        <Logo size={32}/>
        <div><G size={16} block>Panel del Guía</G><div style={{fontFamily:F.body,fontSize:10,color:B.textMuted}}>Antahkarana · Modo Guía</div></div>
      </div>

      {/* Big availability toggle */}
      <div style={{background:`linear-gradient(145deg,${disponible?"#0E1E12":"#181030"},${disponible?"#101A14":"#201840"})`,
        border:`1px solid ${disponible?B.green+"55":B.goldDim}`,
        borderRadius:24,padding:28,marginBottom:16,textAlign:"center",
        boxShadow:`0 4px 30px ${disponible?B.green+"22":B.gold+"18"}`}}>
        <div style={{fontFamily:F.heading,fontSize:11,color:disponible?B.green:B.textMuted,
          letterSpacing:"2px",textTransform:"uppercase",marginBottom:16}}>
          {disponible?"● Estás en Línea":"○ Estás Desconectado"}
        </div>
        {/* Toggle pill */}
        <button onClick={()=>setDisponible(d=>!d)} style={{
          width:90,height:44,borderRadius:22,border:"none",cursor:"pointer",
          background:disponible?`linear-gradient(135deg,${B.green}CC,${B.green}88)`:`${B.bg3}`,
          border:`2px solid ${disponible?B.green:B.border}`,
          position:"relative",transition:"all .3s",
          boxShadow:disponible?`0 0 20px ${B.green}44`:"none",
          marginBottom:16}}>
          <div style={{position:"absolute",top:5,left:disponible?46:5,
            width:30,height:30,borderRadius:"50%",
            background:disponible?"white":B.textMuted,
            transition:"left .3s",boxShadow:"0 2px 8px #00000066"}}/>
        </button>
        <div style={{fontFamily:F.body,fontSize:12,color:B.textSecondary,lineHeight:1.5,maxWidth:240,margin:"0 auto"}}>
          {disponible
            ?"Los buscadores pueden encontrarte y solicitar sesiones ahora."
            :"Activa tu disponibilidad para comenzar a recibir sesiones."}
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:20}}>
        {[[disponible?"◈ 124":"◈ 0","Hoy"],[`◈ 1,840`,"Esta semana"],["4.96 ★","Calificación"]].map(([v,l])=>(
          <div key={l} style={{background:B.bg2,borderRadius:14,padding:"14px 0",textAlign:"center",border:`1px solid ${B.border}`}}>
            <G size={14} block>{v}</G>
            <div style={{fontFamily:F.body,fontSize:9,color:B.textMuted,marginTop:2,letterSpacing:.5}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Queue */}
      <SecLabel gold>✦ SOLICITUDES PENDIENTES</SecLabel>
      {disponible?[
        {nombre:"Lucía M.",signo:"♎",tipo:"Chat",cr:10,espera:"Ahora"},
        {nombre:"Carlos R.",signo:"♑",tipo:"Video",cr:14,espera:"2 min"},
      ].map((s,i)=>(
        <div key={i} style={{background:B.bg2,border:`1px solid ${B.border}`,borderRadius:16,padding:16,marginBottom:8,display:"flex",gap:12,alignItems:"center"}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.heading,fontSize:16,color:B.gold,flexShrink:0}}>{s.signo}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:F.heading,fontSize:14,color:B.textPrimary,letterSpacing:.5}}>{s.nombre}</div>
            <div style={{fontFamily:F.body,fontSize:10,color:B.textMuted,marginTop:2}}>{s.tipo} · ◈ {s.cr} cr/min · {s.espera}</div>
          </div>
          <div style={{display:"flex",gap:6}}>
            <button style={{padding:"7px 14px",background:`linear-gradient(135deg,${B.green}CC,${B.green}88)`,border:"none",borderRadius:10,fontFamily:F.heading,fontSize:9,fontWeight:700,color:"white",cursor:"pointer",letterSpacing:.5,textTransform:"uppercase"}}>Aceptar</button>
            <button style={{padding:"7px 12px",background:"none",border:`1px solid ${B.border}`,borderRadius:10,fontFamily:F.heading,fontSize:9,color:B.textMuted,cursor:"pointer"}}>✕</button>
          </div>
        </div>
      )):(
        <div style={{textAlign:"center",padding:"30px 0",color:B.textMuted}}>
          <div style={{fontSize:28,marginBottom:8,opacity:.4}}>◎</div>
          <div style={{fontFamily:F.body,fontSize:12}}>Activa tu disponibilidad para ver solicitudes</div>
        </div>
      )}

      {/* Recent sessions */}
      <SecLabel s={{marginTop:20}}>SESIONES RECIENTES</SecLabel>
      {[{n:"Ana P.",tipo:"Chat",dur:"18 min",cr:180,est:5},{n:"Miguel S.",tipo:"Voz",dur:"25 min",cr:250,est:5}].map((s,i)=>(
        <div key={i} style={{background:B.bg2,border:`1px solid ${B.border}`,borderRadius:14,padding:14,marginBottom:8,display:"flex",gap:10,alignItems:"center"}}>
          <div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.heading,fontSize:12,color:B.gold,flexShrink:0}}>👤</div>
          <div style={{flex:1}}><div style={{fontFamily:F.heading,fontSize:13,color:B.textPrimary,letterSpacing:.5}}>{s.n}</div><div style={{fontFamily:F.body,fontSize:10,color:B.textMuted}}>{s.tipo} · {s.dur}</div></div>
          <div style={{textAlign:"right"}}><G size={13} block>◈ {s.cr}</G><Estrellas r={s.est} size={9}/></div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// GANANCIAS (psychic earnings)
// ═══════════════════════════════════════════════════════════════════
function Ganancias(){
  return(
    <div style={{padding:"52px 24px 110px"}}>
      <SecLabel gold>✦ FINANZAS</SecLabel>
      <G size={26} block s={{marginBottom:20}}>Mis Ganancias</G>
      <div style={{background:`linear-gradient(145deg,#181030,#201840)`,border:`1px solid ${B.goldDim}`,borderRadius:24,padding:24,marginBottom:16,textAlign:"center",boxShadow:`inset 0 1px 0 ${B.gold}14`}}>
        <div style={{fontFamily:F.body,fontSize:11,color:B.textMuted,letterSpacing:1,marginBottom:6}}>SALDO DISPONIBLE</div>
        <G size={42} block s={{marginBottom:4}}>◈ 3,840</G>
        <div style={{fontFamily:F.body,fontSize:13,color:B.textSecondary,marginBottom:20}}>≈ $320.00 USD</div>
        <button style={{padding:"12px 32px",background:`linear-gradient(135deg,${B.goldDim}CC,${B.goldDim}88)`,border:`1px solid ${B.gold}44`,borderRadius:14,fontFamily:F.heading,fontSize:11,fontWeight:700,color:B.gold,cursor:"pointer",letterSpacing:1,textTransform:"uppercase"}}>Retirar Fondos</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
        {[["◈ 1,840","Esta semana"],["◈ 7,200","Este mes"],["◈ 124","Hoy"],["4.96 ★","Calificación"]].map(([v,l])=>(
          <div key={l} style={{background:B.bg2,borderRadius:14,padding:"14px 12px",border:`1px solid ${B.border}`}}>
            <G size={18} block>{v}</G>
            <div style={{fontFamily:F.body,fontSize:10,color:B.textMuted,marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>
      <SecLabel>TRANSACCIONES RECIENTES</SecLabel>
      {[{n:"Ana P.",tipo:"Chat 18 min",cr:180,fecha:"Hoy 2:30 PM"},{n:"Miguel S.",tipo:"Voz 25 min",cr:250,fecha:"Hoy 11:15 AM"},{n:"Carolina R.",tipo:"Video 40 min",cr:400,fecha:"Ayer 6:00 PM"}].map((t,i)=>(
        <div key={i} style={{background:B.bg2,border:`1px solid ${B.border}`,borderRadius:14,padding:14,marginBottom:7,display:"flex",gap:10,alignItems:"center"}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:B.bg3,border:`1px solid ${B.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>◈</div>
          <div style={{flex:1}}><div style={{fontFamily:F.heading,fontSize:13,color:B.textPrimary,letterSpacing:.5}}>{t.n}</div><div style={{fontFamily:F.body,fontSize:10,color:B.textMuted}}>{t.tipo} · {t.fecha}</div></div>
          <G size={14} block>+{t.cr}</G>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MI PERFIL (psychic profile editor)
// ═══════════════════════════════════════════════════════════════════
function MiPerfil(){
  const [disponible,setDisponible]=useState(false);
  return(
    <div style={{padding:"52px 24px 110px"}}>
      <SecLabel gold>✦ GUÍA</SecLabel>
      <G size={26} block s={{marginBottom:20}}>Mi Perfil</G>
      {/* Profile card preview */}
      <div style={{background:`linear-gradient(145deg,#7A3060,#502048)`,borderRadius:20,padding:20,marginBottom:16,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:10,top:5,fontSize:60,opacity:.08,color:B.gold,fontFamily:F.heading}}>✦</div>
        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:12}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#7A3060CC,#502048AA)",border:`2px solid ${B.gold}55`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.heading,fontSize:20,fontWeight:700,color:B.gold,flexShrink:0}}>LU</div>
          <div>
            <G size={20} block>Lucero</G>
            <div style={{fontFamily:F.body,fontSize:11,color:B.pinkLight,marginTop:2}}>Psíquica del Amor y las Energías</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
          {["Amor","Relaciones","Energía"].map(t=><Etiqueta key={t} color="#7A3060" accent={B.pinkLight}>{t}</Etiqueta>)}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:12}}>
            <div><Estrellas r={4.97}/><span style={{fontFamily:F.heading,fontSize:11,color:B.gold,marginLeft:4}}>4.97</span></div>
            <Cr n={10}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5,background:"#0E1C10",border:`1px solid ${B.greenBorder}`,borderRadius:20,padding:"2px 10px"}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:disponible?B.green:B.textFaint}}/>
            <span style={{fontFamily:F.heading,fontSize:9,color:disponible?B.green:B.textMuted,letterSpacing:.8}}>{disponible?"EN VIVO":"DESCONECTADO"}</span>
          </div>
        </div>
      </div>
      {/* Edit fields */}
      <SecLabel>EDITAR INFORMACIÓN</SecLabel>
      {[["Nombre artístico","Lucero"],["Especialidad","Psíquica del Amor y las Energías"],["Tarifa (cr/min)","10"],["Bio","Especializada en asuntos del corazón..."]].map(([l,v])=>(
        <div key={l} style={{marginBottom:10}}>
          <div style={{fontFamily:F.heading,fontSize:9,color:B.textMuted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:5}}>{l}</div>
          <div style={{background:B.bg2,border:`1px solid ${B.border}`,borderRadius:12,padding:"12px 14px"}}>
            <div style={{fontFamily:F.body,fontSize:13,color:B.textPrimary}}>{v}</div>
          </div>
        </div>
      ))}
      <button style={{width:"100%",marginTop:16,padding:"13px",background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,border:`1px solid ${B.purple}44`,borderRadius:14,fontFamily:F.heading,fontSize:11,fontWeight:700,color:B.textPrimary,cursor:"pointer",letterSpacing:1.5,textTransform:"uppercase"}}>Guardar Cambios</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODAL — CONECTAR
// ═══════════════════════════════════════════════════════════════════
function ModalConectar({g,onClose}){
  const [tipo,setTipo]=useState("chat");
  if(!g)return null;
  const costos={chat:g.cr,voz:Math.ceil(g.cr*1.25),video:Math.ceil(g.cr*1.5)};
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"#000000AA",backdropFilter:"blur(10px)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:`linear-gradient(160deg,${B.bg1},${B.bg3})`,border:`1px solid ${g.c1}55`,borderRadius:"28px 28px 0 0",padding:"28px 24px 40px",width:"100%",maxWidth:480,maxHeight:"85vh",overflowY:"auto"}}>
        <div style={{width:40,height:4,background:B.border,borderRadius:2,margin:"0 auto 20px"}}/>
        <button onClick={onClose} style={{position:"absolute",top:20,right:20,background:B.bg3,border:"none",borderRadius:"50%",width:30,height:30,color:B.textMuted,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        {/* Guide mini-header */}
        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:22}}>
          <div style={{width:60,height:60,borderRadius:"50%",background:`linear-gradient(135deg,${g.c1},${g.c2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.heading,fontSize:18,fontWeight:700,color:B.gold,border:`2px solid ${B.gold}44`,flexShrink:0}}>{g.ini}</div>
          <div>
            <G size={20} block>{g.n}</G>
            <div style={{fontFamily:F.body,fontSize:11,color:B.textSecondary,marginTop:2}}>{g.rol}</div>
            <div style={{marginTop:4}}><Estrellas r={g.cal}/><span style={{fontFamily:F.heading,fontSize:11,color:B.gold,marginLeft:4}}>{g.cal}</span></div>
          </div>
        </div>
        {/* Session type */}
        <SecLabel gold>Tipo de Sesión</SecLabel>
        <div style={{display:"flex",gap:7,marginBottom:18}}>
          {[["chat","✍️","Chat"],["voz","🔮","Voz"],["video","◎","Video"]].map(([k,ic,l])=>(
            <button key={k} onClick={()=>setTipo(k)} style={{flex:1,padding:"12px 6px",
              background:tipo===k?`linear-gradient(135deg,${g.c1}CC,${g.c2}BB)`:B.bg2,
              border:`1px solid ${tipo===k?g.c1+"88":B.border}`,borderRadius:14,
              cursor:"pointer",textAlign:"center",transition:"all .2s"}}>
              <div style={{fontSize:18,marginBottom:4}}>{ic}</div>
              <div style={{fontFamily:F.heading,fontSize:10,fontWeight:700,color:tipo===k?B.gold:B.textMuted,letterSpacing:.5}}>{l}</div>
              <Cr n={costos[k]} small/>
            </button>
          ))}
        </div>
        {/* Credit info */}
        <div style={{background:B.bg2,border:`1px solid ${B.border}`,borderRadius:14,padding:"14px 16px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontFamily:F.body,fontSize:12,color:B.textSecondary}}>Tus créditos</span>
            <G size={15}>◈ {USUARIO.creditos}</G>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontFamily:F.body,fontSize:12,color:B.textSecondary}}>Tarifa</span>
            <Cr n={costos[tipo]}/>
          </div>
          <div style={{height:1,background:B.border,margin:"8px 0"}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:F.body,fontSize:11,color:B.textMuted}}>Duración estimada con tu saldo</span>
            <G size={13}>~{Math.floor(USUARIO.creditos/costos[tipo])} min</G>
          </div>
        </div>
        {/* Free question */}
        <div style={{background:B.greenDim,border:`1px solid ${B.greenBorder}`,borderRadius:12,padding:"9px 14px",marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:16}}>🎁</span>
          <div><div style={{fontFamily:F.heading,fontSize:10,fontWeight:700,color:B.green,letterSpacing:.5}}>Primera Pregunta Gratis</div><div style={{fontFamily:F.body,fontSize:10,color:"#5A8A5A"}}>Nuevos usuarios obtienen una consulta espiritual gratuita</div></div>
        </div>
        <button style={{width:"100%",padding:"14px",background:`linear-gradient(135deg,${g.c1}EE,${g.c2}BB)`,border:`1px solid ${g.c1}88`,borderRadius:14,fontFamily:F.heading,fontSize:12,fontWeight:700,color:B.gold,cursor:"pointer",letterSpacing:"1.5px",textTransform:"uppercase",textShadow:`0 0 10px ${B.gold}44`}}>
          ✦ Comenzar Sesión
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODAL — CRÉDITOS (Stripe)
// ═══════════════════════════════════════════════════════════════════
function ModalCreditos({onClose}){
  const [pkg,setPkg]=useState(PAQUETES[1]);
  const [paso,setPaso]=useState(1);
  const [num,setNum]=useState("");
  const [exp,setExp]=useState("");
  const [cvc,setCvc]=useState("");
  const [procesando,setProcesando]=useState(false);
  const [exito,setExito]=useState(false);

  const formatCard=(v)=>{
    const d=v.replace(/\D/g,"").slice(0,16);
    return d.replace(/(.{4})/g,"$1 ").trim();
  };
  const formatExp=(v)=>{
    const d=v.replace(/\D/g,"").slice(0,4);
    if(d.length>2)return d.slice(0,2)+"/"+d.slice(2);
    return d;
  };

  const pagar=()=>{
    setProcesando(true);
    setTimeout(()=>{setProcesando(false);setExito(true);},2000);
  };

  const inputS={
    background:B.bg2,border:`1px solid ${B.border}`,borderRadius:10,
    padding:"12px 14px",color:B.textPrimary,fontFamily:F.body,fontSize:14,
    outline:"none",width:"100%",
  };

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"#000000AA",backdropFilter:"blur(10px)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:`linear-gradient(160deg,${B.bg1},${B.bg3})`,border:`1px solid ${B.border}`,borderRadius:"28px 28px 0 0",padding:"28px 24px 44px",width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{width:40,height:4,background:B.border,borderRadius:2,margin:"0 auto 20px"}}/>
        <button onClick={onClose} style={{position:"absolute",top:20,right:20,background:B.bg3,border:"none",borderRadius:"50%",width:30,height:30,color:B.textMuted,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>

        {exito?(
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:50,marginBottom:16}}>✨</div>
            <G size={22} block s={{marginBottom:8}}>¡Créditos Añadidos!</G>
            <div style={{fontFamily:F.body,fontSize:14,color:B.textSecondary,marginBottom:24}}>
              <G size={18}>◈ {pkg.creditos}</G> créditos han sido añadidos a tu cuenta.
            </div>
            <button onClick={onClose} style={{padding:"13px 36px",background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,border:`1px solid ${B.purple}44`,borderRadius:14,fontFamily:F.heading,fontSize:11,fontWeight:700,color:B.textPrimary,cursor:"pointer",letterSpacing:1.5,textTransform:"uppercase"}}>Continuar</button>
          </div>
        ):paso===1?(
          <>
            <G size={20} block s={{marginBottom:4}}>Agregar Créditos</G>
            <div style={{fontFamily:F.body,fontSize:12,color:B.textMuted,marginBottom:20}}>Selecciona un paquete para continuar</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
              {PAQUETES.map(p=>(
                <div key={p.id} onClick={()=>setPkg(p)} style={{
                  background:pkg.id===p.id?`linear-gradient(145deg,${B.goldDim}22,${B.goldBg})`:B.bg3,
                  border:`1px solid ${pkg.id===p.id?B.goldDim:B.border}`,
                  borderRadius:14,padding:"14px 12px",cursor:"pointer",position:"relative",
                  boxShadow:pkg.id===p.id?`0 4px 20px ${B.gold}14`:"none",transition:"all .2s"}}>
                  {p.badge&&<div style={{position:"absolute",top:-7,right:8,background:`${B.goldDim}CC`,border:`1px solid ${B.gold}44`,borderRadius:20,padding:"1px 7px",fontFamily:F.heading,fontSize:7,fontWeight:700,color:B.gold,letterSpacing:.5}}>{p.badge}</div>}
                  <G size={20} block s={{marginBottom:2}}>◈ {p.creditos}</G>
                  <div style={{fontFamily:F.body,fontSize:10,color:B.textMuted,marginBottom:7}}>{p.por}</div>
                  <G size={16} block s={{marginBottom:8}}>{p.precio}</G>
                  <div style={{fontFamily:F.heading,fontSize:9,color:pkg.id===p.id?B.purple:B.textFaint,letterSpacing:.5,textTransform:"uppercase"}}>{p.label}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>setPaso(2)} style={{width:"100%",padding:"14px",background:`linear-gradient(135deg,${B.purpleDim},${B.borderAccent})`,border:`1px solid ${B.purple}44`,borderRadius:14,fontFamily:F.heading,fontSize:11,fontWeight:700,color:B.textPrimary,cursor:"pointer",letterSpacing:1.5,textTransform:"uppercase"}}>
              Continuar · {pkg.precio}
            </button>
          </>
        ):(
          <>
            {/* Stripe form */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <G size={18}>Pago seguro</G>
              <div style={{display:"flex",alignItems:"center",gap:6,background:"#1A2040",border:`1px solid #303860`,borderRadius:8,padding:"4px 10px"}}>
                <span style={{fontFamily:F.body,fontSize:11,color:"#6777C0"}}>Powered by</span>
                <span style={{fontFamily:"sans-serif",fontSize:13,fontWeight:700,color:"#7985D5",letterSpacing:.5}}>stripe</span>
              </div>
            </div>
            {/* Summary */}
            <div style={{background:B.bg2,border:`1px solid ${B.border}`,borderRadius:14,padding:"12px 16px",marginBottom:18,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontFamily:F.heading,fontSize:11,color:B.textMuted,letterSpacing:.5}}>{pkg.label}</div><G size={16}>◈ {pkg.creditos} créditos</G></div>
              <G size={20}>{pkg.precio}</G>
            </div>
            {/* Card fields */}
            <div style={{marginBottom:12}}>
              <div style={{fontFamily:F.heading,fontSize:9,color:B.textMuted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>Número de tarjeta</div>
              <input value={num} onChange={e=>setNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} style={inputS}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
              <div>
                <div style={{fontFamily:F.heading,fontSize:9,color:B.textMuted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>Vencimiento</div>
                <input value={exp} onChange={e=>setExp(formatExp(e.target.value))} placeholder="MM/AA" maxLength={5} style={inputS}/>
              </div>
              <div>
                <div style={{fontFamily:F.heading,fontSize:9,color:B.textMuted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>CVC</div>
                <input value={cvc} onChange={e=>setCvc(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="123" maxLength={4} style={inputS}/>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:18,justifyContent:"center"}}>
              {["🔒 SSL","💳 Visa","💳 MC","💳 Amex"].map(b=>(
                <div key={b} style={{fontFamily:F.body,fontSize:9,color:B.textFaint,background:B.bg2,border:`1px solid ${B.border}`,borderRadius:6,padding:"3px 8px"}}>{b}</div>
              ))}
            </div>
            <button onClick={pagar} disabled={procesando} style={{width:"100%",padding:"14px",
              background:procesando?B.bg2:`linear-gradient(135deg,${B.goldDim}CC,${B.goldDim}88)`,
              border:`1px solid ${B.gold}44`,borderRadius:14,
              fontFamily:F.heading,fontSize:12,fontWeight:700,color:B.gold,
              cursor:procesando?"default":"pointer",letterSpacing:1.5,textTransform:"uppercase",
              textShadow:`0 0 10px ${B.gold}33`}}>
              {procesando?"Procesando...":"✦ Confirmar Pago"}
            </button>
            <button onClick={()=>setPaso(1)} style={{width:"100%",marginTop:8,padding:"10px",background:"none",border:"none",fontFamily:F.body,fontSize:11,color:B.textMuted,cursor:"pointer"}}>← Volver</button>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// APP RAÍZ
// ═══════════════════════════════════════════════════════════════════
export default function App(){
  const [pantalla,setPantalla]=useState("splash"); // splash|onboarding|auth|app
  const [rol,setRol]=useState(null); // buscador|guia
  const [tab,setTab]=useState("explorar");
  const [modal,setModal]=useState(null); // null|"creditos"|"conectar"
  const [guiaSeleccionado,setGuiaSeleccionado]=useState(null);

  const navBuscador=[
    {id:"explorar",icon:"✦",label:"Explorar"},
    {id:"horoscopo",icon:"♄",label:"Horóscopo"},
    {id:"sesiones",icon:"◎",label:"Sesiones"},
    {id:"perfil",icon:"☾",label:"Perfil"},
  ];
  const navGuia=[
    {id:"panel",icon:"◈",label:"Panel"},
    {id:"solicitudes",icon:"◎",label:"Solicitudes"},
    {id:"ganancias",icon:"✦",label:"Ganancias"},
    {id:"miperfil",icon:"☾",label:"Mi Perfil"},
  ];
  const nav=rol==="guia"?navGuia:navBuscador;

  const conectar=(g)=>{setGuiaSeleccionado(g);setModal("conectar");};

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@700&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#080A18}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#0E1020}
        ::-webkit-scrollbar-thumb{background:#3C3860;border-radius:2px}
        input{color-scheme:dark}
        input::placeholder{color:#38304A;font-family:'Raleway',sans-serif}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatUp{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
      `}</style>

      <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${B.bg0},${B.bg1} 50%,${B.bg0})`,
        color:B.textPrimary,fontFamily:F.body,maxWidth:480,margin:"0 auto",position:"relative",overflowX:"hidden"}}>

        {/* Star dust */}
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:`
          radial-gradient(1px 1px at 10% 20%,${B.gold}16,transparent),
          radial-gradient(1px 1px at 85% 15%,${B.purple}14,transparent),
          radial-gradient(1px 1px at 50% 60%,${B.gold}10,transparent),
          radial-gradient(1px 1px at 25% 75%,${B.blue}12,transparent),
          radial-gradient(1px 1px at 70% 40%,${B.pink}0C,transparent),
          radial-gradient(2px 2px at 38% 8%,${B.gold}1C,transparent),
          radial-gradient(2px 2px at 88% 80%,${B.purple}16,transparent),
          radial-gradient(ellipse at 50% 0%,${B.gold}08 0%,transparent 50%)
        `}}/>

        <div style={{position:"relative",zIndex:1,height:"100vh",overflowY:"auto",paddingBottom:pantalla==="app"?80:0}}>
          {pantalla==="splash"&&<Splash onDone={()=>setPantalla("onboarding")}/>}
          {pantalla==="onboarding"&&<Onboarding onDone={()=>setPantalla("auth")}/>}
          {pantalla==="auth"&&<Auth onLogin={(r)=>{setRol(r);setPantalla("app");setTab(r==="guia"?"panel":"explorar");}}/>}
          {pantalla==="app"&&rol==="buscador"&&(
            <>
              {tab==="explorar"&&<Explorar onConectar={conectar} setModal={setModal}/>}
              {tab==="horoscopo"&&<Horoscopo/>}
              {tab==="sesiones"&&<Sesiones/>}
              {tab==="perfil"&&<Perfil setModal={setModal}/>}
            </>
          )}
          {pantalla==="app"&&rol==="guia"&&(
            <>
              {tab==="panel"&&<PanelGuia/>}
              {tab==="solicitudes"&&<div style={{padding:"52px 24px 110px"}}><SecLabel gold>✦ SOLICITUDES</SecLabel><G size={26} block s={{marginBottom:20}}>Solicitudes Pendientes</G><div style={{textAlign:"center",padding:"40px 0",color:B.textMuted}}><div style={{fontSize:36,marginBottom:10}}>◎</div><div style={{fontFamily:F.body,fontSize:13}}>Activa tu disponibilidad para recibir solicitudes</div></div></div>}
              {tab==="ganancias"&&<Ganancias/>}
              {tab==="miperfil"&&<MiPerfil/>}
            </>
          )}
        </div>

        {/* Bottom Nav */}
        {pantalla==="app"&&(
          <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,zIndex:50}}>
            <div style={{background:`${B.bg1}EE`,backdropFilter:"blur(20px)",borderTop:`1px solid ${B.border}`,display:"flex",justifyContent:"space-around",padding:"12px 0 24px"}}>
              {nav.map(n=>(
                <button key={n.id} onClick={()=>setTab(n.id)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,color:tab===n.id?B.gold:B.textFaint,transition:"all .2s"}}>
                  <span style={{fontSize:19,lineHeight:1,textShadow:tab===n.id?`0 0 12px ${B.gold}66`:"none",transition:"text-shadow .2s"}}>{n.icon}</span>
                  <span style={{fontFamily:F.heading,fontSize:8,letterSpacing:"1px",fontWeight:700,textTransform:"uppercase"}}>{n.label}</span>
                  {tab===n.id&&<div style={{width:16,height:2,borderRadius:1,background:`linear-gradient(90deg,transparent,${B.gold},transparent)`}}/>}
                </button>
              ))}
            </div>
          </div>
        )}

        {modal==="conectar"&&guiaSeleccionado&&<ModalConectar g={guiaSeleccionado} onClose={()=>{setModal(null);setGuiaSeleccionado(null);}}/>}
        {modal==="creditos"&&<ModalCreditos onClose={()=>setModal(null)}/>}
      </div>
    </>
  );
}
