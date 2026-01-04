document.addEventListener("DOMContentLoaded", () => {
 const texts = [
    { id: "nameText", text: "Rahul Lakhera", speed: 80 },
    { id: "roleText", text: "Frontend Developer & UI Engineer", speed: 40 },
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


  window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".skill-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 150); 
  });
});


