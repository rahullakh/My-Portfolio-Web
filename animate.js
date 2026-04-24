document.addEventListener("DOMContentLoaded", () => {
 const texts = [
    { id: "nameText", text: "Rahul Lakhera", speed: 80 },
    { id: "roleText", text: "Frontend(React.js) Developer & UI Engineer", speed: 40 },
    { id: "descText", text: "I build fast, modern, and interactive interfaces.", speed: 25 }
  ];

  function typeText({ id, text, speed }) {
    const el = document.getElementById(id);
    let i = 0;

    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
  }

  let delay = 0;
  texts.forEach(item => {
    setTimeout(() => typeText(item), delay);
    delay += item.text.length * item.speed + 300;
  });

});

const title = document.querySelector(".section-title");
const skillsSection = document.getElementById("skills");
const cards = document.querySelectorAll(".skill-card");

let triggered = false;

window.addEventListener("scroll", () => {
  if (!skillsSection || !title || triggered) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100) {
    triggered = true;

  
    title.classList.add("show");

    setTimeout(() => {
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("show");
        }, index * 200);
      });
    }, 300); 
  }
});