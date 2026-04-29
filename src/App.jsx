import { useState } from "react";
// ─── DATA ────────────────────────────────────────────────────────────────────
const METIERS = [
  { id:"tous", label:"Tous les métiers", emoji:"🏗️" },
  { id:"electricien", label:"Électricien", emoji:"⚡" },
  { id:"plombier", label:"Plombier", emoji:"🔧" },
  { id:"peintre", label:"Peintre", emoji:"🖌️" },
  { id:"serrurier", label:"Serrurier", emoji:"🔑" },
  { id:"carreleur", label:"Carreleur", emoji:"🪟" },
  { id:"macon", label:"Maçon", emoji:"🧱" },
  { id:"charpentier", label:"Charpentier", emoji:"🪵" },
  { id:"couvreur", label:"Couvreur", emoji:"🏠" },
  { id:"platrier", label:"Plâtrier", emoji:"🪣" },
  { id:"menuisier", label:"Menuisier", emoji:"🪚" },
  { id:"chauffagiste", label:"Chauffagiste", emoji:"🔥" },
  { id:"paysagiste", label:"Paysagiste", emoji:"🌿" },
];

const VILLES_MAP = [
  { name:"Paris", x:310, y:155 }, { name:"Lyon", x:340, y:290 },
  { name:"Marseille", x:335, y:375 }, { name:"Toulouse", x:248, y:362 },
  { name:"Bordeaux", x:183, y:308 }, { name:"Nantes", x:162, y:215 },
  { name:"Lille", x:305, y:82 }, { name:"Strasbourg", x:418, y:158 },
  { name:"Nice", x:398, y:372 }, { name:"Montpellier", x:302, y:368 },
];

const INIT_ARTISANS = [
  { id:1, nom:"Jean-Pierre Morel", metier:"electricien", ville:"Paris", note:4.9, avis:87, tarif:"65€/h", dispo:true, certifie:true, photo:"JM", couleur:"#F59E0B", desc:"Électricien certifié RGE avec 15 ans d'expérience. Tableau électrique, mise aux normes, dépannage." },
  { id:2, nom:"Karim Benali", metier:"plombier", ville:"Lyon", note:4.8, avis:63, tarif:"55€/h", dispo:true, certifie:true, photo:"KB", couleur:"#3B82F6", desc:"Plomberie générale, chauffage, salle de bain. Devis gratuit. Intervention rapide 7j/7." },
  { id:3, nom:"Marc Fontaine", metier:"peintre", ville:"Marseille", note:4.7, avis:45, tarif:"40€/h", dispo:false, certifie:false, photo:"MF", couleur:"#EC4899", desc:"Peinture intérieure et extérieure, ravalement de façade, enduit décoratif." },
  { id:4, nom:"Samir Ouali", metier:"serrurier", ville:"Paris", note:5.0, avis:120, tarif:"70€/h", dispo:true, certifie:true, photo:"SO", couleur:"#6366F1", desc:"Serrurier agréé assurance. Ouverture de porte, blindage, remplacement serrure 24h/24." },
  { id:5, nom:"Thomas Lebrun", metier:"carreleur", ville:"Bordeaux", note:4.6, avis:38, tarif:"45€/h", dispo:true, certifie:false, photo:"TL", couleur:"#10B981", desc:"Carrelage sol et mur, faïence, mosaïque. Travaux neufs et rénovation." },
  { id:6, nom:"Ahmed Driss", metier:"macon", ville:"Toulouse", note:4.8, avis:55, tarif:"50€/h", dispo:true, certifie:true, photo:"AD", couleur:"#EF4444", desc:"Maçonnerie générale, extension, terrassement. Qualibat certifié." },
  { id:7, nom:"Pierre Girard", metier:"charpentier", ville:"Nantes", note:4.9, avis:42, tarif:"60€/h", dispo:false, certifie:true, photo:"PG", couleur:"#D97706", desc:"Charpente traditionnelle, ossature bois, pergola. 20 ans d'expérience." },
  { id:8, nom:"Nicolas Petit", metier:"couvreur", ville:"Lille", note:4.7, avis:31, tarif:"55€/h", dispo:true, certifie:true, photo:"NP", couleur:"#0891B2", desc:"Toiture tuile, ardoise, zinc. Réparation fuite, entretien gouttière. Certifié RGE." },
  { id:9, nom:"Rachid Mansouri", metier:"platrier", ville:"Paris", note:4.5, avis:27, tarif:"42€/h", dispo:true, certifie:false, photo:"RM", couleur:"#7C3AED", desc:"Plâtrerie, isolation thermique et acoustique, faux plafond." },
  { id:10, nom:"Laurent Schmitt", metier:"menuisier", ville:"Strasbourg", note:4.8, avis:49, tarif:"58€/h", dispo:true, certifie:true, photo:"LS", couleur:"#059669", desc:"Menuiserie bois sur mesure, fenêtres, portes, parquet." },
  { id:11, nom:"David Renard", metier:"chauffagiste", ville:"Nice", note:4.9, avis:73, tarif:"65€/h", dispo:false, certifie:true, photo:"DR", couleur:"#DC2626", desc:"Chaudière, pompe à chaleur, climatisation. RGE QualiPAC." },
  { id:12, nom:"Yannick Moreau", metier:"paysagiste", ville:"Montpellier", note:4.6, avis:34, tarif:"38€/h", dispo:true, certifie:false, photo:"YM", couleur:"#16A34A", desc:"Création et entretien jardin, terrassement, clôture, arrosage automatique." },
];

const INIT_REVIEWS = [
  { id:1, artisanId:1, auteur:"Sophie M.", note:5, date:"15 jan 2026", texte:"Travail impeccable, très professionnel !" },
  { id:2, artisanId:1, auteur:"Lucas B.", note:5, date:"02 fév 2026", texte:"Intervention rapide, propre et soignée. Tarif correct." },
  { id:3, artisanId:1, auteur:"Claire D.", note:4, date:"18 mar 2026", texte:"Bon travail, légèrement en retard mais résultat parfait." },
  { id:4, artisanId:2, auteur:"Marc T.", note:5, date:"10 jan 2026", texte:"Karim est super réactif. Problème résolu en 1h !" },
  { id:5, artisanId:4, auteur:"Paul G.", note:5, date:"05 mar 2026", texte:"Ouverture de porte en urgence à 23h, top service !" },
];

const INIT_MESSAGES = [
  { id:1, from:102, to:1, text:"Bonjour, j'aurais besoin d'un devis pour refaire le tableau électrique.", date:"10 avr", heure:"09:14", lu:true },
  { id:2, from:1, to:102, text:"Bonjour ! Je suis disponible cette semaine. Quelle est la superficie de votre logement ?", date:"10 avr", heure:"10:30", lu:true },
  { id:3, from:102, to:1, text:"C'est un appartement de 80m². Vous pouvez passer mercredi ?", date:"10 avr", heure:"11:05", lu:false },
];

const INIT_DEVIS = [
  { id:1, artisanId:1, clientId:102, titre:"Mise aux normes tableau électrique", montant:1200, statut:"accepté", date:"08 avr 2026", details:"Remplacement tableau électrique 80m², pose disjoncteurs différentiels, vérification installation complète.", lignes:[{ desc:"Main d'œuvre (8h)", prix:520 },{ desc:"Tableau électrique + matériel", prix:380 },{ desc:"Disjoncteurs différentiels (x4)", prix:180 },{ desc:"Déplacement", prix:120 }] },
  { id:2, artisanId:1, clientId:102, titre:"Installation prises cuisine", montant:350, statut:"en attente", date:"20 avr 2026", details:"Pose 4 prises électriques en cuisine, tirage de câble.", lignes:[{ desc:"Main d'œuvre (3h)", prix:195 },{ desc:"Prises + câbles", prix:95 },{ desc:"Déplacement", prix:60 }] },
];

const INIT_RDV = [
  { id:1, artisanId:1, clientId:102, titre:"Visite diagnostic électrique", date:"2026-04-28", heure:"14:00", duree:90, statut:"confirmé", adresse:"12 rue de la Paix, Paris 15e" },
  { id:2, artisanId:1, clientId:102, titre:"Travaux tableau électrique", date:"2026-05-03", heure:"08:30", duree:480, statut:"confirmé", adresse:"12 rue de la Paix, Paris 15e" },
];



const DEMO_USERS = [
  { id:1, type:"artisan", prenom:"Jean-Pierre", nom:"Morel", email:"jean@demo.fr", password:"demo123", metier:"electricien", ville:"Paris", tarif:"65€/h", certifie:true, dispo:true, note:4.9, avis:87, photo:"JM", couleur:"#F59E0B", desc:"Électricien certifié RGE avec 15 ans d'expérience." },
  { id:102, type:"particulier", prenom:"Marie", nom:"Dupont", email:"marie@demo.fr", password:"demo123", ville:"Paris", photo:"MD", couleur:"#3B82F6" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const inp = (ex={}) => ({ width:"100%", border:"2px solid #E8E3DB", borderRadius:12, padding:"11px 14px", fontSize:14, color:"#1C1917", outline:"none", fontFamily:"inherit", background:"#FAFAF9", boxSizing:"border-box", ...ex });
const btn = (bg="#1C1917", color="#fff", ex={}) => ({ background:bg, color, border:"none", borderRadius:10, padding:"10px 20px", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit", transition:"opacity 0.15s", ...ex });
const card = (ex={}) => ({ background:"#fff", border:"2px solid #E8E3DB", borderRadius:18, padding:"22px", ...ex });
const lbl = { fontSize:12, fontWeight:700, color:"#44403C", display:"block", marginBottom:5 };

const STATUT_COLORS = { "accepté":"#059669","en attente":"#F59E0B","refusé":"#EF4444","payé":"#059669","confirmé":"#059669","annulé":"#EF4444","en cours":"#3B82F6" };
const STATUT_BG = { "accepté":"#ECFDF5","en attente":"#FFFBEB","refusé":"#FEF2F2","payé":"#ECFDF5","confirmé":"#ECFDF5","annulé":"#FEF2F2","en cours":"#EFF6FF" };

function Badge({ statut }) {
  return <span style={{ background:STATUT_BG[statut]||"#F3F4F6", color:STATUT_COLORS[statut]||"#6B7280", border:`1px solid ${STATUT_COLORS[statut]||"#E5E7EB"}44`, borderRadius:20, padding:"3px 11px", fontSize:12, fontWeight:700 }}>{statut}</span>;
}

function Avatar({ u, size=36 }) {
  const initials = u ? (u.photo||(u.prenom?.[0]||"")+(u.nom?.[0]||"")) : "?";
  return <div style={{ width:size, height:size, borderRadius:size/3, background:(u?.couleur||"#E8460A")+"22", border:`2px solid ${(u?.couleur||"#E8460A")}55`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:size*0.35, color:u?.couleur||"#E8460A", flexShrink:0 }}>{initials}</div>;
}

function Stars({ note, size=14, interactive=false, onSet }) {
  const [hover, setHover] = useState(0);
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:1 }}>
      {[1,2,3,4,5].map(i=>(
        <span key={i} onClick={()=>interactive&&onSet&&onSet(i)} onMouseEnter={()=>interactive&&setHover(i)} onMouseLeave={()=>interactive&&setHover(0)}
          style={{ fontSize:size, color:i<=(hover||Math.round(note))?"#F59E0B":"#E8E3DB", cursor:interactive?"pointer":"default", transition:"color 0.1s" }}>★</span>
      ))}
    </span>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, user, onLogout, unread }) {
  const navItems = [["home","🏠","Accueil"],["annonces","📋","Artisans"],["carte","🗺️","Carte"]];
  if (user) {
    navItems.push(["messages","💬","Messages"]);
    if (user.type==="artisan") navItems.push(["dashboard","📊","Dashboard"]);
    else navItems.push(["mes-devis","📄","Mes devis"]);
  }
  return (
    <nav style={{ background:"#fff", borderBottom:"2px solid #E8E3DB", padding:"0 20px", display:"flex", alignItems:"center", gap:6, height:62, position:"sticky", top:0, zIndex:100, flexWrap:"wrap" }}>
      <button onClick={()=>setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:9, marginRight:8 }}>
        <div style={{ width:34, height:34, borderRadius:9, background:"linear-gradient(135deg,#E8460A,#F59E0B)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>🏗️</div>
        <span style={{ fontWeight:900, fontSize:19, color:"#1C1917", letterSpacing:-0.5 }}>Mon<span style={{ color:"#E8460A" }}>Artisan</span></span>
      </button>
      <div style={{ flex:1 }} />
      {navItems.map(([p,emoji,label])=>(
        <button key={p} onClick={()=>setPage(p)} style={{ background:page===p?"#FFF3ED":"none", color:page===p?"#E8460A":"#6B7280", border:"none", borderRadius:8, padding:"7px 11px", fontWeight:page===p?700:500, fontSize:13, cursor:"pointer", position:"relative", whiteSpace:"nowrap" }}>
          {emoji} {label}
          {p==="messages" && unread>0 && <span style={{ position:"absolute", top:2, right:2, background:"#E8460A", color:"#fff", borderRadius:"50%", width:15, height:15, fontSize:9, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{unread}</span>}
        </button>
      ))}
      <div style={{ width:1, height:22, background:"#E8E3DB", margin:"0 4px" }} />
      {user ? (
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Avatar u={user} size={30} />
          <span style={{ fontSize:13, fontWeight:600, color:"#1C1917" }}>{user.prenom}</span>
          <button onClick={onLogout} style={{ ...btn("#F5F0EB","#6B7280",{ padding:"5px 10px", fontSize:12 }) }}>Déco.</button>
        </div>
      ) : (
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={()=>setPage("login")} style={{ ...btn("#F5F0EB","#44403C",{ padding:"7px 14px" }) }}>Connexion</button>
          <button onClick={()=>setPage("register")} style={{ ...btn("linear-gradient(135deg,#E8460A,#F59E0B)","#fff",{ padding:"7px 14px" }) }}>S'inscrire</button>
        </div>
      )}
    </nav>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────
function Home({ setPage, setMetier }) {
  return (
    <div style={{ background:"#F8F7F4" }}>
      <div style={{ background:"linear-gradient(135deg,#1C1917 0%,#292524 60%,#3B1F0F 100%)", padding:"72px 24px 80px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-50, right:-50, width:260, height:260, borderRadius:"50%", background:"#E8460A14" }} />
        <div style={{ position:"absolute", bottom:-40, left:-60, width:200, height:200, borderRadius:"50%", background:"#F59E0B0A" }} />
        <div style={{ display:"inline-block", background:"#E8460A22", border:"1px solid #E8460A44", borderRadius:20, padding:"6px 18px", color:"#F59E0B", fontSize:13, fontWeight:600, marginBottom:20 }}>🏅 La plateforme BTP n°1 en France</div>
        <h1 style={{ fontSize:48, fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:-1.5, marginBottom:14 }}>Trouvez l'artisan BTP<br /><span style={{ color:"#E8460A" }}>qu'il vous faut,</span> rapidement.</h1>
        <p style={{ color:"#A8A29E", fontSize:17, maxWidth:520, margin:"0 auto 32px" }}>Électriciens, plombiers, peintres, maçons... Devis gratuit, prise de rendez-vous en ligne, paiement sécurisé.</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={()=>setPage("annonces")} style={{ ...btn("linear-gradient(135deg,#E8460A,#F59E0B)","#fff",{ padding:"14px 30px", fontSize:15, borderRadius:12 }) }}>Trouver un artisan →</button>
          <button onClick={()=>setPage("carte")} style={{ ...btn("#ffffff22","#fff",{ padding:"14px 30px", fontSize:15, borderRadius:12, border:"2px solid #ffffff33" }) }}>🗺️ Voir la carte</button>
        </div>
        {/* Trust badges */}
        <div style={{ display:"flex", gap:20, justifyContent:"center", marginTop:36, flexWrap:"wrap" }}>
          {["🔒 Paiement sécurisé","✅ Artisans vérifiés","⚡ Devis en 24h","📅 RDV en ligne"].map(b=>(
            <div key={b} style={{ background:"#ffffff15", border:"1px solid #ffffff22", borderRadius:20, padding:"6px 14px", color:"#A8A29E", fontSize:12, fontWeight:600 }}>{b}</div>
          ))}
        </div>
      </div>

      {/* Comment ça marche */}
      <div style={{ background:"#fff", padding:"50px 20px" }}>
        <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ fontSize:26, fontWeight:800, color:"#1C1917", marginBottom:8 }}>Comment ça marche ?</h2>
          <p style={{ color:"#78716C", fontSize:14, marginBottom:36 }}>Simple, rapide et sécurisé</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {[["🔍","Recherchez","Trouvez l'artisan BTP idéal selon votre ville et métier"],["📋","Demandez un devis","Recevez un devis détaillé gratuitement sous 24h"],["📅","Prenez RDV","Choisissez votre créneau directement en ligne"],["💳","Payez en sécurité","Paiement sécurisé uniquement après satisfaction"]].map(([e,t,d])=>(
              <div key={t} style={{ textAlign:"center" }}>
                <div style={{ width:56, height:56, borderRadius:16, background:"#FFF3ED", border:"2px solid #FCA99E44", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, margin:"0 auto 12px" }}>{e}</div>
                <div style={{ fontWeight:700, fontSize:14, color:"#1C1917", marginBottom:6 }}>{t}</div>
                <div style={{ fontSize:12, color:"#78716C", lineHeight:1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métiers */}
      <div style={{ maxWidth:1060, margin:"0 auto", padding:"46px 20px" }}>
        <h2 style={{ fontSize:26, fontWeight:800, color:"#1C1917", textAlign:"center", marginBottom:6 }}>Tous les corps de métier BTP</h2>
        <p style={{ color:"#78716C", textAlign:"center", marginBottom:32, fontSize:14 }}>12 spécialités disponibles partout en France</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))", gap:13 }}>
          {METIERS.filter(m=>m.id!=="tous").map(m=>{
            const count = INIT_ARTISANS.filter(a=>a.metier===m.id).length;
            return (
              <div key={m.id} onClick={()=>{ setMetier(m.id); setPage("annonces"); }}
                style={{ background:"#fff", border:"2px solid #E8E3DB", borderRadius:15, padding:"18px 10px", textAlign:"center", cursor:"pointer", transition:"all 0.15s" }}
                onMouseEnter={e=>{ e.currentTarget.style.border="2px solid #E8460A"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px #E8460A15"; }}
                onMouseLeave={e=>{ e.currentTarget.style.border="2px solid #E8E3DB"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ fontSize:30, marginBottom:8 }}>{m.emoji}</div>
                <div style={{ fontWeight:700, fontSize:13, color:"#1C1917", marginBottom:3 }}>{m.label}</div>
                <div style={{ fontSize:11, color:"#A8A29E" }}>{count} artisan{count>1?"s":""}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background:"#1C1917", padding:"40px 20px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, textAlign:"center" }}>
          {[["1 200+","Artisans inscrits"],["15 000+","Missions réalisées"],["4.8 ⭐","Note moyenne"],["98%","Clients satisfaits"]].map(([v,l])=>(
            <div key={l}><div style={{ fontSize:32, fontWeight:900, color:"#E8460A" }}>{v}</div><div style={{ color:"#78716C", fontSize:13, marginTop:4 }}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ textAlign:"center", padding:"20px", color:"#A8A29E", fontSize:12, background:"#F8F7F4" }}>© 2026 MonArtisan — Plateforme BTP de confiance · Paiement sécurisé 🔒</div>
    </div>
  );
}

// ─── ANNONCES ────────────────────────────────────────────────────────────────
function Annonces({ artisans, metier, setMetier, onSelect }) {
  const [search, setSearch] = useState("");
  const [dispo, setDispo] = useState(false);
  const [certif, setCertif] = useState(false);
  const [tri, setTri] = useState("note");

  let list = artisans.filter(a=>{
    const mm=metier==="tous"||a.metier===metier;
    const ms=a.nom.toLowerCase().includes(search.toLowerCase())||a.ville.toLowerCase().includes(search.toLowerCase())||(METIERS.find(m=>m.id===a.metier)?.label.toLowerCase().includes(search.toLowerCase())??false);
    return mm&&ms&&(!dispo||a.dispo)&&(!certif||a.certifie);
  });
  if (tri==="note") list=[...list].sort((a,b)=>b.note-a.note);
  else if (tri==="avis") list=[...list].sort((a,b)=>b.avis-a.avis);
  else list=[...list].sort((a,b)=>(b.dispo?1:0)-(a.dispo?1:0));

  return (
    <div style={{ display:"flex", minHeight:"calc(100vh - 62px)", background:"#F8F7F4" }}>
      <aside style={{ width:220, background:"#fff", borderRight:"2px solid #E8E3DB", padding:16, flexShrink:0, overflowY:"auto" }}>
        <div style={{ fontWeight:800, fontSize:12, color:"#44403C", marginBottom:10, textTransform:"uppercase", letterSpacing:0.5 }}>Métier</div>
        {METIERS.map(m=>(
          <button key={m.id} onClick={()=>setMetier(m.id)} style={{ display:"flex", alignItems:"center", gap:7, width:"100%", background:metier===m.id?"#FFF3ED":"none", border:"none", borderRadius:7, padding:"7px 9px", cursor:"pointer", color:metier===m.id?"#E8460A":"#44403C", fontWeight:metier===m.id?700:400, fontSize:13, textAlign:"left", marginBottom:2 }}>
            <span>{m.emoji}</span>{m.label}
          </button>
        ))}
        <div style={{ borderTop:"1px solid #E8E3DB", margin:"12px 0", paddingTop:12 }}>
          <div style={{ fontWeight:800, fontSize:12, color:"#44403C", marginBottom:9, textTransform:"uppercase" }}>Filtres</div>
          {[[dispo,setDispo,"● Disponible maintenant"],[certif,setCertif,"✓ Certifié / RGE"]].map(([val,fn,label])=>(
            <label key={label} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", marginBottom:9, fontSize:13, color:"#44403C" }}>
              <input type="checkbox" checked={val} onChange={e=>fn(e.target.checked)} style={{ accentColor:"#E8460A" }} />{label}
            </label>
          ))}
        </div>
      </aside>
      <div style={{ flex:1, padding:"20px 18px", overflowY:"auto" }}>
        <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ flex:1, minWidth:180, background:"#fff", border:"2px solid #E8E3DB", borderRadius:10, display:"flex", alignItems:"center", padding:"8px 12px", gap:7 }}>
            <span>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Nom, ville, métier..." style={{ border:"none", outline:"none", background:"none", fontSize:14, width:"100%" }} />
          </div>
          <select value={tri} onChange={e=>setTri(e.target.value)} style={inp({ width:"auto", padding:"9px 12px" })}>
            <option value="note">Meilleures notes</option>
            <option value="avis">Plus d'avis</option>
            <option value="dispo">Disponibles en premier</option>
          </select>
          <span style={{ color:"#A8A29E", fontSize:13 }}>{list.length} résultat{list.length>1?"s":""}</span>
        </div>
        {list.length===0 ? <div style={{ textAlign:"center", padding:"60px 0", color:"#A8A29E" }}><div style={{ fontSize:44, marginBottom:10 }}>🔍</div>Aucun artisan trouvé.</div> : (
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            {list.map(a=>{
              const m=METIERS.find(x=>x.id===a.metier)||METIERS[0];
              return (
                <div key={a.id} onClick={()=>onSelect(a)}
                  style={{ background:"#fff", border:"2px solid #E8E3DB", borderRadius:17, padding:"17px 20px", cursor:"pointer", display:"flex", gap:16, alignItems:"flex-start", transition:"all 0.15s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.border="2px solid #E8460A55"; e.currentTarget.style.boxShadow="0 4px 18px #E8460A10"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.border="2px solid #E8E3DB"; e.currentTarget.style.boxShadow="none"; }}>
                  <Avatar u={a} size={54} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4, flexWrap:"wrap" }}>
                      <span style={{ fontWeight:800, fontSize:15, color:"#1C1917" }}>{a.nom}</span>
                      {a.certifie && <span style={{ background:"#ECFDF5", color:"#059669", border:"1px solid #6EE7B744", borderRadius:6, padding:"2px 7px", fontSize:11, fontWeight:700 }}>✓ Certifié</span>}
                      <span style={{ background:a.dispo?"#FFF3ED":"#F3F4F6", color:a.dispo?"#E8460A":"#9CA3AF", borderRadius:6, padding:"2px 7px", fontSize:11, fontWeight:700 }}>{a.dispo?"● Disponible":"○ Occupé"}</span>
                    </div>
                    <div style={{ display:"flex", gap:10, marginBottom:5, flexWrap:"wrap", alignItems:"center" }}>
                      <span style={{ fontSize:12, color:"#78716C" }}>{m.emoji} {m.label}</span>
                      <span style={{ fontSize:12, color:"#78716C" }}>📍 {a.ville}</span>
                      <Stars note={a.note} size={13} />
                      <span style={{ fontSize:12, color:"#78716C" }}>{a.note} ({a.avis} avis)</span>
                    </div>
                    <p style={{ fontSize:13, color:"#92908E", margin:0, lineHeight:1.5 }}>{a.desc}</p>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontWeight:900, fontSize:19, color:"#E8460A" }}>{a.tarif}</div>
                    <div style={{ fontSize:11, color:"#A8A29E", marginBottom:8 }}>Devis gratuit</div>
                    <button style={{ ...btn("#1C1917","#fff",{ padding:"7px 14px", fontSize:12 }) }}>Contacter →</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DETAIL ──────────────────────────────────────────────────────────────────
function Detail({ artisan, onBack, user, reviews, onAddReview, onContact, onDemandeRdv }) {
  const [tab, setTab] = useState("contact");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [newR, setNewR] = useState({ note:5, texte:"" });
  const [reviewSent, setReviewSent] = useState(false);
  const [rdvForm, setRdvForm] = useState({ date:"", heure:"09:00", adresse:"", notes:"" });
  const [rdvSent, setRdvSent] = useState(false);
  const m = METIERS.find(x=>x.id===artisan.metier)||METIERS[0];
  const artisanReviews = reviews.filter(r=>r.artisanId===artisan.id);

  return (
    <div style={{ minHeight:"calc(100vh-62px)", background:"#F8F7F4", padding:"28px 20px" }}>
      <div style={{ maxWidth:740, margin:"0 auto" }}>
        <button onClick={onBack} style={{ ...btn("#F5F0EB","#44403C",{ marginBottom:18, padding:"7px 14px", fontSize:13 }) }}>← Retour aux résultats</button>

        <div style={{ ...card({ marginBottom:16 }) }}>
          <div style={{ display:"flex", gap:18, alignItems:"flex-start" }}>
            <Avatar u={artisan} size={70} />
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:5 }}>
                <h1 style={{ fontSize:21, fontWeight:900, color:"#1C1917", margin:0 }}>{artisan.nom}</h1>
                {artisan.certifie && <span style={{ background:"#ECFDF5", color:"#059669", border:"1px solid #6EE7B744", borderRadius:7, padding:"2px 9px", fontSize:11, fontWeight:700 }}>✓ Certifié RGE</span>}
                <span style={{ background:artisan.dispo?"#FFF3ED":"#F3F4F6", color:artisan.dispo?"#E8460A":"#9CA3AF", borderRadius:7, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{artisan.dispo?"● Disponible":"○ Occupé"}</span>
              </div>
              <div style={{ color:"#78716C", fontSize:14, marginBottom:6 }}>{m.emoji} {m.label} · 📍 {artisan.ville}</div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <Stars note={artisan.note} size={15} />
                <strong style={{ color:"#1C1917" }}>{artisan.note}</strong>
                <span style={{ color:"#A8A29E", fontSize:13 }}>({artisan.avis} avis)</span>
              </div>
              <p style={{ fontSize:13, color:"#57534E", margin:0, lineHeight:1.6 }}>{artisan.desc}</p>
            </div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <div style={{ fontWeight:900, fontSize:24, color:"#E8460A" }}>{artisan.tarif}</div>
              <div style={{ fontSize:11, color:"#A8A29E" }}>Devis gratuit</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:4, marginBottom:16, flexWrap:"wrap" }}>
          {[["contact","💬 Message"],["rdv","📅 Rendez-vous"],["avis",`⭐ Avis (${artisanReviews.length})`]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{ ...btn(tab===id?"#1C1917":"#fff",tab===id?"#fff":"#6B7280",{ border:"2px solid",borderColor:tab===id?"#1C1917":"#E8E3DB", borderRadius:10, padding:"9px 18px", fontSize:13 }) }}>{label}</button>
          ))}
        </div>

        {/* Contact */}
        {tab==="contact" && (
          <div style={card()}>
            <h2 style={{ fontWeight:800, fontSize:17, color:"#1C1917", marginBottom:4 }}>Contacter {artisan.nom.split(" ")[0]}</h2>
            <p style={{ color:"#78716C", fontSize:13, marginBottom:18 }}>Décrivez votre projet — devis gratuit sous 24h, sans engagement.</p>
            {!sent ? <>
              <label style={lbl}>Votre message</label>
              <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder={`Bonjour, j'ai besoin d'un ${m.label.toLowerCase()} pour...`} style={{ ...inp({ minHeight:100, resize:"vertical", marginBottom:14 }) }} />
              <button onClick={()=>{ if(msg.trim()){ onContact(artisan,msg); setSent(true); }}} style={{ ...btn(msg.trim()?"linear-gradient(135deg,#E8460A,#F59E0B)":"#E8E3DB",msg.trim()?"#fff":"#9CA3AF",{ width:"100%", padding:"12px 0", fontSize:15 }) }}>📨 Envoyer ma demande de devis</button>
            </> : (
              <div style={{ background:"#F0FDF4", border:"2px solid #86EFAC", borderRadius:13, padding:"26px", textAlign:"center" }}>
                <div style={{ fontSize:42, marginBottom:10 }}>✅</div>
                <div style={{ fontWeight:800, fontSize:16, color:"#16A34A", marginBottom:5 }}>Message envoyé !</div>
                <div style={{ color:"#4B5563", fontSize:13, marginBottom:14 }}><strong>{artisan.nom}</strong> vous répondra sous 24h avec un devis détaillé.</div>
                <button onClick={()=>setTab("rdv")} style={{ ...btn("linear-gradient(135deg,#E8460A,#F59E0B)","#fff",{ padding:"9px 22px" }) }}>📅 Prendre un rendez-vous</button>
              </div>
            )}
          </div>
        )}

        {/* RDV */}
        {tab==="rdv" && (
          <div style={card()}>
            <h2 style={{ fontWeight:800, fontSize:17, color:"#1C1917", marginBottom:4 }}>📅 Prendre rendez-vous</h2>
            <p style={{ color:"#78716C", fontSize:13, marginBottom:18 }}>Choisissez votre créneau — confirmation sous 2h.</p>
            {!rdvSent ? <>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                <div>
                  <label style={lbl}>Date souhaitée</label>
                  <input type="date" value={rdvForm.date} onChange={e=>setRdvForm(f=>({...f,date:e.target.value}))} style={inp()} min={new Date().toISOString().split("T")[0]} />
                </div>
                <div>
                  <label style={lbl}>Heure souhaitée</label>
                  <select value={rdvForm.heure} onChange={e=>setRdvForm(f=>({...f,heure:e.target.value}))} style={inp()}>
                    {["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"].map(h=><option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={lbl}>Adresse des travaux</label>
                <input value={rdvForm.adresse} onChange={e=>setRdvForm(f=>({...f,adresse:e.target.value}))} placeholder="12 rue de la Paix, Paris 75001" style={inp()} />
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>Informations complémentaires (optionnel)</label>
                <textarea value={rdvForm.notes} onChange={e=>setRdvForm(f=>({...f,notes:e.target.value}))} placeholder="Précisions sur l'accès, les travaux à effectuer..." style={{ ...inp({ minHeight:70, resize:"vertical" }) }} />
              </div>
              <button onClick={()=>{ if(rdvForm.date&&rdvForm.adresse){ onDemandeRdv(artisan,rdvForm); setRdvSent(true); }}} style={{ ...btn((rdvForm.date&&rdvForm.adresse)?"linear-gradient(135deg,#E8460A,#F59E0B)":"#E8E3DB",(rdvForm.date&&rdvForm.adresse)?"#fff":"#9CA3AF",{ width:"100%", padding:"12px 0", fontSize:15 }) }}>📅 Demander ce créneau</button>
            </> : (
              <div style={{ background:"#F0FDF4", border:"2px solid #86EFAC", borderRadius:13, padding:"26px", textAlign:"center" }}>
                <div style={{ fontSize:42, marginBottom:10 }}>📅</div>
                <div style={{ fontWeight:800, fontSize:16, color:"#16A34A", marginBottom:5 }}>Demande envoyée !</div>
                <div style={{ color:"#4B5563", fontSize:13 }}>Rendez-vous demandé le <strong>{rdvForm.date}</strong> à <strong>{rdvForm.heure}</strong>.<br />Confirmation par {artisan.nom.split(" ")[0]} sous 2h.</div>
              </div>
            )}
          </div>
        )}

        {/* Avis */}
        {tab==="avis" && (
          <div>
            <div style={{ ...card({ marginBottom:14, display:"flex", alignItems:"center", gap:24 }) }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:46, fontWeight:900, color:"#1C1917" }}>{artisan.note}</div>
                <Stars note={artisan.note} size={18} />
                <div style={{ color:"#A8A29E", fontSize:12, marginTop:4 }}>{artisanReviews.length} avis</div>
              </div>
              <div style={{ flex:1 }}>
               {[5,4,3,2,1].map(n=>{
                  const count=artisanReviews.filter(r=>Math.round(r.note)===n).length;
                  const pct=artisanReviews.length?(count/artisanReviews.length)*100:0;
                  return (
                    <div key={n} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                      <span style={{ fontSize:12, color:"#44403C", width:8 }}>{n}</span>
                      <span style={{ color:"#F59E0B", fontSize:12 }}>★</span>
                      <div style={{ flex:1, height:8, background:"#E8E3DB", borderRadius:4, overflow:"hidden" }}>
                        <div style={{ width:`${pct}%`, height:"100%", background:"linear-gradient(90deg,#F59E0B,#E8460A)", borderRadius:4 }} />
                      </div>
                      <span style={{ fontSize:11, color:"#A8A29E", width:16 }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {artisanReviews.map(r=>(
              <div key={r.id} style={{ ...card({ marginBottom:10 }) }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div><span style={{ fontWeight:700, fontSize:14, color:"#1C1917" }}>{r.auteur}</span><span style={{ fontSize:12, color:"#A8A29E", marginLeft:10 }}>{r.date}</span></div>
                  <Stars note={r.note} size={13} />
                </div>
                <p style={{ fontSize:14, color:"#57534E", margin:0, lineHeight:1.6 }}>{r.texte}</p>
              </div>
            ))}
            <div style={card()}>
              <h3 style={{ fontWeight:800, fontSize:15, color:"#1C1917", marginBottom:14 }}>✍️ Laisser un avis</h3>
              {!reviewSent ? <>
                <div style={{ marginBottom:14 }}>
                  <label style={lbl}>Votre note</label>
                  <Stars note={newR.note} size={28} interactive={true} onSet={n=>setNewR(r=>({...r,note:n}))} />
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={lbl}>Votre commentaire</label>
                  <textarea value={newR.texte} onChange={e=>setNewR(r=>({...r,texte:e.target.value}))} placeholder="Décrivez votre expérience..." style={{ ...inp({ minHeight:80, resize:"vertical" }) }} />
                </div>
                <button onClick={()=>{ if(newR.texte.trim()){ onAddReview({artisanId:artisan.id,auteur:user?`${user.prenom} ${user.nom[0]}.`:"Anonyme",note:newR.note,texte:newR.texte,date:"Aujourd'hui"}); setReviewSent(true); }}} style={{ ...btn(newR.texte.trim()?"linear-gradient(135deg,#E8460A,#F59E0B)":"#E8E3DB",newR.texte.trim()?"#fff":"#9CA3AF",{ width:"100%", padding:"11px 0" }) }}>Publier mon avis</button>
              </> : <div style={{ textAlign:"center", padding:"18px 0", color:"#16A34A", fontWeight:700, fontSize:16 }}>✅ Merci pour votre avis !</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MESSAGERIE ──────────────────────────────────────────────────────────────
function Messagerie({ user, artisans, allUsers, messages, onSend }) {
  const [activeConv, setActiveConv] = useState(null);
  const [draft, setDraft] = useState("");

  const convIds = [...new Set(messages.filter(m=>m.from===user.id||m.to===user.id).map(m=>m.from===user.id?m.to:m.from))];
  const getContact = id => [...artisans,...allUsers].find(u=>u.id===id);
  const getConvMsgs = cid => messages.filter(m=>(m.from===user.id&&m.to===cid)||(m.from===cid&&m.to===user.id)).sort((a,b)=>a.id-b.id);
  const getUnread = cid => messages.filter(m=>m.from===cid&&m.to===user.id&&!m.lu).length;

  function handleSend() {
    if (!draft.trim()||!activeConv) return;
    onSend({ from:user.id, to:activeConv, text:draft.trim(), date:"Aujourd'hui", heure:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}), lu:false });
    setDraft("");
  }

  const convMsgs = activeConv?getConvMsgs(activeConv):[];
  const activeContact = activeConv?getContact(activeConv):null;

  return (
    <div style={{ display:"flex", height:"calc(100vh - 62px)", background:"#F8F7F4" }}>
      <div style={{ width:290, background:"#fff", borderRight:"2px solid #E8E3DB", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"18px 16px", borderBottom:"1px solid #E8E3DB" }}>
          <div style={{ fontWeight:800, fontSize:16, color:"#1C1917" }}>💬 Messages</div>
          <div style={{ fontSize:12, color:"#A8A29E", marginTop:2 }}>{convIds.length} conversation{convIds.length>1?"s":""}</div>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>
          {convIds.length===0 ? <div style={{ textAlign:"center", padding:"40px 20px", color:"#A8A29E", fontSize:14 }}><div style={{ fontSize:36, marginBottom:10 }}>💬</div>Aucune conversation.</div>
          : convIds.map(cid=>{
            const contact=getContact(cid); if(!contact) return null;
            const last=getConvMsgs(cid).slice(-1)[0];
            const unread=getUnread(cid);
            return (
              <div key={cid} onClick={()=>setActiveConv(cid)}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", cursor:"pointer", background:activeConv===cid?"#FFF3ED":"none", borderBottom:"1px solid #F5F0EB" }}
                onMouseEnter={e=>{ if(activeConv!==cid) e.currentTarget.style.background="#FAFAF9"; }}
                onMouseLeave={e=>{ if(activeConv!==cid) e.currentTarget.style.background="none"; }}>
                <div style={{ position:"relative" }}>
                  <Avatar u={contact} size={42} />
                  {unread>0 && <span style={{ position:"absolute", top:-4, right:-4, background:"#E8460A", color:"#fff", borderRadius:"50%", width:17, height:17, fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{unread}</span>}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontWeight:700, fontSize:13, color:"#1C1917", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{contact.prenom} {contact.nom}</span>
                    {last && <span style={{ fontSize:11, color:"#A8A29E", flexShrink:0 }}>{last.heure}</span>}
                  </div>
                  <span style={{ fontSize:12, color:"#78716C", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", display:"block" }}>{last?.text||"Démarrer la conversation"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeContact ? (
        <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
          <div style={{ background:"#fff", borderBottom:"2px solid #E8E3DB", padding:"13px 20px", display:"flex", alignItems:"center", gap:12 }}>
            <Avatar u={activeContact} size={40} />
            <div>
              <div style={{ fontWeight:700, fontSize:15, color:"#1C1917" }}>{activeContact.prenom} {activeContact.nom}</div>
              <div style={{ fontSize:12, color:"#A8A29E" }}>{activeContact.type==="artisan"?(METIERS.find(m=>m.id===activeContact.metier)?.label||"Artisan"):"Client"} · 📍 {activeContact.ville}</div>
            </div>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"20px 24px", display:"flex", flexDirection:"column", gap:12 }}>
            {convMsgs.map(m=>{
              const isMe=m.from===user.id;
              return (
                <div key={m.id} style={{ display:"flex", justifyContent:isMe?"flex-end":"flex-start" }}>
                  <div style={{ maxWidth:"70%" }}>
                    <div style={{ background:isMe?"linear-gradient(135deg,#E8460A,#F59E0B)":"#fff", color:isMe?"#fff":"#1C1917", border:isMe?"none":"2px solid #E8E3DB", borderRadius:isMe?"18px 18px 4px 18px":"18px 18px 18px 4px", padding:"10px 14px", fontSize:14, lineHeight:1.5 }}>{m.text}</div>
                    <div style={{ fontSize:11, color:"#A8A29E", marginTop:4, textAlign:isMe?"right":"left" }}>{m.heure}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ background:"#fff", borderTop:"2px solid #E8E3DB", padding:"13px 18px", display:"flex", gap:10, alignItems:"flex-end" }}>
            <textarea value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); handleSend(); }}} placeholder="Votre message... (Entrée pour envoyer)" style={{ ...inp({ flex:1, minHeight:42, maxHeight:100, resize:"none", padding:"10px 14px" }) }} rows={1} />
            <button onClick={handleSend} style={{ ...btn("linear-gradient(135deg,#E8460A,#F59E0B)","#fff",{ padding:"11px 18px", flexShrink:0, borderRadius:12 }) }}>↗</button>
          </div>
        </div>
      ) : (
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", color:"#A8A29E" }}>
          <div style={{ fontSize:54, marginBottom:14 }}>💬</div>
          <div style={{ fontSize:17, fontWeight:700, color:"#78716C", marginBottom:6 }}>Sélectionnez une conversation</div>
          <div style={{ fontSize:14 }}>ou contactez un artisan depuis sa fiche</div>
        </div>
      )}
    </div>
  );
}

// ─── DEVIS ───────────────────────────────────────────────────────────────────
function MesDevis({ user, devis, artisans, onPayer, onAccepter, onRefuser }) {
  const [selected, setSelected] = useState(null);
  const [payStep, setPayStep] = useState(false);
  const [payForm, setPayForm] = useState({ nom:"", numero:"", expiry:"", cvv:"" });
  const [paySent, setPaySent] = useState(false);

  const mesDevis = devis.filter(d=>user.type==="artisan"?d.artisanId===user.id:d.clientId===user.id);

  function handlePay() {
    if (payForm.nom&&payForm.numero&&payForm.expiry&&payForm.cvv) {
      onPayer(selected.id);
      setPaySent(true);
    }
  }

  if (selected) {
    const artisan = artisans.find(a=>a.id===selected.artisanId);
    return (
      <div style={{ minHeight:"calc(100vh-62px)", background:"#F8F7F4", padding:"28px 20px" }}>
        <div style={{ maxWidth:640, margin:"0 auto" }}>
          <button onClick={()=>{ setSelected(null); setPayStep(false); setPaySent(false); }} style={{ ...btn("#F5F0EB","#44403C",{ marginBottom:18, padding:"7px 14px", fontSize:13 }) }}>← Retour</button>

          <div style={{ ...card({ marginBottom:16 }) }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
              <div>
                <h2 style={{ fontSize:19, fontWeight:900, color:"#1C1917", margin:0, marginBottom:6 }}>{selected.titre}</h2>
                <div style={{ fontSize:13, color:"#78716C" }}>Artisan : <strong>{artisan?.nom}</strong> · {selected.date}</div>
              </div>
              <Badge statut={selected.statut} />
            </div>

            <div style={{ border:"1px solid #E8E3DB", borderRadius:12, overflow:"hidden", marginBottom:18 }}>
              <div style={{ background:"#FAFAF9", padding:"10px 16px", fontWeight:700, fontSize:12, color:"#44403C", textTransform:"uppercase", borderBottom:"1px solid #E8E3DB" }}>Détail des prestations</div>
              {selected.lignes.map((l,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"11px 16px", borderBottom:i<selected.lignes.length-1?"1px solid #F5F0EB":"none", fontSize:14 }}>
                  <span style={{ color:"#44403C" }}>{l.desc}</span>
                  <span style={{ fontWeight:700, color:"#1C1917" }}>{l.prix}€</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", padding:"13px 16px", background:"#FFF3ED", borderTop:"2px solid #E8E3DB" }}>
                <span style={{ fontWeight:800, fontSize:15, color:"#1C1917" }}>TOTAL TTC</span>
                <span style={{ fontWeight:900, fontSize:18, color:"#E8460A" }}>{selected.montant}€</span>
              </div>
            </div>

            <p style={{ fontSize:13, color:"#78716C", marginBottom:18, lineHeight:1.6 }}>{selected.details}</p>

            {/* Actions */}
            {user.type!=="artisan" && selected.statut==="en attente" && (
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={()=>onAccepter(selected.id)} style={{ ...btn("linear-gradient(135deg,#059669,#10B981)","#fff",{ flex:1, padding:"11px 0" }) }}>✅ Accepter le devis</button>
                <button onClick={()=>onRefuser(selected.id)} style={{ ...btn("#FEF2F2","#EF4444",{ flex:1, padding:"11px 0", border:"2px solid #FCA5A5" }) }}>✕ Refuser</button>
              </div>
            )}

            {user.type!=="artisan" && selected.statut==="accepté" && !payStep && !paySent && (
              <button onClick={()=>setPayStep(true)} style={{ ...btn("linear-gradient(135deg,#E8460A,#F59E0B)","#fff",{ width:"100%", padding:"12px 0", fontSize:15 }) }}>💳 Payer {selected.montant}€ en ligne</button>
            )}
          </div>

          {/* Paiement */}
          {payStep && !paySent && (
            <div style={card()}>
              <h3 style={{ fontWeight:800, fontSize:16, color:"#1C1917", marginBottom:4 }}>💳 Paiement sécurisé</h3>
              <p style={{ color:"#78716C", fontSize:13, marginBottom:18 }}>Vos données sont chiffrées et sécurisées 🔒</p>
              <div style={{ marginBottom:12 }}>
                <label style={lbl}>Nom sur la carte</label>
                <input value={payForm.nom} onChange={e=>setPayForm(f=>({...f,nom:e.target.value}))} placeholder="JEAN DUPONT" style={inp()} />
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={lbl}>Numéro de carte</label>
                <input value={payForm.numero} onChange={e=>setPayForm(f=>({...f,numero:e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim()}))} placeholder="1234 5678 9012 3456" maxLength={19} style={inp()} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:18 }}>
                <div><label style={lbl}>Date d'expiration</label><input value={payForm.expiry} onChange={e=>setPayForm(f=>({...f,expiry:e.target.value}))} placeholder="MM/AA" maxLength={5} style={inp()} /></div>
                <div><label style={lbl}>CVV</label><input value={payForm.cvv} onChange={e=>setPayForm(f=>({...f,cvv:e.target.value.replace(/\D/g,"").slice(0,3)}))} placeholder="123" maxLength={3} style={inp()} /></div>
              </div>
              <div style={{ background:"#ECFDF5", border:"1px solid #6EE7B7", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#059669", fontWeight:600, marginBottom:16 }}>🔒 Paiement sécurisé SSL · Données cryptées · Conforme PCI-DSS</div>
              <button onClick={handlePay} style={{ ...btn("linear-gradient(135deg,#059669,#10B981)","#fff",{ width:"100%", padding:"13px 0", fontSize:15 }) }}>✅ Confirmer le paiement de {selected.montant}€</button>
            </div>
          )}

          {paySent && (
            <div style={{ ...card({ textAlign:"center", padding:36 }) }}>
              <div style={{ fontSize:52, marginBottom:14 }}>🎉</div>
              <div style={{ fontWeight:900, fontSize:20, color:"#059669", marginBottom:6 }}>Paiement confirmé !</div>
              <div style={{ color:"#4B5563", fontSize:14, marginBottom:16 }}>Votre paiement de <strong>{selected.montant}€</strong> a été accepté.<br />Un reçu vous a été envoyé par email.</div>
              <Badge statut="payé" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"calc(100vh-62px)", background:"#F8F7F4", padding:"28px 20px" }}>
      <div style={{ maxWidth:740, margin:"0 auto" }}>
        <h1 style={{ fontSize:22, fontWeight:900, color:"#1C1917", marginBottom:6 }}>📄 {user.type==="artisan"?"Devis envoyés":"Mes devis"}</h1>
        <p style={{ color:"#78716C", fontSize:14, marginBottom:24 }}>{mesDevis.length} devis au total</p>
        {mesDevis.length===0 ? (
          <div style={{ ...card({ textAlign:"center", padding:48 }) }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📄</div>
            <div style={{ fontWeight:700, color:"#78716C", fontSize:16 }}>Aucun devis pour le moment.</div>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {mesDevis.map(d=>{
              const artisan=artisans.find(a=>a.id===d.artisanId);
              return (
                <div key={d.id} onClick={()=>setSelected(d)}
                  style={{ ...card({ cursor:"pointer", display:"flex", alignItems:"center", gap:16 }), transition:"all 0.15s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.border="2px solid #E8460A55"; e.currentTarget.style.boxShadow="0 4px 18px #E8460A10"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.border="2px solid #E8E3DB"; e.currentTarget.style.boxShadow="none"; }}>
                  <div style={{ width:46, height:46, borderRadius:13, background:"#FFF3ED", border:"2px solid #FCA99E44", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>📄</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, fontSize:15, color:"#1C1917", marginBottom:4 }}>{d.titre}</div>
                    <div style={{ fontSize:13, color:"#78716C" }}>Artisan : {artisan?.nom} · {d.date}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontWeight:900, fontSize:18, color:"#E8460A", marginBottom:6 }}>{d.montant}€</div>
                    <Badge statut={d.statut} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CALENDRIER ──────────────────────────────────────────────────────────────
function CalendrierRdv({ rdvs, user, artisans, allUsers }) {
  const [vue, setVue] = useState("liste");
  const mois = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
  const jours = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];
  const now = new Date();
  const [moisActif, setMoisActif] = useState(now.getMonth());
  const [anneeActif, setAnneeActif] = useState(now.getFullYear());

  const mesRdv = rdvs.filter(r=>user.type==="artisan"?r.artisanId===user.id:r.clientId===user.id);

  function getContactRdv(rdv) {
    const id = user.type==="artisan"?rdv.clientId:rdv.artisanId;
    return [...artisans,...allUsers].find(u=>u.id===id);
  }

  // Calendrier
  const firstDay = new Date(anneeActif, moisActif, 1).getDay();
  const daysInMonth = new Date(anneeActif, moisActif+1, 0).getDate();
  const cells = Array(firstDay).fill(null).concat(Array.from({length:daysInMonth},(_,i)=>i+1));

  function rdvsForDay(day) {
    const dateStr = `${anneeActif}-${String(moisActif+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return mesRdv.filter(r=>r.date===dateStr);
  }

  return (
    <div style={{ minHeight:"calc(100vh-62px)", background:"#F8F7F4", padding:"28px 20px" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24, flexWrap:"wrap" }}>
          <h1 style={{ fontSize:22, fontWeight:900, color:"#1C1917", margin:0 }}>📅 Rendez-vous</h1>
          <span style={{ background:"#FFF3ED", color:"#E8460A", border:"1px solid #FCA99E44", borderRadius:20, padding:"4px 14px", fontSize:13, fontWeight:700 }}>{mesRdv.length} RDV</span>
          <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
            {[["liste","📋 Liste"],["calendrier","📅 Calendrier"]].map(([id,label])=>(
              <button key={id} onClick={()=>setVue(id)} style={{ ...btn(vue===id?"#1C1917":"#F5F0EB",vue===id?"#fff":"#44403C",{ padding:"7px 14px", fontSize:13 }) }}>{label}</button>
            ))}
          </div>
        </div>

        {vue==="liste" ? (
          <div>
            {mesRdv.length===0 ? (
              <div style={{ ...card({ textAlign:"center", padding:48 }) }}>
                <div style={{ fontSize:48, marginBottom:12 }}>📅</div>
                <div style={{ fontWeight:700, color:"#78716C", fontSize:16 }}>Aucun rendez-vous planifié.</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
                {[...mesRdv].sort((a,b)=>a.date.localeCompare(b.date)).map(r=>{
                  const contact = getContactRdv(r);
                  const dateObj = new Date(r.date+"T12:00:00");
                  return (
                    <div key={r.id} style={card({ display:"flex", gap:16, alignItems:"center" })}>
                      <div style={{ width:56, height:56, borderRadius:14, background:"#FFF3ED", border:"2px solid #FCA99E44", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <div style={{ fontSize:16, fontWeight:900, color:"#E8460A", lineHeight:1 }}>{dateObj.getDate()}</div>
                        <div style={{ fontSize:10, color:"#F59E0B", fontWeight:700 }}>{mois[dateObj.getMonth()]}</div>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:800, fontSize:15, color:"#1C1917", marginBottom:4 }}>{r.titre}</div>
                        <div style={{ display:"flex", gap:12, fontSize:12, color:"#78716C", flexWrap:"wrap" }}>
                          <span>🕐 {r.heure} ({r.duree}min)</span>
                          <span>📍 {r.adresse}</span>
                          {contact && <span>👤 {contact.prenom} {contact.nom}</span>}
                        </div>
                      </div>
                      <Badge statut={r.statut} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div style={card()}>
            {/* Nav mois */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <button onClick={()=>{ if(moisActif===0){setMoisActif(11);setAnneeActif(y=>y-1);}else setMoisActif(m=>m-1); }} style={{ ...btn("#F5F0EB","#44403C",{ padding:"7px 14px" }) }}>←</button>
              <span style={{ fontWeight:800, fontSize:17, color:"#1C1917" }}>{mois[moisActif]} {anneeActif}</span>
              <button onClick={()=>{ if(moisActif===11){setMoisActif(0);setAnneeActif(y=>y+1);}else setMoisActif(m=>m+1); }} style={{ ...btn("#F5F0EB","#44403C",{ padding:"7px 14px" }) }}>→</button>
            </div>
            {/* Jours header */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4, marginBottom:8 }}>
              {jours.map(j=><div key={j} style={{ textAlign:"center", fontSize:12, fontWeight:700, color:"#9CA3AF", padding:"4px 0" }}>{j}</div>)}
            </div>
            {/* Cells */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
              {cells.map((day,i)=>{
                if(!day) return <div key={i} />;
                const dayRdvs = rdvsForDay(day);
                const isToday = day===now.getDate()&&moisActif===now.getMonth()&&anneeActif===now.getFullYear();
                return (
                  <div key={i} style={{ minHeight:52, borderRadius:10, padding:"5px", background:isToday?"#FFF3ED":dayRdvs.length>0?"#ECFDF5":"#FAFAF9", border:`1px solid ${isToday?"#FCA99E":dayRdvs.length>0?"#6EE7B7":"#E8E3DB"}` }}>
                    <div style={{ fontSize:12, fontWeight:isToday?800:500, color:isToday?"#E8460A":"#44403C", marginBottom:2 }}>{day}</div>
                    {dayRdvs.map(r=>(
                      <div key={r.id} style={{ background:"#E8460A", color:"#fff", borderRadius:4, padding:"2px 5px", fontSize:10, fontWeight:700, marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.heure} {r.titre}</div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ user, artisans, messages, reviews, devis, rdvs, setPage, allUsers }) {
  const artisan = artisans.find(a=>a.id===user.id)||user;
  const myReviews = reviews.filter(r=>r.artisanId===user.id);
  const myMessages = messages.filter(m=>m.to===user.id);
  const unread = myMessages.filter(m=>!m.lu).length;
  const myDevis = devis.filter(d=>d.artisanId===user.id);
  const myRdvs = rdvs.filter(r=>r.artisanId===user.id);
  const m = METIERS.find(x=>x.id===artisan.metier)||METIERS[0];
  const revenuTotal = myDevis.filter(d=>d.statut==="accepté"||d.statut==="payé").reduce((s,d)=>s+d.montant,0);

  const stats = [
    { emoji:"⭐", label:"Note", value:artisan.note||"—", sub:`${artisan.avis} avis`, color:"#F59E0B" },
    { emoji:"📄", label:"Devis envoyés", value:myDevis.length, sub:`${myDevis.filter(d=>d.statut==="accepté").length} accepté(s)`, color:"#3B82F6" },
    { emoji:"📅", label:"Rendez-vous", value:myRdvs.length, sub:`${myRdvs.filter(r=>r.statut==="confirmé").length} confirmé(s)`, color:"#10B981" },
    { emoji:"💰", label:"Revenus", value:`${revenuTotal}€`, sub:"devis acceptés", color:"#E8460A" },
  ];

  return (
    <div style={{ minHeight:"calc(100vh-62px)", background:"#F8F7F4", padding:"28px 20px" }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:28, flexWrap:"wrap" }}>
          <Avatar u={artisan} size={62} />
          <div>
            <h1 style={{ fontSize:21, fontWeight:900, color:"#1C1917", margin:0, marginBottom:4 }}>Bonjour, {user.prenom} 👋</h1>
            <div style={{ color:"#78716C", fontSize:14 }}>{m.emoji} {m.label} · 📍 {artisan.ville} · {artisan.tarif}</div>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:10, flexWrap:"wrap" }}>
            <button onClick={()=>setPage("messages")} style={{ ...btn("#fff","#1C1917",{ border:"2px solid #E8E3DB", padding:"8px 14px", fontSize:13, position:"relative" }) }}>
              💬 Messages {unread>0&&<span style={{ marginLeft:5, background:"#E8460A", color:"#fff", borderRadius:10, padding:"1px 7px", fontSize:10, fontWeight:800 }}>{unread}</span>}
            </button>
            <button onClick={()=>setPage("calendrier")} style={{ ...btn("#fff","#1C1917",{ border:"2px solid #E8E3DB", padding:"8px 14px", fontSize:13 }) }}>📅 Calendrier</button>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
          {stats.map(s=>(
            <div key={s.label} style={{ ...card({ textAlign:"center", padding:"18px 14px" }) }}>
              <div style={{ fontSize:26, marginBottom:5 }}>{s.emoji}</div>
              <div style={{ fontSize:24, fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontWeight:700, fontSize:12, color:"#1C1917", marginTop:2 }}>{s.label}</div>
              <div style={{ fontSize:11, color:"#A8A29E", marginTop:2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
          <div style={card()}>
            <div style={{ fontWeight:800, fontSize:14, color:"#1C1917", marginBottom:14 }}>📄 Derniers devis</div>
            {myDevis.length===0 ? <div style={{ color:"#A8A29E", fontSize:13, textAlign:"center", padding:"16px 0" }}>Aucun devis</div> :
              myDevis.slice(-3).reverse().map(d=>(
                <div key={d.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid #F5F0EB" }}>
                  <div><div style={{ fontWeight:700, fontSize:13, color:"#1C1917" }}>{d.titre}</div><div style={{ fontSize:11, color:"#A8A29E" }}>{d.date}</div></div>
                  <div style={{ textAlign:"right" }}><div style={{ fontWeight:800, color:"#E8460A", fontSize:14 }}>{d.montant}€</div><Badge statut={d.statut} /></div>
                </div>
              ))
            }
          </div>

          <div style={card()}>
            <div style={{ fontWeight:800, fontSize:14, color:"#1C1917", marginBottom:14 }}>📅 Prochains RDV</div>
            {myRdvs.length===0 ? <div style={{ color:"#A8A29E", fontSize:13, textAlign:"center", padding:"16px 0" }}>Aucun rendez-vous</div> :
              myRdvs.slice(0,3).map(r=>{
                const dateObj=new Date(r.date+"T12:00:00");
                return (
                  <div key={r.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:"1px solid #F5F0EB" }}>
                    <div style={{ width:40, height:40, borderRadius:10, background:"#FFF3ED", border:"1px solid #FCA99E44", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <div style={{ fontSize:14, fontWeight:900, color:"#E8460A", lineHeight:1 }}>{dateObj.getDate()}</div>
                      <div style={{ fontSize:9, color:"#F59E0B", fontWeight:700 }}>{"Jan,Fév,Mar,Avr,Mai,Jun,Jul,Aoû,Sep,Oct,Nov,Déc".split(",")[dateObj.getMonth()]}</div>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:13, color:"#1C1917" }}>{r.titre}</div>
                      <div style={{ fontSize:11, color:"#78716C" }}>🕐 {r.heure} · {r.adresse.split(",")[0]}</div>
                    </div>
                    <Badge statut={r.statut} />
                  </div>
                );
              })
            }
            <button onClick={()=>setPage("calendrier")} style={{ ...btn("#F5F0EB","#44403C",{ width:"100%", padding:"9px 0", fontSize:12, marginTop:10 }) }}>Voir le calendrier →</button>
          </div>

          <div style={card()}>
            <div style={{ fontWeight:800, fontSize:14, color:"#1C1917", marginBottom:14 }}>⭐ Derniers avis</div>
            {myReviews.length===0 ? <div style={{ color:"#A8A29E", fontSize:13, textAlign:"center", padding:"16px 0" }}>Aucun avis</div> :
              myReviews.slice(-2).reverse().map(r=>(
                <div key={r.id} style={{ paddingBottom:10, marginBottom:10, borderBottom:"1px solid #F5F0EB" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontWeight:700, fontSize:13 }}>{r.auteur}</span>
                    <Stars note={r.note} size={12} />
                  </div>
                  <p style={{ fontSize:12, color:"#57534E", margin:0, lineHeight:1.5 }}>{r.texte}</p>
                </div>
              ))
            }
          </div>

          <div style={card()}>
            <div style={{ fontWeight:800, fontSize:14, color:"#1C1917", marginBottom:14 }}>📨 Messages récents</div>
            {myMessages.length===0 ? <div style={{ color:"#A8A29E", fontSize:13, textAlign:"center", padding:"16px 0" }}>Aucun message</div> :
              myMessages.slice(-3).reverse().map(m=>(
                <div key={m.id} onClick={()=>setPage("messages")} style={{ display:"flex", gap:10, padding:"9px 10px", background:m.lu?"#FAFAF9":"#FFF3ED", border:`1px solid ${m.lu?"#E8E3DB":"#FCA99E44"}`, borderRadius:10, cursor:"pointer", marginBottom:8 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, color:"#57534E", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.text}</div>
                    <div style={{ fontSize:10, color:"#A8A29E", marginTop:2 }}>{m.heure}</div>
                  </div>
                  {!m.lu && <span style={{ background:"#E8460A", color:"#fff", borderRadius:6, padding:"2px 7px", fontSize:9, fontWeight:800, flexShrink:0, alignSelf:"center" }}>Nouveau</span>}
                </div>
              ))
            }
            <button onClick={()=>setPage("messages")} style={{ ...btn("#F5F0EB","#44403C",{ width:"100%", padding:"9px 0", fontSize:12 }) }}>Tous les messages →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CARTE ───────────────────────────────────────────────────────────────────
function Carte({ artisans, onSelect }) {
  const [fVille, setFVille] = useState("");
  const [fMetier, setFMetier] = useState("tous");
  const [popup, setPopup] = useState(null);
  const [hovered, setHovered] = useState(null);

  const filtered = artisans.filter(a=>(fVille===""||a.ville.toLowerCase().includes(fVille.toLowerCase()))&&(fMetier==="tous"||a.metier===fMetier));
  const byVille = {};
  filtered.forEach(a=>{ if(!byVille[a.ville]) byVille[a.ville]=[]; byVille[a.ville].push(a); });

  return (
    <div style={{ display:"flex", height:"calc(100vh - 62px)" }}>
      <div style={{ width:260, background:"#fff", borderRight:"2px solid #E8E3DB", overflowY:"auto", padding:16, flexShrink:0 }}>
        <div style={{ fontWeight:800, fontSize:14, color:"#1C1917", marginBottom:12 }}>🗺️ Carte des artisans</div>
        <input value={fVille} onChange={e=>setFVille(e.target.value)} placeholder="Filtrer par ville..." style={{ ...inp({ marginBottom:9 }) }} />
        <select value={fMetier} onChange={e=>setFMetier(e.target.value)} style={{ ...inp({ marginBottom:14 }) }}>
          {METIERS.map(m=><option key={m.id} value={m.id}>{m.emoji} {m.label}</option>)}
        </select>
        <div style={{ fontSize:12, color:"#A8A29E", marginBottom:11 }}>{filtered.length} artisan{filtered.length>1?"s":""}</div>
        {filtered.map(a=>{ const m=METIERS.find(x=>x.id===a.metier); return (
          <div key={a.id} onClick={()=>onSelect(a)} onMouseEnter={()=>setHovered(a.id)} onMouseLeave={()=>setHovered(null)}
            style={{ background:hovered===a.id?"#FFF3ED":"#FAFAF9", border:`2px solid ${hovered===a.id?"#E8460A55":"#E8E3DB"}`, borderRadius:11, padding:"11px 12px", marginBottom:9, cursor:"pointer", transition:"all 0.13s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:9 }}>
              <Avatar u={a} size={34} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:700, fontSize:13, color:"#1C1917", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.nom}</div>
                <div style={{ fontSize:11, color:"#78716C" }}>{m?.emoji} {m?.label} · {a.ville}</div>
              </div>
              <div style={{ flexShrink:0, textAlign:"right" }}>
                <div style={{ fontSize:12, fontWeight:800, color:"#E8460A" }}>{a.tarif}</div>
                <div style={{ fontSize:10, color:a.dispo?"#059669":"#9CA3AF", fontWeight:700 }}>{a.dispo?"● Dispo":"○ Occupé"}</div>
              </div>
            </div>
          </div>
        );})}
      </div>
      <div style={{ flex:1, background:"#E8EFF6", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 1px 1px, #C8D5E244 1px, transparent 0)", backgroundSize:"26px 26px" }} />
        <svg viewBox="0 0 500 480" style={{ width:"100%", height:"100%", position:"absolute" }}>
          <path d="M180 60 L230 50 L290 55 L340 70 L400 90 L430 130 L440 170 L430 210 L410 250 L420 300 L410 340 L390 390 L360 410 L320 420 L280 415 L240 400 L200 390 L175 360 L150 320 L140 280 L150 240 L145 200 L155 165 L160 120 Z" fill="#D6E8CE" stroke="#A8C49A" strokeWidth="2" />
          {VILLES_MAP.map(v=>{
            const va=byVille[v.name]||[]; if(!va.length) return null;
            const isHov=va.some(a=>a.id===hovered);
            const hasDispo=va.some(a=>a.dispo);
            return (
              <g key={v.name} onClick={()=>setPopup(popup?.name===v.name?null:{name:v.name,artisans:va})} style={{ cursor:"pointer" }}>
                {isHov && <circle cx={v.x} cy={v.y} r={26} fill="#E8460A18" stroke="#E8460A33" strokeWidth={1} />}
                <circle cx={v.x} cy={v.y} r={va.length>1?18:14} fill={popup?.name===v.name?"#E8460A":isHov?"#E8460A":hasDispo?"#fff":"#F3F4F6"} stroke={hasDispo?"#E8460A":"#9CA3AF"} strokeWidth={2.5} />
                <text x={v.x} y={v.y+5} textAnchor="middle" style={{ fontSize:11, fontWeight:800, fill:popup?.name===v.name||isHov?"#fff":"#E8460A", pointerEvents:"none" }}>{va.length}</text>
                <text x={v.x} y={v.y+(va.length>1?36:30)} textAnchor="middle" style={{ fontSize:10, fontWeight:600, fill:"#44403C", pointerEvents:"none" }}>{v.name}</text>
              </g>
            );
          })}
        </svg>
        {popup && (
          <div style={{ position:"absolute", top:20, left:"50%", transform:"translateX(-50%)", background:"#fff", border:"2px solid #E8E3DB", borderRadius:16, padding:"16px 18px", minWidth:240, boxShadow:"0 8px 32px #00000018", zIndex:10 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontWeight:800, fontSize:14, color:"#1C1917" }}>📍 {popup.name} — {popup.artisans.length} artisan{popup.artisans.length>1?"s":""}</span>
              <button onClick={()=>setPopup(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"#A8A29E", fontSize:16 }}>✕</button>
            </div>
            {popup.artisans.map(a=>{ const m=METIERS.find(x=>x.id===a.metier); return (
              <div key={a.id} onClick={()=>onSelect(a)} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 10px", borderRadius:10, cursor:"pointer", marginBottom:6, background:"#FAFAF9", border:"1px solid #E8E3DB" }}
                onMouseEnter={e=>e.currentTarget.style.background="#FFF3ED"}
                onMouseLeave={e=>e.currentTarget.style.background="#FAFAF9"}>
                <Avatar u={a} size={32} />
                <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:13, color:"#1C1917" }}>{a.nom}</div><div style={{ fontSize:11, color:"#78716C" }}>{m?.emoji} {m?.label}</div></div>
                <div style={{ textAlign:"right" }}><div style={{ fontSize:12, fontWeight:800, color:"#E8460A" }}>{a.tarif}</div><div style={{ fontSize:10, color:a.dispo?"#059669":"#9CA3AF", fontWeight:700 }}>{a.dispo?"● Dispo":"○ Occupé"}</div></div>
              </div>
            );})}
          </div>
        )}
        <div style={{ position:"absolute", bottom:18, right:18, background:"#fff", border:"2px solid #E8E3DB", borderRadius:13, padding:"12px 16px" }}>
          <div style={{ fontWeight:700, fontSize:11, color:"#44403C", marginBottom:8, textTransform:"uppercase" }}>Légende</div>
          {[["#E8460A","Disponibles"],["#9CA3AF","Occupés"]].map(([c,l])=>(
            <div key={l} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}><div style={{ width:11, height:11, borderRadius:"50%", background:c }} /><span style={{ fontSize:11, color:"#78716C" }}>{l}</span></div>
          ))}
        </div>
        <div style={{ position:"absolute", top:18, left:18, background:"#fff", border:"2px solid #E8E3DB", borderRadius:12, padding:"11px 16px" }}>
          <div style={{ fontWeight:700, fontSize:13, color:"#1C1917" }}>🇫🇷 France métropolitaine</div>
          <div style={{ fontSize:11, color:"#A8A29E", marginTop:2 }}>{filtered.length} artisan{filtered.length>1?"s":""} géolocalisé{filtered.length>1?"s":""}</div>
        </div>
      </div>
    </div>
  );
}

// ─── REGISTER ────────────────────────────────────────────────────────────────
function Register({ onDone, setPage }) {
  const [step,setStep]=useState(1);
  const [type,setType]=useState("");
  const [f,setF]=useState({ prenom:"",nom:"",email:"",password:"",confirm:"",telephone:"",ville:"",metier:"",tarif:"",certifie:false,desc:"" });
  const [err,setErr]=useState({});
  const [ok,setOk]=useState(false);
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  function v2(){const e={};if(!f.prenom.trim())e.prenom="Requis";if(!f.nom.trim())e.nom="Requis";if(!f.email.includes("@"))e.email="Email invalide";if(f.password.length<6)e.password="Min. 6 car.";if(f.password!==f.confirm)e.confirm="Ne correspond pas";if(!f.telephone.trim())e.telephone="Requis";if(!f.ville.trim())e.ville="Requis";setErr(e);return Object.keys(e).length===0;}
  function v3(){if(type!=="artisan")return true;const e={};if(!f.metier)e.metier="Requis";if(!f.tarif.trim())e.tarif="Requis";if(!f.desc.trim())e.desc="Requis";setErr(e);return Object.keys(e).length===0;}
  function submit(){if(!v3())return;onDone({...f,type,id:Date.now(),note:0,avis:0,dispo:true,photo:f.prenom[0].toUpperCase()+f.nom[0].toUpperCase(),couleur:["#E8460A","#3B82F6","#10B981","#F59E0B","#6366F1"][Math.floor(Math.random()*5)]});setOk(true);}
  if(ok) return (<div style={{ minHeight:"100vh", background:"#F8F7F4", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ ...card({ maxWidth:420, width:"100%", textAlign:"center", padding:44 }) }}><div style={{ fontSize:52, marginBottom:14 }}>🎉</div><h2 style={{ fontSize:22, fontWeight:900, color:"#1C1917", marginBottom:8 }}>Bienvenue, {f.prenom} !</h2><p style={{ color:"#78716C", fontSize:14, marginBottom:24 }}>{type==="artisan"?"Votre profil est en ligne.":"Trouvez votre artisan BTP."}</p><button onClick={()=>setPage(type==="artisan"?"dashboard":"annonces")} style={{ ...btn("linear-gradient(135deg,#E8460A,#F59E0B)","#fff",{ width:"100%", padding:"13px 0", fontSize:15 }) }}>{type==="artisan"?"Mon tableau de bord →":"Trouver un artisan →"}</button></div></div>);
  return (
    <div style={{ minHeight:"100vh", background:"#F8F7F4", padding:"36px 20px" }}>
      <div style={{ maxWidth:500, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
          {[1,2,3].map(s=>(<div key={s} style={{ display:"flex", alignItems:"center", gap:8, flex:s<3?1:"none" }}><div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", background:step>=s?"linear-gradient(135deg,#E8460A,#F59E0B)":"#E8E3DB", color:step>=s?"#fff":"#A8A29E", fontWeight:800, fontSize:12 }}>{s}</div>{s<3&&<div style={{ flex:1, height:2, background:step>s?"#E8460A":"#E8E3DB", borderRadius:2 }} />}</div>))}
          <span style={{ fontSize:12, color:"#A8A29E", marginLeft:6 }}>Étape {step}/3</span>
        </div>
        <div style={card()}>
          {step===1&&<><h2 style={{ fontSize:21, fontWeight:900, color:"#1C1917", marginBottom:6 }}>Créer un compte</h2><p style={{ color:"#78716C", fontSize:14, marginBottom:24 }}>Choisissez votre profil</p><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:22 }}>{[["artisan","🔨","Artisan BTP","Proposez vos services"],["particulier","👤","Particulier","Trouvez un artisan"],["entreprise","🏢","Entreprise","Gérez vos chantiers"]].map(([id,emoji,label,desc])=>(<div key={id} onClick={()=>setType(id)} style={{ border:`2px solid ${type===id?"#E8460A":"#E8E3DB"}`, background:type===id?"#FFF3ED":"#FAFAF9", borderRadius:14, padding:"16px 10px", textAlign:"center", cursor:"pointer" }}><div style={{ fontSize:28, marginBottom:7 }}>{emoji}</div><div style={{ fontWeight:700, fontSize:13, color:"#1C1917", marginBottom:3 }}>{label}</div><div style={{ fontSize:11, color:"#A8A29E" }}>{desc}</div></div>))}</div><button onClick={()=>type&&setStep(2)} style={{ ...btn(type?"linear-gradient(135deg,#E8460A,#F59E0B)":"#E8E3DB",type?"#fff":"#9CA3AF",{ width:"100%", padding:"12px 0", fontSize:15 }) }}>Continuer →</button></>}
          {step===2&&<><h2 style={{ fontSize:21, fontWeight:900, color:"#1C1917", marginBottom:6 }}>Informations personnelles</h2><p style={{ color:"#78716C", fontSize:13, marginBottom:20 }}>Renseignez vos coordonnées</p><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>{[["prenom","Prénom","Jean"],["nom","Nom","Dupont"]].map(([k,label,ph])=>(<div key={k}><label style={lbl}>{label} *</label><input value={f[k]} onChange={e=>set(k,e.target.value)} placeholder={ph} style={inp({ borderColor:err[k]?"#EF4444":"#E8E3DB" })} />{err[k]&&<div style={{ color:"#EF4444",fontSize:11,marginTop:3 }}>{err[k]}</div>}</div>))}</div>{[["email","Email","jean@email.com","email"],["telephone","Téléphone","06 12 34 56 78","tel"],["ville","Ville","Paris","text"]].map(([k,label,ph,t])=>(<div key={k} style={{ marginBottom:12 }}><label style={lbl}>{label} *</label><input value={f[k]} onChange={e=>set(k,e.target.value)} placeholder={ph} type={t} style={inp({ borderColor:err[k]?"#EF4444":"#E8E3DB" })} />{err[k]&&<div style={{ color:"#EF4444",fontSize:11,marginTop:3 }}>{err[k]}</div>}</div>))}<div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:18 }}>{[["password","Mot de passe","••••••••"],["confirm","Confirmer","••••••••"]].map(([k,label,ph])=>(<div key={k}><label style={lbl}>{label} *</label><input value={f[k]} onChange={e=>set(k,e.target.value)} placeholder={ph} type="password" style={inp({ borderColor:err[k]?"#EF4444":"#E8E3DB" })} />{err[k]&&<div style={{ color:"#EF4444",fontSize:11,marginTop:3 }}>{err[k]}</div>}</div>))}</div><div style={{ display:"flex", gap:10 }}><button onClick={()=>setStep(1)} style={{ ...btn("#F5F0EB","#44403C",{ flex:1, padding:"11px 0" }) }}>← Retour</button><button onClick={()=>v2()&&setStep(3)} style={{ ...btn("linear-gradient(135deg,#E8460A,#F59E0B)","#fff",{ flex:2, padding:"11px 0", fontSize:15 }) }}>Continuer →</button></div></>}
          {step===3&&<><h2 style={{ fontSize:21, fontWeight:900, color:"#1C1917", marginBottom:6 }}>{type==="artisan"?"⚙️ Votre activité":"✅ Confirmation"}</h2><p style={{ color:"#78716C", fontSize:13, marginBottom:20 }}>{type==="artisan"?"Détails BTP":"Vérifiez vos infos"}</p>{type==="artisan"?<><div style={{ marginBottom:12 }}><label style={lbl}>Corps de métier *</label><select value={f.metier} onChange={e=>set("metier",e.target.value)} style={inp({ borderColor:err.metier?"#EF4444":"#E8E3DB" })}><option value="">-- Sélectionner --</option>{METIERS.filter(m=>m.id!=="tous").map(m=><option key={m.id} value={m.id}>{m.emoji} {m.label}</option>)}</select>{err.metier&&<div style={{ color:"#EF4444",fontSize:11,marginTop:3 }}>{err.metier}</div>}</div><div style={{ marginBottom:12 }}><label style={lbl}>Tarif horaire *</label><input value={f.tarif} onChange={e=>set("tarif",e.target.value)} placeholder="Ex: 55€/h" style={inp({ borderColor:err.tarif?"#EF4444":"#E8E3DB" })} />{err.tarif&&<div style={{ color:"#EF4444",fontSize:11,marginTop:3 }}>{err.tarif}</div>}</div><div style={{ marginBottom:12 }}><label style={lbl}>Description *</label><textarea value={f.desc} onChange={e=>set("desc",e.target.value)} placeholder="Vos spécialités..." style={{ ...inp({ minHeight:80, resize:"vertical", borderColor:err.desc?"#EF4444":"#E8E3DB" }) }} />{err.desc&&<div style={{ color:"#EF4444",fontSize:11,marginTop:3 }}>{err.desc}</div>}</div><label style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", marginBottom:18, fontSize:13, color:"#44403C" }}><input type="checkbox" checked={f.certifie} onChange={e=>set("certifie",e.target.checked)} style={{ accentColor:"#E8460A", width:15, height:15 }} />Je possède une certification RGE / Qualibat</label></>:<div style={{ background:"#FFF8F5", border:"2px solid #FCA99E", borderRadius:13, padding:18, marginBottom:20 }}>{[["Profil",type==="particulier"?"👤 Particulier":"🏢 Entreprise"],["Nom",`${f.prenom} ${f.nom}`],["Email",f.email],["Ville",f.ville]].map(([k,v])=>(<div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:6 }}><span style={{ color:"#78716C" }}>{k}</span><span style={{ fontWeight:600, color:"#1C1917" }}>{v}</span></div>))}</div>}<div style={{ display:"flex", gap:10 }}><button onClick={()=>setStep(2)} style={{ ...btn("#F5F0EB","#44403C",{ flex:1, padding:"11px 0" }) }}>← Retour</button><button onClick={submit} style={{ ...btn("linear-gradient(135deg,#E8460A,#F59E0B)","#fff",{ flex:2, padding:"11px 0", fontSize:15 }) }}>✅ Créer mon compte</button></div></>}
        </div>
        <p style={{ textAlign:"center", fontSize:13, color:"#A8A29E", marginTop:14 }}>Déjà inscrit ? <button onClick={()=>setPage("login")} style={{ background:"none", border:"none", color:"#E8460A", fontWeight:700, cursor:"pointer", fontSize:13 }}>Se connecter</button></p>
      </div>
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────
function Login({ users, onLogin, setPage }) {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState("");
  function handle(){const u=users.find(x=>x.email===email&&x.password===password);if(u){onLogin(u);setPage(u.type==="artisan"?"dashboard":"annonces");}else setError("Email ou mot de passe incorrect.");}
  return (
    <div style={{ minHeight:"100vh", background:"#F8F7F4", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ maxWidth:400, width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}><div style={{ fontSize:38, marginBottom:8 }}>🏗️</div><h2 style={{ fontSize:24, fontWeight:900, color:"#1C1917", marginBottom:4 }}>Connexion</h2><p style={{ color:"#78716C", fontSize:14 }}>Accédez à votre espace MonArtisan</p></div>
        <div style={card()}>
          <div style={{ background:"#FFF3ED", border:"1px solid #FCA99E", borderRadius:11, padding:"11px 14px", marginBottom:18 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#E8460A", marginBottom:7 }}>🎯 Comptes démo</div>
            <div style={{ display:"flex", gap:8 }}>
              {[["🔨 Artisan","jean@demo.fr"],["👤 Particulier","marie@demo.fr"]].map(([label,mail])=>(<button key={label} onClick={()=>{setEmail(mail);setPassword("demo123");}} style={{ flex:1, background:"#fff", border:"1px solid #FCA99E", borderRadius:7, padding:"6px 0", fontSize:12, fontWeight:600, color:"#E8460A", cursor:"pointer" }}>{label}</button>))}
            </div>
          </div>
          <div style={{ marginBottom:12 }}><label style={lbl}>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="votre@email.com" type="email" style={inp()} /></div>
          <div style={{ marginBottom:18 }}><label style={lbl}>Mot de passe</label><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" type="password" style={inp()} /></div>
          {error&&<div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:9, padding:"9px 13px", color:"#DC2626", fontSize:13, marginBottom:12 }}>{error}</div>}
          <button onClick={handle} style={{ ...btn("linear-gradient(135deg,#E8460A,#F59E0B)","#fff",{ width:"100%", padding:"12px 0", fontSize:15 }) }}>Se connecter →</button>
        </div>
        <p style={{ textAlign:"center", fontSize:13, color:"#A8A29E", marginTop:14 }}>Pas de compte ? <button onClick={()=>setPage("register")} style={{ background:"none", border:"none", color:"#E8460A", fontWeight:700, cursor:"pointer", fontSize:13 }}>S'inscrire gratuitement</button></p>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(DEMO_USERS);
  const [artisans, setArtisans] = useState(INIT_ARTISANS);
  const [reviews, setReviews] = useState(INIT_REVIEWS);
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [devis, setDevis] = useState(INIT_DEVIS);
  const [rdvs, setRdvs] = useState(INIT_RDV);
  const [metier, setMetier] = useState("tous");
  const [selected, setSelected] = useState(null);

  const unread = user ? messages.filter(m=>m.to===user.id&&!m.lu).length : 0;
  const allUsers = [...artisans, ...users];

  function go(p) { setPage(p); if(p!=="detail") setSelected(null); }

  function handleRegister(newUser) {
    setUsers(u=>[...u, newUser]);
    setUser(newUser);
    if(newUser.type==="artisan") setArtisans(a=>[...a,{ ...newUser, note:0, avis:0, dispo:true, desc:newUser.desc||"Artisan professionnel." }]);
  }

  function handleContact(artisan, text) {
    if(!user) return;
    const msg = { id:Date.now(), from:user.id, to:artisan.id, text, date:"Aujourd'hui", heure:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}), lu:false };
    setMessages(m=>[...m,msg]);
    setTimeout(()=>{
      setMessages(m=>[...m,{ id:Date.now()+1, from:artisan.id, to:user.id, text:`Bonjour ${user.prenom}, merci pour votre message ! Je vous prépare un devis détaillé sous 24h.`, date:"Aujourd'hui", heure:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}), lu:false }]);
    }, 1400);
  }

  function handleSendMsg(msgObj) {
    setMessages(m=>[...m,{ ...msgObj, id:Date.now() }]);
    const contact=[...artisans,...users].find(u=>u.id===msgObj.to);
    if(contact?.type==="artisan") setTimeout(()=>{
      setMessages(m=>[...m,{ id:Date.now()+1, from:msgObj.to, to:msgObj.from, text:"Bien reçu, je reviens vers vous très rapidement !", date:"Aujourd'hui", heure:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}), lu:false }]);
    }, 1500);
  }

  function handleAddReview(review) {
    setReviews(r=>[...r,{ ...review, id:Date.now() }]);
    setArtisans(a=>a.map(art=>art.id===review.artisanId?{ ...art, avis:art.avis+1, note:Math.round(((art.note*art.avis)+review.note)/(art.avis+1)*10)/10 }:art));
  }

  function handleDemandeRdv(artisan, form) {
    const newRdv = { id:Date.now(), artisanId:artisan.id, clientId:user?.id||102, titre:`Intervention ${METIERS.find(m=>m.id===artisan.metier)?.label||"BTP"}`, date:form.date, heure:form.heure, duree:120, statut:"confirmé", adresse:form.adresse };
    setRdvs(r=>[...r, newRdv]);
  }

  function handlePayer(devisId) {
    setDevis(d=>d.map(dev=>dev.id===devisId?{ ...dev, statut:"payé" }:dev));
  }
  function handleAccepter(devisId) {
    setDevis(d=>d.map(dev=>dev.id===devisId?{ ...dev, statut:"accepté" }:dev));
  }
  function handleRefuser(devisId) {
    setDevis(d=>d.map(dev=>dev.id===devisId?{ ...dev, statut:"refusé" }:dev));
  }

  

  
    <div style=...>
      <Nav page={page} setPage={p=>{ if(["messages","dashboard","mes-devis","calendrier"].includes(p)&&!user){ go("login"); return; } go(p); }} user={user} onLogout={()=>{ setUser(null); go("home"); }} unread={unread} />

      {page==="home" && <Home setPage={go} setMetier={setMetier} />}
      {page==="register" && <Register onDone={handleRegister} setPage={go} />}
      {page==="login" && <Login users={users} onLogin={setUser} setPage={go} />}
      {page==="annonces" && !selected && <Annonces artisans={artisans} metier={metier} setMetier={setMetier} onSelect={a=>{ setSelected(a); go("detail"); }} />}
      {page==="detail" && selected && <Detail artisan={selected} onBack={()=>go("annonces")} user={user} reviews={reviews} onAddReview={handleAddReview} onContact={handleContact} onDemandeRdv={handleDemandeRdv} />}
      {page==="carte" && <Carte artisans={artisans} onSelect={a=>{ setSelected(a); go("detail"); }} />}
      {page==="messages" && user && <Messagerie user={user} artisans={artisans} allUsers={allUsers} messages={messages} onSend={handleSendMsg} />}
      {page==="dashboard" && user?.type==="artisan" && <Dashboard user={user} artisans={artisans} messages={messages} reviews={reviews} devis={devis} rdvs={rdvs} setPage={go} allUsers={allUsers} />}
      {page==="mes-devis" && user && <MesDevis user={user} devis={devis} artisans={artisans} onPayer={handlePayer} onAccepter={handleAccepter} onRefuser={handleRefuser} />}
      {page==="calendrier" && user && <CalendrierRdv rdvs={rdvs} user={user} artisans={artisans} allUsers={allUsers} />}
      {!user && ["messages","dashboard","mes-devis","calendrier"].includes(page) && (
        <div style={{ padding:60, textAlign:"center", color:"#A8A29E" }}>
          <div style={{ fontSize:44, marginBottom:12 }}>🔒</div>
          <div style={{ fontSize:16, fontWeight:700, color:"#78716C", marginBottom:16 }}>Connexion requise</div>
          <button onClick={()=>go("login")} style={{ ...btn("linear-gradient(135deg,#E8460A,#F59E0B)","#fff",{ padding:"11px 28px" }) }}>Se connecter</button>
        </div>
      )}
    </div>
  );
}
export default App;
