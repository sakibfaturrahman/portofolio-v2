import profile from "@/data/profile.json";

export function buildResponse(intent: string) {
  const { personal_info, skills, projects, education, system_responses } =
    profile;

  switch (intent) {
    case "profile":
      return `
<strong>Halo! Kenalin, aku NexaOrion.</strong><br /><br />

Aku di sini buat bantu kamu kenalan lebih dekat sama <strong>Sakib Faturrahman</strong>. Sakib itu seorang <strong>${personal_info.title}</strong> yang sekarang menetap di ${personal_info.location}.<br /><br />

Sehari-hari, Sakib paling hobi ngulik arsitektur back-end. Baginya, bikin sistem yang efisien dan bisa menangani banyak traffic itu kayak nyusun puzzle yang menantang tapi seru. Dia tipe orang yang teliti banget soal kebersihan kode dan performa sistem.<br /><br />

Mau tahu lebih dalam soal pengalaman kerjanya atau mungkin hobi ngodingnya?
      `;

    case "skills":
      const stack = skills.hard_skills.map((s) => `• ${s}`).join("<br />");

      return `
<strong>Andalan Sakib di Dunia Coding</strong><br /><br />

Kalau bicara soal "senjata" buat bangun sistem, Sakib biasanya pakai teknologi ini:<br /><br />

${stack}<br /><br />

Kombinasi ini dia pilih supaya bisa bikin server yang kokoh dan integrasi data yang nggak gampang *crash*. Tapi Sakib nggak berhenti di sini, dia orangnya haus belajar banget dan selalu *update* sama teknologi terbaru supaya hasil karyanya tetap modern.<br /><br />

Ada teknologi tertentu yang mau kamu diskusikan sama dia?
      `;

    case "projects":
      const projectItems = projects
        .map(
          (p) => `
• <strong>${p.name}</strong>: ${p.description} (Dibuat pakai ${p.tech_stack.join(", ")})
          `,
        )
        .join("<br /><br />");

      return `
<strong>Karya yang Pernah Sakib Bangun</strong><br /><br />

Ini beberapa proyek yang bikin Sakib bangga banget pas ngerjainnya:<br /><br />

${projectItems}<br /><br />

Di setiap proyek ini, fokus Sakib cuma satu: gimana caranya kode yang rumit di belakang bisa menghasilkan pengalaman yang super lancar buat penggunanya.<br /><br />

Tertarik pengen lihat detail teknis dari salah satu proyek di atas?
      `;

    case "education":
      const currentEdu = education[0];

      return `
<strong>Pendidikan Sakib</strong><br /><br />

Saat ini, Sakib lagi menempuh pendidikan di <strong>${currentEdu.institution}</strong> mengambil jurusan <strong>${currentEdu.degree}</strong>.<br /><br />

Statusnya sekarang <strong>${currentEdu.status}</strong>, tapi meski masih kuliah, dia aktif banget belajar mandiri di luar kampus buat ngikutin standar industri *software engineering* yang geraknya cepet banget.
      `;

    case "contact":
      return `
<strong>Yuk, Ngobrol Langsung!</strong><br /><br />

Sakib orangnya asik diajak diskusi, apalagi kalau bahas soal teknologi atau ide proyek baru. Kamu bisa hubungi dia lewat:<br /><br />

📧 <strong>Email:</strong> ${personal_info.email}<br />
💬 <strong>WhatsApp:</strong> ${personal_info.phone}<br />
📍 <strong>Domisili:</strong> ${personal_info.location}<br /><br />

Atau kalau mau intip profil lengkapnya, klik aja: ${personal_info.website}<br /><br />

Sapa aja, Sakib biasanya fast-respons kok kalau urusan kolaborasi teknis!
      `;

    default:
      return "Waduh, maaf ya... aku agak kurang paham maksud kamu. Bisa coba pilih menu yang ada atau tanya hal lain soal Sakib?";
  }
}
