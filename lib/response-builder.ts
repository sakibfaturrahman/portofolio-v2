import profile from "@/data/profile.json";

export function buildResponse(intent: string) {
  const { personal_info, skills, projects, education, system_responses } =
    profile;

  switch (intent) {
    case "profile":
      return `Halloo! NexaOrion siap membantu kamu! Saya adalah asisten pribadi yang bertugas menjaga seluruh basis data ${personal_info.name}. 

---

Sakib adalah seorang ${personal_info.title} berbakat dari ${personal_info.location}. 

Dia memiliki spesialisasi dalam membangun arsitektur back-end yang kokoh dan selalu haus akan solusi teknis terbaik. Mau tahu rahasia di balik kode-kodenya? Tanyakan saja! 🚀✨`;

    case "skills":
      const stack = skills.hard_skills.join(", ");
      return `Memulai pemindaian Tech-Stack... 🔍 Berhasil! 

Core Memory Sakib:
${stack}

---

Dengan kombinasi senjata ini, Sakib mampu mengubah ide kompleks menjadi sistem yang scalable dan responsif. Dia benar-benar seorang penyihir di balik layar server! 💻🔥`;

    case "projects":
      const projectItems = projects
        .map(
          (p) =>
            `🔹 ${p.name}\n${p.description}\n_Tech: ${p.tech_stack.join(", ")}_`,
        )
        .join("\n\n");
      return `Menampilkan arsip maha karya Sakib... 📂✨:

${projectItems}

---

Setiap baris kode dirancang dengan presisi tinggi. Mana yang paling menarik perhatianmu? Saya punya detail teknisnya! 🛠️🌟`;

    case "education":
      const currentEdu = education[0];
      return `Status akademis terdeteksi! 🎓

Jenjang Saat Ini:
${currentEdu.status} - ${currentEdu.degree}
@ ${currentEdu.institution}

---

Semangat belajarnya berada di level maksimal! Dia tidak pernah berhenti meng-upgrade kemampuannya demi mencapai kesempurnaan teknis. 💪📚`;

    case "contact":
      return `Inisialisasi protokol komunikasi! 📡 Kamu bisa menjangkau Sakib melalui saluran berikut:

📧 Email: ${personal_info.email}

📱 Telepon/WA: ${personal_info.phone}

📍 Lokasi: ${personal_info.location}

---

Atau kunjungi markas digitalnya di:
${personal_info.website}

Sakib selalu terbuka untuk kolaborasi seru! 🤝✨`;

    default:
      return system_responses.unknown;
  }
}
