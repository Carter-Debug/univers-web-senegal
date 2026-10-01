const socials = [
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61579392244563" },
  { name: "Instagram", url: "https://www.instagram.com/univers_web_sa_consulting?igsh=ZDcwMXhhaWpjOXE4" },
  { name: "TikTok", url: "https://www.tiktok.com/@univers.web.sa.consulting" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/univers-web-sa-consulting-235063397" },
  { name: "X", url: "https://x.com/web22858" },
  { name: "WhatsApp", url: "https://wa.me/221775936938" },
];

const Footer = () => (
  <footer className="max-w-3xl mx-auto px-5 py-12 border-t border-border text-sm">
    <div className="grid sm:grid-cols-[1fr_auto] gap-8">
      <div>
        <p className="font-serif text-2xl">Univers Web <span className="italic">SA Consulting</span></p>
        <p className="mt-2 text-muted-foreground">Fondé par Omar Ndiaye — développeur web et entrepreneur.</p>
      </div>
      <ul className="flex flex-wrap sm:flex-col gap-x-4 gap-y-1">
        {socials.map((s) => (
          <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{s.name}</a></li>
        ))}
      </ul>
    </div>
    <p className="mt-10 text-xs text-muted-foreground">© {new Date().getFullYear()} Univers Web SA Consulting · Dakar</p>
  </footer>
);

export default Footer;
